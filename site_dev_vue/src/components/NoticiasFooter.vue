/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Exibe noticias no footer alternando entre duas fontes, o tempo de cada feed é controlado por tempo_por_feed
*/

<template>

<div class = "container">
	<Rss v-show="ativo === 0" id = "rss2" url="http://dcc.ufmg.br/dcc/?q=pt-br/noticias-externas"></Rss>
	<Rss v-show="ativo === 1" id = "rss3" url="http://dcc.ufmg.br/dcc/?q=pt-br/feed_agencias"></Rss>
</div>

</template>

<script>

import Rss from './Rss.vue'

export default {
	name: 'NoticiasFooter',
	components: {
		Rss
	},
	data: function () {
		return{
			ativo: 1,
			tempo_por_feed: 1000*15
		}
	},
	created: function() {
		this.troca_feed()
	},
	methods:{
		troca_feed: function(){
			this.ativo = this.ativo ? 0 : 1;
			setTimeout(this.troca_feed, this.tempo_por_feed);
		}
	},
}

</script>

<style scoped>
	
.container{
	background-color: rgb(255,255,255,0.75);
	border-radius: var(--border-radius);
}

#rss2 >>> img{
	display: none;
}

#rss3 >>> img{
	display: none;
}

</style>