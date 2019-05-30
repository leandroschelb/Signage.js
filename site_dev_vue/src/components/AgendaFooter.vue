/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Exibe um icone de calendario, um texto 'Agenda' e uma imagem recebida por Rss.
*/

<template>

<div id="footer">
		<i class="far fa-calendar-alt iconeCalendario"></i>
		<p id = "agenda">Agenda</p>
		<img id= "img" src="img/ufmg.png">
		<Rss id="img_rss" url="https://www.dcc.ufmg.br/dcc/?q=pt-br/banners"></Rss>
</div>

</template>

<script>

import Rss from './Rss.vue'

export default {
	name: 'AgendaFooter',
	components: {
		Rss
	}
}

</script>

<style scoped>

.iconeCalendario {
	justify-self: end;
	align-self: center;
	color: #fff;/* var(--vermelho-ufmg);*/
	font-size: 7rem;
}

#footer{
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr; 
	border-radius: var(--border-radius);
	background-color: var(--second-bg-color);
}

#footer >>> *{
	margin: 0px;
	padding: 0px;
}

#img_rss {
	justify-self: end;
	align-self: center;
	margin-right: var(--grid-gap);
}

#img_rss >>> .titulo{
	display:none;
}

#img {
	display: none;
	max-width: 100%;
	max-height:100%;
}

#agenda {
	margin: 0px;
	padding: 0px;
	margin-left: var(--grid-gap);


	font-family: Lobster Two;
	color: var(--vermelho-ufmg); /*var(--azul-mar);*/
	font-size: 6rem;
}

</style>
