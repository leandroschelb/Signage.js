/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Busca os dados e cria tweets de acordo. Separando os tweets superiores na classe 'em_cima'
          Funciona apenas com conhecimento previo da quantidade de tweets. 
*/

<template>
  <div class = "twitter">
    <Tweet v-for="tweet in tweets" :class="tweet.id < 3 ? 'em_cima' : 'em_baixo'" :key="tweet.id" :tweet="tweet"></Tweet>
  </div>
</template>

<script>

import Tweet from "./Tweet.vue"
import $ from 'jquery'

export default {
  name: "app",
  data() 
  {
    return {
      tweets: []
    };
  },
  created: function()
  {
    this.get_tweets_timeline_by_screenname();
  },
  methods:{
    get_tweets_timeline_by_screenname: function () 
    {
      $.ajax({url: '/api/twitter', dataType: 'json'})
      .then( data => 
      { 
        for(let i = 0; i < data.lista.length; i++)
        {
          data.lista[i].id = i;
          this.tweets.push(data.lista[i]);
        }
      })
      .catch( () =>
      {
        setTimeout(this.get_tweets_timeline_by_screenname, 1000*60*0.5);
      });
    }
  },
  components: {
    Tweet
  }
};
</script>

<style scoped>

.em_cima
{
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  border-bottom-style: solid;
  border-width: 2px;
  border-color: lightgrey;
}

.em_baixo
{
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.twitter
{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 15rem 15rem;
  row-gap: 0px;
  column-gap: 1.25rem;
}

</style>
