/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: O componente converte um objeto twitter em elementos html/css. Os links de midia são retirados.
*/

<template>
  <div class="tweet">
  <div class="cabecalho">
    <img class="imagem_perfil" v-bind:src="twt_pronto.url_imagem_perfil">
    
    <div class = "nomes">
      <span class="nome_perfil">{{twt_pronto.nome_perfil}}</span>
      <span class="nome_usuario">@{{twt_pronto.nome_usuario}}</span>
    </div>
    
    <i class="fab fa-twitter twitter_icon" style=""></i>
  </div>
  
  <p v-html="twt_pronto.text"></p>
  
  <span class="tweet_footer"><i class="far fa-heart"></i>
  {{twt_pronto.favorite_count}}&nbsp;&nbsp;&nbsp;
  {{data_formatada}}</span> 
  </div>
</template>

<script>
export default {
  name: "app",
  props: 
  {
    tweet: {
      required: true,
      type: Object
    }
  },
  data() 
  {
    return {
      twt_pronto: null,
      data_formatada: null
    };
  },
  created: function() 
  {
    this.formata_tweet();
  },
  methods: {
    formata_tweet: function () 
    {
      let tw = this.tweet.retweeted_status ? this.tweet.retweeted_status : this.tweet;
      let twt_pronto = 
      {
        url_imagem_perfil : tw.user.profile_image_url_https,
        nome_perfil : tw.user.name,
        nome_usuario : tw.user.screen_name,
        dia: tw.created_at.split(' ')[2],
        mes: tw.created_at.split(' ')[1],
        ano: tw.created_at.split(' ')[5],
        hora: tw.created_at.split(' ')[3].split(':')[0] -3,
        min: tw.created_at.split(' ')[3].split(':')[1],
        favorite_count : tw.favorite_count,
        urls : tw.extended_tweet ? tw.extended_tweet.entities.urls : tw.entities.urls,
        text : tw.extended_tweet ? tw.extended_tweet.full_text : tw.full_text,
        urls_media : tw.extended_entities ? tw.extended_entities.media : []
      }

      twt_pronto.text = twt_pronto.text.replace(/[\n]+/g, '<br>');
      twt_pronto.text = twt_pronto.text.replace(/#.*?\s/g, a => {return `<span class="azul_twitter">${a}</span>`;}); // dá cor às hashtags
      twt_pronto.text = twt_pronto.text.replace(/@.*?\s/g, a => {return `<span class="azul_twitter">${a}</span>`;}); // dá cor às mentions
      
      for(let i = 0; i < twt_pronto.urls.length; i++)
        twt_pronto.text = twt_pronto.text.replace(twt_pronto.urls[i].url, `<a class="no_decoration azul_twitter"href="${twt_pronto.urls[i].expanded_url}">${twt_pronto.urls[i].expanded_url}</a>`);
      
      for(let i = 0; i < twt_pronto.urls_media.length; i++)
        twt_pronto.text = twt_pronto.text.replace(twt_pronto.urls_media[i].url, '');
    
      this.data_formatada = `${twt_pronto.hora}:${twt_pronto.min}  ${twt_pronto.hora < 12 ? 'PM' : 'AM'} - ${twt_pronto.mes} ${twt_pronto.dia} ${twt_pronto.ano}`;      
      this.twt_pronto = twt_pronto;
    }
  }
}
</script>

<style>

.azul_twitter
{
  color: #38A1F3;
}

.no_decoration
{
  text-decoration: none;
}


</style>

<style scoped>


.cabecalho
{
  display: grid;
  grid-template-columns: min-content auto min-content;
}

.nomes
{
  display:grid;
  grid-template-columns: 1fr;
  align-content: center;
  margin-left: 0.625rem;
}

.nome_perfil
{
  font-weight: 700;
}

.nome_usuario
{
  font-size: var(--font-size-menor);
  color: rgb(105, 120, 130);
}

.imagem_perfil 
{
  align-self: center;
  border-radius: 50%;
}

.tweet
{
  display: grid;
  row-gap: 0.625rem;

  grid-template-rows: 3.125rem auto auto;
  padding: 0.9rem 1.25rem 0.625rem 1.25rem;
  font-family: Helvetica, Arial;
  color: #1c2022;
  word-break: break-word;
  background-color: var(--main-bg-color);
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

.icone_twitter 
{
  width: 1.875rem;
  height: 1.875rem; 
}

* 
{
  margin: 0;
}


.twitter_icon
{
  color:#38A1F3;
  font-size: var(--font-size-menor);
}

.tweet_footer 
{
  align-self: end;
  color:rgb(105, 120, 130);
  font-size: var(--font-size-menor);
}

</style>

