/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Organiza o formato final da aplicação. Clima e Relogio são fixos entre telas.
					O tempo de troca é controlado por tempo_por_tela.
*/

<template>
  <div id="app">
    <div class="bg-image"></div>
    <div id="container">
      <div id="content">
        <AgendaBody v-show="viewId === 0"></AgendaBody>
        <NoticiasBody v-show="viewId === 1"></NoticiasBody>
        <Twitter v-show="viewId === 2"></Twitter>
      </div>

      <div id="footer">
        <AgendaFooter v-show="viewId === 0"></AgendaFooter>
        <NoticiasFooter v-show="viewId === 1"></NoticiasFooter>
        <TwitterFooter v-show="viewId === 2"></TwitterFooter>
        <Clima></Clima>
        <Relogio></Relogio>
      </div>
    </div>
  </div>
</template>

<script>
import Twitter from "./components/Twitter.vue"
import TwitterFooter from "./components/TwitterFooter"

import AgendaBody from "./components/AgendaBody.vue";
import NoticiasBody from "./components/NoticiasBody.vue";

import AgendaFooter from "./components/AgendaFooter.vue";
import NoticiasFooter from "./components/NoticiasFooter.vue";

import Clima from "./components/Clima.vue";
import Relogio from "./components/Relogio.vue";

export default {
  name: "app",
  data() {
    return {
      viewId: 2,
      tempo_por_tela: 1000 * 60* 2,
      ultimos_onze_inputs: [],
      konami_code: [38,38,40,40,37,39,37,39,66,65,13],
      konami_ativo: false
    };
  },
  created: function() {
    this.update(1);
  },
  methods: {
    update: function (troca_tela_ativa)
    {
      if(troca_tela_ativa === 0)
        return ;
      
      this.viewId = (this.viewId + 1) % 3;
      setTimeout(this.update, this.tempo_por_tela);
    }
  },
  components: {
    AgendaBody,
    NoticiasBody,
    AgendaFooter,
    NoticiasFooter,
    Clima,
    Relogio,
    Twitter,
    TwitterFooter
  }
};
</script>

<style>
:root {
  --vermelho-ufmg: #c8102e;
  --azul-mar: #168d90;
  --main-bg-color: rgba(255, 255, 255, 0.87);
  --second-bg-color: rgba(255, 255, 255, 0.5);
  --background-img: url("/img/background3.jpg");
  --main-grid-rows: 1fr 11.36fr 2.72fr 1fr;
  --grid-gap: 20px;
  font-family: "Poppins", sans-serif;
  color: #383f48;
  font-size: var(--font-size-normal);
}

@media screen and (max-width: 1920px) {
  :root {
    --border-radius: 12px;
    --font-size-normal: 24px;
    --font-size-menor: 22px;
  }
}

@media screen and (max-width: 1366px) {
  :root {
    --border-radius: 6px;
    --font-size-normal: 16px;
    --font-size-menor: 14px;
  }
}

body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.bg-image {
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  background-image: var(--background-img);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#container {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9999;

  padding: 2rem 1rem 0px 1rem;

  display: grid;
  grid-gap: var(--grid-gap);
  grid-template-columns: 1fr;
  grid-template-rows: 70vh 20vh;
}

#content {
  overflow: hidden;
}

#footer {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  grid-gap: var(--grid-gap);
}

</style>
