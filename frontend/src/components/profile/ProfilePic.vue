<template>
	<div>
		<div class="crop">
			<img v-if="src.length > 0" :src="src">
			<div v-else></div>
		</div>
		<div v-if="is_myprof" id="upload">
			<label for="upload_picture">Change</label>
			<input id="upload_picture" type="file" name="image" v-on:change="change($event)" accept="image/*">
		</div>
	</div>
</template>

<script>
import AuthenicationService from '@/services/AuthenticationService'

export default {
	beforeMount() {
		// this.can_edit().then((resp) => {
		// 	this.is_myprof = resp;
		// });
	},
	data() {
		return {
			last_modified: undefined,
			name: '',
			src: '',
			is_myprof: true
		}
	},
	methods: {
		change(event) {
			var el = event.target;

			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					// everything in this scope is async so accessing any of the variables
					// that are updated in here will not be updated after this scope e.g. this.content
					var src = e.target.result;
				
					if(src.length > 0) {
						console.log(el.files[0]);
						this.name = el.files[0].name;
						this.src = src;
						this.last_modified = new Date();
					}
				}
				reader.readAsDataURL(el.files[0]);
			}
		},
		async can_edit() {
			// AuthenicationService.canEdit({ id: })
		}
	}
}
</script>

<style>
.crop {
	width: 150px;
	height: 150px;
	margin-top: 10px;
}
.crop img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.crop div {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #5d5499;
	border: solid;
	border-width: 1px;
	border-color: #e0e0e0;
}

#upload label {
	font-weight: bold;
	text-transform: uppercase;
}

#upload_picture {
	display: none;
}

</style>