/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Um relogio simples que atualiza a hora com Date()
*/

<template>
	<div v-if="dia !== null" id="clock">
		<div id="relogio_data">{{dia}}/{{mes}}/{{ano}}</div>
		<div id= "relogio_hora">{{hora}}:{{min}}</div>
	</div>
</template>

<script>
export default {
	name: 'Relogio',
	data () {
    return {
      dia: null,
      mes: null,
      ano: null,
      hora: null,
      min: null,
      sec: null
    }
  },
  created: function () {
    this.update()
  },
  methods: {
    update: function () {
      var d = new Date()
      this.dia = d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()
      this.mes = d.getMonth() <= 8 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      this.ano = d.getFullYear()
      this.hora = d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()
      this.min = d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()
      this.sec = d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds()
      setTimeout(this.update, 1000*1*1);
    }
  }
}
</script>

<style scoped>

#clock{
  width: 10rem;
  height: 20vh;
	display:grid;
	grid-template-columns: 1fr;
	text-align: center;
}


#relogio_data{
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
	background-color: #ddd;
	padding-top: 0.8rem;
	font-size: 1rem;
	font-weight: bold;
}
#relogio_hora{
	border-bottom-left-radius: var(--border-radius);
	border-bottom-right-radius: var(--border-radius);
	background-color: #fff;
	padding: 0.7rem 1.3rem 0rem 1.3rem;
	font-size: 3rem;
}
</style>