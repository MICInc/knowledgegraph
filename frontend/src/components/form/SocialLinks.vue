<template>
	<div>
		<span v-for="(value, index) in social">
			<a class="social-links" :href="value.href">
				<img class="social-icon" 
					 :src="social[index].mouse ? value.img: value.hover" 
					 @mouseover="social[index].mouse = true" 
					 @onmouseout="social[index].mouse = false">
			</a>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			social: [
				{ mouse: false, hover: '/img/social-media-icons/facebook-icon-hover.png', href: 'https://www.facebook.com/miconference', img: '/img/social-media-icons/facebook-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/twitter-icon-hover.png', href: 'https://twitter.com/mic_conf', img: '/img/social-media-icons/twitter-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/youtube-icon-hover.png', href: 'https://www.youtube.com/channel/UCEkwg51OD930FsyTx7bV0Pg', img: '/img/social-media-icons/youtube-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/reddit-icon-hover.png', href: 'https://www.reddit.com/user/MICInc', img: '/img/social-media-icons/reddit-icon.png' }
			]
		}
	}
}
</script>

<style scoped>
.social-links {
	margin-right: 10px;
}

.social-icon {
	margin-left: 0;
	width: 40px;
	margin-left: 5px;
}
</style>