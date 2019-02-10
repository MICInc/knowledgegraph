<template>
	<footer>
		<div class="container">
			<div class="rows">
					<div class="top">
						<div class="logo"><img src="/img/mic-logo.png" alt="MIC Conference Logo" /></div>
					</div>
					<div class="bottom">
						<p class="copyright">© Copyright 2018</p><a class="code-of-conduct" href="http://confcodeofconduct.com/"> Conference Code of Conduct</a>
						<div class="social-links">
							<a href="https://www.facebook.com/events/339954023078301/"><img src="/img/social-media-icons/facebook-icon.png" alt=""/></a>
							<a href="https://twitter.com/mic_conf"><img src="/img/social-media-icons/twitter-icon.png" alt=""/></a>
							<a href="https://medium.com/mit-mic"><img src="/img/social-media-icons/medium-icon.png" alt="" /></a>
						</div>
					</div>
				</div>
			</div>
		</footer>
</template>

<script>
	export default {
		name: 'Footer',
	}
</script>

<style scoped>

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	border: 1px solid #545f99;
}

.section-head {
	padding: 40px 0;
	margin: 0 50px;
}

.section-head h2 {
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 1.6em;
	font-weight: 600;
	padding: 20px;
	margin: 0;
	display: inline-block;
}

footer {
	margin-left: #545f99;
}

footer .container {
	color: #545f99;
}

footer .container .rows {
	margin: 50px;
}

footer .top {
	display: flex;
	justify-content: space-between;
}

footer .top .logo {
	display: inline-block;
	background: #fff;
	padding: 15px;
	border-radius: 150px;
}

footer .top .logo img {
	width: 60px;
}

footer .bottom {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: flex-end;
}

footer .bottom p.copyright {
	font-weight: 600;
	font-size: 12px;
	text-transform: uppercase;
	margin-bottom: 0;
}

footer .bottom a.code-of-conduct {
	color: #545f99;
	font-weight: 600;
	font-size: 14px;
}

footer .bottom .cta {
	display: flex;
}

footer .bottom .cta a:first-child {
	margin-right: 10px;
}

footer .bottom .social-links a:first-child > img {
	margin-left: 0;
}

footer .bottom .social-links a img{
	width: 40px;
	margin-left: 5px;
}

</style>