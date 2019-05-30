/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Exibe as previsões para hoje e 4 proximos dias. O componente fica melhor se exibido em forma quadrada.  
          
    TO-DO:
      - Atualizar os dados periodicamente.
*/

<template>
  <div class="clima">
    <div v-bind:class="clima.class" v-for="clima in climas" v-bind:key="clima.dt">
      <span v-if="clima.class === 'previsao_prox_dias'">{{clima.dia}}</span>
      <i v-bind:class="clima.icone"></i>
      {{clima.temp}}
      <span v-if="clima.class === 'previsao_hoje'">ºC</span>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Clima",
  data() {
    return {
      climas: []
    };
  },
  mounted: function() {
    this.update();
  },
  methods: {
    update: function() {
      this.climas = [];
      var dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

      $.ajax({ url: "api/clima", dataType: "json" })
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            this.climas.push({
              dia: dias[new Date(res[i].data).getDay()],
              class: parseInt(i) === 0 ? "previsao_hoje" : "previsao_prox_dias",
              temp: res[i].temp,
              icone:
                res[i].description === "clear sky"
                  ? "wi wi-day-sunny"
                  : res[i].description.indexOf("rain") !== -1
                  ? "wi wi-rain"
                  : "wi wi-cloudy"
            });
          }
        })
        .catch(error => {
          setTimeout(this.update, 1000 * 60 * 0.5);
        });
    }
  }
};
</script>

<style>
/*------------------ CLIMA */
.clima {
  width: 10rem;
  height: 20vh;
  border-radius: var(--border-radius);
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
}

.previsao_hoje {
  justify-self: center;
  align-self: center;
  margin-top: 0.6rem;
  background-color: #fff;
  font-size: 1.8rem;
  grid-column-start: 1;
  grid-column-end: 6;
}

.previsao_hoje i {
  /* Tamanho do icone */
  padding-right: 0.5rem;
  font-size: 2rem;
}

.previsao_hoje span {
  /* Tamanho do ºC de celsius */
  font-size: 1rem;
}

.previsao_prox_dias {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.4rem;
  margin: auto;
  font-size: 0.7rem;
  grid-row-start: 2;
}
</style>