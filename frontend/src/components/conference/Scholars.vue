<template>
	<div class="container">
		<h3>2019 MIT-IBM Diversity Scholars</h3>
		<ul>
			<li v-for="s in scholars._2019">
				{{ s.name }}, {{ s.from }}<br>
				<a :href="'/files/pdf/'+s.file" download>
					<i>{{ s.title }}</i>
				</a>
				<br><br>
			</li>
		</ul>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'

export default {
	components: {
		PageNav
	},
	data() {
		return {
			scholars: {
				_2019: [ 
					{ name: 'Melissa Wilson', title: 'Better Morphology Prediction for Better Speech Systems', from: 'University of Oklahoma', file: '2019-wilson-better morphology prediction for better speech systems.pdf' },
					{ name: 'Radha Kopparti', title: 'Abstract Rule Based Pattern Learning with Neural Networks', from: 'City, University of London', file: '2019-kopparti-abstract rule based pattern learning with neural networks.pdf' }
				]
			}
		}
	}
}
</script>

<style>
</style>