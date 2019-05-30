/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: 
*/

<template>

<div id="footer_twitter">
    <i class="fab fa-twitter" id="icone_twitter"></i>
		<p id = "twitter_texto">Twitter</p>
</div>

</template>

<script>

export default {
	name: 'TwitterFooter',
}

</script>

<style scoped>


#footer_twitter
{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: var(--border-radius);
	background-color: var(--main-bg-color);
}

#icone_twitter
{
  align-self: center;
  justify-self: end;
	color:  #38A1F3;
	font-size: 7rem;
}

#twitter_texto
{
  align-self: center;
  margin: 0 0 0 1.4rem;
	font-family: helvetica;
  font-weight: 700;
	color: #38A1F3;
	font-size: 6rem;
}

</style>
