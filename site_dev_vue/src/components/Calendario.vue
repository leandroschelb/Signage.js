/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Exibe as informações recebidas do backend. Os dados são recebidos apenas 
          na criação e caso ocorra um erro tenta-se novamente em intervalos.
          
    TO-DO:
      - Atualizar os dados periodicamente.
*/

<template>
  <div v-if="eventos != null" class="calendar">
    <div v-for="evento in eventos" v-bind:key="evento.id" class="evento">
      <div>
        <div class="data_hora" v-bind:class="{ativo: evento.ativo}">
          {{evento.data_inicio.dia}}/{{evento.data_inicio.mes}}
          <span
            v-if="evento.dia_todo === false"
          >{{evento.data_inicio.hora}}:{{evento.data_inicio.min}}</span>
        </div>
        <span class="local">{{evento.location}}</span>
        <img class="img_aniversariante" v-if="parseInt(nome) === 2" v-bind:src="evento.description">
      </div>
      <div class="resumo">{{evento.summary}}</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Calendario",
  props: {
    nome: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      intervalo_tentar_get: 1000 * 60 * 0.5,
      eventos: null
    };
  },
  created: function() {
    this.recebeEventos();
  },
  methods: {
    recebeEventos: function() {
      $.ajax({ url: `api/calendar?id=${this.nome}`, dataType: "json" })
        .then(data => {
          this.eventos = [];
          for (let i = 0; i < data.list.length; i++) {
            this.eventos.push(data.list[i]);
          }
        })
        .catch(error => {
          setTimeout(this.recebeEventos, this.intervalo_tentar_get);
        });
    }
  }
};
</script>

<style scoped>
.calendar {
  font-size: calc(0.875 * var(--font-size-normal));
}

.evento {
  padding: 18px 22px 0px 22px;
}

.data_hora {
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: inline-block;
  padding: 10px 10px 10px 10px;
  border-radius: var(--border-radius) 0px 0px var(--border-radius);
  background-color: gray;
}

.ativo {
  background-color: #008000;
}

.local {
  font-style: italic;
  font-size: calc(1 * var(--font-size-normal));
  margin-left: 0.5rem;
}

.resumo {
  margin-top: 8px;
}

.img_aniversariante {
  border-radius: 50%;
  float: right;
  object-fit: contain;
  object-position: 0 0;
  max-height: 10vh;
  max-width: 12vh;
}
</style>