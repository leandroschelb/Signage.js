/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Agruda calendarios e imagens em cards
*/

<template>

<div id = "row1-pag1">
	<div class="card-pag1">
		<div class="aux1-pag1"><img src="img/nova-logo-ppgcc-ufmg-preto.png"></div>
		<Calendario nome="0"></Calendario>
	</div>
	<div class="card-pag1">
		<div class="aux1-pag1"><img src="img/dcc.png"></div>
		<Calendario nome="1"></Calendario>
	</div>
	<div class="card-pag1">
		<div class="aux1-pag1"><img src="img/aniversario.png"></div>        
		<Calendario nome="2"></Calendario>
	</div> 
</div>

</template>

<script>

import Calendario from './Calendario.vue'

export default {
	name: 'AgendaBody',
	components: {
		Calendario
	}
}
</script>

<style scoped>

/*-----------------	Elementos da primeira coluna	--------------  */

#row1-pag1{
	display:grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: var(--grid-gap);
	height: 70vh;
}

/*------------	Cada calendario é uma carta com titulo e o calendario -------------------*/

.card-pag1{
	display:grid;
	grid-template-columns: 1fr;
	grid-template-rows: calc(6.5*var(--font-size-normal)) auto;
}


/*----------- titulo dos calendarios -----------*/
.aux1-pag1 {
	display:grid;
	background-color: var(--second-bg-color);
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
}

.calendar{
	background-color: var(--main-bg-color);
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
}

.aux1-pag1 >>> img{
	justify-self:center;
	align-self: center;
	max-height: 100%;
}

</style>
