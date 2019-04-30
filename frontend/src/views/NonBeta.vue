<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="beta-center">
			<h2>Thanks for joining...</h2>
			<p>the Machine Intelligence Community! We are currently privately beta testing. Please follow our social media for our official release date. This account will remain in our system until then.</p>
			<SocialLinks></SocialLinks>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import SocialLinks from '@/components/form/SocialLinks';

export default {
	name: 'non-beta',
	components: {
		PageNav,
		SocialLinks
	}
}
</script>

<style>
.container {
	display: flex;
	justify-content: center;
	flex-direction: 
}

.beta-center {
	width: 50%;
	margin: auto;
}
</style>