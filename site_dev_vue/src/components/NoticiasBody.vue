/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Exibe duas colunas de noticias cada uma com um cabecalho. A primeira ocupa 5fr e exibe uma noticia por vez.
					A segunda exibe 4 noticias simultaneamente. (isto é controlado por :num_noticias_simultaneas)
*/

<template>
	<div id="content">
		<div id="header_noticia_esquerda">
			<img id="dcc_logo" src="img/dcc.png">
			<h1> Café com Notícias </h1>
		</div>
		<div id="ufmg_logo">
			<img src="img/ufmg.png">
		</div>
		<Rss class = "rss" id = "rss1" url="http://www.dcc.ufmg.br/dcc/?q=pt-br/feed_destaque.xml" :tempo_por_noticia="10000"></Rss>
		<Rss class = "rss" id = "rss2" url="http://www.dcc.ufmg.br/dcc/?q=pt-br/feed_ufmg" :num_noticias_simultaneas="4" :tempo_por_noticia="10000" ></Rss>
</div>

</template>

<script>

import Rss from './Rss.vue'

export default {
	name: 'NoticiasBody',
	components: {
		Rss
	}
}


</script>

<style scoped>

#content{
	display: grid;
	grid-template-columns: 5fr 1fr;
	grid-template-rows: 15vh 55vh;
	grid-column-gap: var(--grid-gap);
}


#header_noticia_esquerda{
	background-color: var(--second-bg-color);
	display:grid;
	grid-template-columns: 1fr max-content 1fr;
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
}

h1{
	margin: 0px; padding: 0px;
	align-self: center; 
	justify-self: center;
	font-size: 3.5rem;
	font-family: Berkshire Swash;
	color: var(--vermelho-ufmg);
}

#dcc_logo {
	padding-left: 2rem;
	align-self: center;
	height: 5.5rem;
}

#ufmg_logo{
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
	display: grid;
	background-color: var(--second-bg-color);
}

#ufmg_logo >>> img {
	height: 3.5rem;
	justify-self: center;
	align-self: center;
}

.rss {
	background-color: var(--main-bg-color);
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
}
#rss1{
	font-size: 1.1rem;
	overflow: hidden;
}

#rss1 >>> img {
	float: left;
	position: relative;
	object-fit: contain;
	object-position: 0 0;
	max-height: 40vh;
	max-width: 60vh;
}

#rss2{
	overflow: hidden;
	display: grid;
	grid-template-rows: 1fr 1fr 1fr 1fr;
}


#rss2 >>> .titulo{
	font-size: 0.83rem;
	font-weight: normal;
}

#rss2 >>> img{
	display: none;
}

#rss2 >>> .descricao{
	display: none;
}

</style>