/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Carrega as noticias em 'todas_noticias' e exibe elas em grupos de tamanho 'num_noticias_simultaneas'.
					Ou seja exibe 'num_noticias_simultaneas' a partir de 'indice_prox_noticia'

    TO-DO:
      - Atualizar os dados periodicamente.
*/

<template>
<div class="rssfeed">
	<div class="noticia" v-for="noticia in noticias_em_exibicao" :key="noticia.id">
		<h3 class = "titulo">{{noticia.titulo}}</h3>
		<p class = "descricao" v-html="noticia.descricao"></p>
	</div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
		name: 'Rssfeed',
		props: {
				url : {
					type: String,
					required: true
				},
				num_noticias_simultaneas: {
					type: Number,
					required: false,
					default: 1
				},
				tempo_por_noticia: {
					type: Number,
					required: false,
					default: 8000
				},
				freezed: {
					type: Number,
					required: false
				},
		},
	data () {
		return {
			noticias_em_exibicao: [],
			todas_noticias: [],
			indice_prox_noticia: 0,
		}
	},
	created: function(){
		this.puxaNoticiasDoRss();
	},
	methods: {
		puxaNoticiasDoRss: function(){
			$.ajax({url: `api/fetch?feed=${this.url}`,dataType: 'text',}).then((result) => {
				let items = $.parseXML(result).getElementsByTagName('item')
				for(let i = 0; i < items.length; i++)
				{
					this.todas_noticias.push(
					{
						id: i,
						titulo: items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue,
						descricao: items[i].getElementsByTagName('description')[0].childNodes.length === 0 ?
							'' :  items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue.replace(/&nbsp;/g,'')
					})
				}
				this.proxNoticia();
			})
			.catch( () => {
				setTimeout(this.puxaNoticiasDoRss, 1000*60*0.5);
			})
		},
		proxNoticia: function () {
			this.noticias_em_exibicao = [];
			
			for(let i = 0; (i < this.num_noticias_simultaneas) && (this.indice_prox_noticia + i < this.todas_noticias.length); i++){
				this.noticias_em_exibicao.push(this.todas_noticias[this.indice_prox_noticia+i])
			}			
			this.indice_prox_noticia = this.indice_prox_noticia + this.num_noticias_simultaneas >= this.todas_noticias.length ? 
				0 : this.indice_prox_noticia + this.num_noticias_simultaneas;
			
			setTimeout(this.proxNoticia, this.tempo_por_noticia);
		}
	}
}
</script>

<style>

.noticia {
	padding: 0px 10px 0px 10px;
}

.noticia img{
	padding-right: 40px;
}
</style>