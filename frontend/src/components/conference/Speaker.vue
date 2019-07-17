<template>
	<div class="main">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'speaker'
}
</script>

<style>
:root {
	--main-purple: #545f99;
}

body {
	font-family: 'Avenir', 'sans-serif';
}

a {
	color: var(--main-purple);
	text-decoration: underline;
}

img {
	width: 125px;
	border-radius: 125px;
}

main {
	margin: 0 auto;
	margin-bottom: 40px;
	max-width: 850px;
}

main h2 {
	font-weight: 600;
	font-size: 26px;
}

main p {
	font-size: 16px;
}
</style>