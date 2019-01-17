<template>
	<div id="footer">
    	<p>© {{ year }}, Machine Intelligence Community, Inc.</p>
      <p><a href="/about"> about</a></p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      year: 0
    }
  },
  methods: {
    update_year() {
      this.year = (new Date()).getFullYear();
    }
  },
  mounted() {
    this.update_year();
  }
}
</script>

<style>
#footer {
	display: flex;
	justify-content: center;
}

#footer p {
	margin: 10px;
	font-size: 12px;
	color: #525252;
}
</style>