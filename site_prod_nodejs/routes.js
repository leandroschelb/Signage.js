/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Descreve as rotas da aplicação.

    TO-DO:
        - o código apenas reconhece RULES YEARLY UNTIL e YEARLY outras rules podem causar erros.
*/

const router = require('express').Router();
const bodyParser = require('body-parser')
const request = require('request')
const OAuth = require('oauth').OAuth;

const fontes_clima = {
  clima_agora: "http://api.openweathermap.org/data/2.5/weather?q=Belo%20Horizonte,br&APPID=8e729c8e35b9d68ddfab87a032b12413",
  clima_prox_5_dias: "http://api.openweathermap.org/data/2.5/forecast?q=Belo%20Horizonte,br&APPID=8e729c8e35b9d68ddfab87a032b12413"
}

const fontes_calendario = {
  dcc_pos_calendario: 'https://calendar.google.com/calendar/ical/l3on4is5tplnuh1l09i2u9nlug%40group.calendar.google.com/private-22f262353aa6baf75ef5985793ea2a66/basic.ics',
  dcc_agenda: 'https://calendar.google.com/calendar/ical/dcc.ufmg%40gmail.com/private-8f81748307f644a82b0540ab73a49533/basic.ics',
  aniversariantes: 'https://calendar.google.com/calendar/ical/q3m537b7lrtdflhp9inasjrq0s%40group.calendar.google.com/private-c1639500fa476ffb40f9bc33dbeebf76/basic.ics'
}


const contem = function (string1, string2) {
  return string1.indexOf(string2) === -1 ? false : true;
}

const timestamp = function (ano, mes, dia, hora, min) {
  ano = parseInt(ano);
  mes = parseInt(mes);
  dia = parseInt(dia);
  hora = parseInt(hora);
  min = parseInt(min);
  let resposta = '' + ano + (mes <= 9 ? '0' + mes : mes) + (dia <= 9 ? '0' + dia : dia) + (hora <= 9 ? '0' + hora : hora) + (min <= 9 ? '0' + min : min);
  return parseInt(resposta);
}

router.use(bodyParser.urlencoded({
  extended: true
}))


router.use(bodyParser.json())


//  /api/fetch serve apenas como proxy para evitar Cross Origin Blocked
router.get('/fetch', (req, res) => {
  request(req.query.feed, (error, data, body) => {
    if (error) {
      res.send(error)
      console.log(error);
      return ;
    }
    else {
      res.send(body)
    }
  })
})

//                    Twitter API
// Faz chamada autenticada com Oauth para a api.twitter e envia os dados para front-end
// Oauth recebe a chave publica e privada da conta dev twitter
// A conta proprietarias da chaves é: dcc_ufmg.

router.get('/twitter', function (req, res) {
  
  let consumer_key = '4uA8jx6gn3MKuAAOup5A';
  let consumer_secret_key = 'WSyvzNYqG1HmIM0lOfNc2ZcVTL43oLkiUEtZRQnimFg';
  
  let base_url = 'https://api.twitter.com/1.1/'
  let timelile_api_url = 'statuses/user_timeline.json?'
  let parametros = 'screen_name=dcc_ufmg&tweet_mode=extended&count=6' 
  let url_completa = base_url + timelile_api_url + parametros;
  
  let oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumer_key,
    consumer_secret_key,
    '1.0',
    'localhost',
    'HMAC-SHA1'
  );

  oauth.get(url_completa, this.accessToken, this.accessTokenSecret,
    function (err, body, response) {
      if (err || response.statusCode != 200) 
      {  
        console.log(err);
        return;
      }
      res.send({lista: Array.from(JSON.parse(body))});
    }
  );
})


//  È utilizada as APIs do OpenWeatherMap para receber os dados do clima, sendo elas:
//      Weather: Previsão do clima com horario mais proximo ao atual
//      Forecast: Previsão para 5 dias a cada 3 horas a partir do horario atual + 3, total 40 medições.
//      Necessario subtrair -273.15 para converter de Kelvin para Celsius

router.get('/clima', (req, res) => {
  request(fontes_clima.clima_agora, (error, data, dados_resposta) => {
    if (error) {
      res.send(error);
      console.log(error);
      return ;
    }

    let resposta_json = JSON.parse(dados_resposta)
    let lista_climas = [{
      description: resposta_json.weather[0].description,
      temp: Math.round(resposta_json.main.temp - 273.15),
      data: new Date(resposta_json.dt * 1000)
    }]

    request(fontes_clima.clima_prox_5_dias, (error, data, body) => {
      if (error) {
        res.send(error);
        console.log(error);
        return ;
      }
      let forecast = JSON.parse(body)
      for (let i = 7; i < forecast.list.length && i <= 31; i += 8) {     // seleciona as previsões a cada 24hrs do horário atual
        lista_climas.push({
          description: forecast.list[i].weather[0].description,
          temp: Math.round(forecast.list[i].main.temp - 273.15),
          data: new Date(forecast.list[i].dt * 1000)
        })
      }
      res.send(lista_climas)
    })
  })
})


//  A rota retorna os querySize proximos eventos no ical cujo id é req.query.id
//  Ical é apenas uma string, portanto é necessario:
//      - quebrar ical em eventos
//      - quebrar cada evento em linhas
//  O parse é feito em duas etapas:
//      - salva os dados brutos do evento em seu respectivo objeto
//      - Interpreta e limpa os dados

router.get('/calendar', (req, res) => {
  let querySize = 3;
  let query_link;
  switch (parseInt(req.query.id)) {
    case 0:
      query_link = fontes_calendario.dcc_pos_calendario;
      break;
    case 1:
      query_link = fontes_calendario.dcc_agenda;
      break;
    case 2:
      query_link = fontes_calendario.aniversariantes;
      break;
    default:
      return 'id invalido';
  }
  request(query_link, (error, data, body) => {
    if (error) {
      res.send(error);
      console.log(error);
      return ;
    }

    //--------------------------------------------------------------
    //           Separação do ical em eventos e então em strings
    //--------------------------------------------------------------

    let aux = body.split('BEGIN:VEVENT')					// quebra o ical em strings representando eventos
    let eventos_string = [];
    for (let i = 0; i < aux.length; i++) {
      eventos_string.push(aux[i].split('\n'))
    }
    let eventos_JSON = []

    //----------------------------------------------------------------------
    //          Salva os dados do evento em seu respectivo objeto
    //----------------------------------------------------------------------

    for (let i = 1; i < eventos_string.length; i++) {
      let aux = {
        id: i - 1,
        description: '',
        summary: '',
        data_inicio: '',
        data_fim: '',
        dia_todo: false,
        location: '',
        rule: '',
        inicio_timestamp: '',
        ativo: false
      }
      for (let j = 0; j < eventos_string[i].length; j++) {
        if (contem(eventos_string[i][j], 'DTSTART')) {
          if (contem(eventos_string[i][j], 'DATE')) {
            if (contem(eventos_string[i][j + 2], 'RRULE')) {
              aux.rule = eventos_string[i][j + 2].replace(/(\r\n|\n|\r)/gm, '')
            }
            aux.dia_todo = true;
          }
          aux.data_inicio = eventos_string[i][j]
          aux.data_fim = eventos_string[i][j + 1]
        }

        else if (contem(eventos_string[i][j], 'SUMMARY')) {
          while (contem(eventos_string[i][j], 'TRANSP') == false)          // summary termina quando aparece TRANSP
          {
            aux.summary += eventos_string[i][j].replace(/(\r\n|\n|\r)/gm, '') + '\n';
            j++;
          }
        }
        else if (contem(eventos_string[i][j], 'LOCATION'))
          aux.location = eventos_string[i][j]

        else if (contem(eventos_string[i][j], 'DESCRIPTION')) {
          while (contem(eventos_string[i][j], 'LAST-MODIFIED') == false) {
            aux.description += eventos_string[i][j].replace(/(\r\n|\n|\r|\s)/gm, '');
            j++;
          }
        }
      }
      eventos_JSON.push(aux);
    }

    //--------------------------------------------------------------
    //                      Limpeza dos dados
    //--------------------------------------------------------------

    for (let i = 0; i < eventos_JSON.length; i++) {
      let evento = eventos_JSON[i];
      if (evento.dia_todo) {
        evento.data_inicio = {
          dia: evento.data_inicio.substring(25, 27),
          mes: evento.data_inicio.substring(23, 25),
          ano: evento.data_inicio.substring(19, 23),
          hora: '00',
          min: '00'
        }
        evento.data_fim = {
          dia: evento.data_fim.substring(23, 25),
          mes: evento.data_fim.substring(21, 23),
          ano: evento.data_fim.substring(17, 21),
          hora: '00',
          min: '00'
        }
      }
      else {
        evento.data_inicio = {
          dia: evento.data_inicio.substring(14, 16),
          mes: evento.data_inicio.substring(12, 14),
          ano: evento.data_inicio.substring(8, 12),
          hora: evento.data_inicio.substring(17, 19),
          min: evento.data_inicio.substring(19, 21)
        }
        evento.data_fim = {
          dia: evento.data_fim.substring(12, 14),
          mes: evento.data_fim.substring(10, 12),
          ano: evento.data_fim.substring(6, 10),
          hora: evento.data_fim.substring(15, 17),
          min: evento.data_fim.substring(17, 19)
        }

        // Ajusta a hora subtraindo -3 do fuso horario e adicionando '0' se necessario para manter dois digitos.
        evento.data_inicio.hora -= 3
        evento.data_inicio.hora = evento.data_inicio.hora <= 9 ? '0' + evento.data_inicio.hora : evento.data_inicio.hora
        evento.data_fim.hora -= 3
        evento.data_fim.hora = evento.data_fim.hora <= 9 ? '0' + evento.data_fim.hora : evento.data_fim.hora

      }

      evento.location = evento.location.substring(9)	    		// remove a TAG LOCATION
      evento.summary = evento.summary.substring(8)                // remove a TAG summary
      evento.description = evento.description.substring(17)       // remove a tag IMG 

      //--------------------------------------------------------------
      //                  Atualização dos eventos
      //--------------------------------------------------------------


      // lida com regras: YEARLY sem UNTIL, data_inicio e data_fim são atualizadas para o ano atualizada
      //					YEARLY com UNTIL, são atualizadas se não tiverem expirado

      if (evento.rule) {
        const date = new Date()
        if (contem(evento.rule, 'UNTIL')) {
          let data_evento_validade = parseInt(evento.rule.substring(evento.rule.indexOf('UNTIL=') + 6));
          let data_evento_neste_ano = parseInt('' + date.getFullYear() + evento.data_inicio.mes + evento.data_inicio.dia);
          if (data_evento_neste_ano < data_evento_validade)
            evento.data_inicio.ano = evento.data_fim.ano = date.getFullYear();
        }
        else
          evento.data_inicio.ano = evento.data_fim.ano = date.getFullYear();
      }
      // cria uma string para ordenação das datas, necessario ser aqui, pois a data pode ter sido atualizada acima.
      evento.inicio_timestamp = timestamp(evento.data_inicio.ano, evento.data_inicio.mes, evento.data_inicio.dia, evento.data_inicio.hora, evento.data_inicio.min);
      evento.fim_timestamp = timestamp(evento.data_fim.ano, evento.data_fim.mes, evento.data_fim.dia, evento.data_fim.hora, evento.data_fim.min);
      eventos_JSON[i] = evento;
    }

    //****************************************************************
    //						ESCOLHA DOS DADOS PARA ENVIO
    //****************************************************************

    eventos_JSON.sort((a, b) => (b.fim_timestamp - a.fim_timestamp))
    const date = new Date()
    let data_atual = timestamp(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());

    let response = { list: [] }

    let i;
    for (i = 0; i < eventos_JSON.length; i++) {
      if (eventos_JSON[i].fim_timestamp < data_atual)  // 'i' é o indice do último evento a terminar
      {
        break;
      }
    }
    while (querySize-- && i--)                        // seleciona os proximos querySize eventos
    {
      if (eventos_JSON[i].inicio_timestamp <= data_atual)
        eventos_JSON[i].ativo = true;
        response.list.push(eventos_JSON[i]);
    }    
    // Para aniversarios(id 2), o loop abaixo verifica se existem mais aniversarios
    // na mesma data do último e os envia.
    while(i-- > 0 && parseInt(req.query.id) === 2)
    {
      if(eventos_JSON[i].inicio_timestamp !== eventos_JSON[i+1].inicio_timestamp)
        break;
      
      response.list.push(eventos_JSON[i]);
    }
    res.send(response);

  })
})


module.exports = router;
