<template>
	<div class="container">
		<div id="cover">
			<img id='dragme' :src="src" @onmousedown="startDrag($event)" @onmouseup="stopDrag($event)">
		</div>
		<input type="file" name="image" v-on:change="add_image($event)" accept="image/*">
	</div>
</template> 

<script>
export default {
	data() {
		return {
			drag: false,
			target: undefined,
			coordX: 0,
			coordY: 0,
			src: '',
			name: '',
			editable: false,
			last_modified: undefined,
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		add_image(event) {
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
		dragDiv(event) {
			if (!this.drag) return;
			if (!event) var event = window.event;

			this.targ.style.left = (this.coordX + e.clientX - offsetX) + 'px';
			this.targ.style.top = (this.coordY + e.clientY - offsetY) + 'px';

			return false;
		},
		startDrag(event) {
			// determine event object
			if (!event) var e = window.event;

            if(e.preventDefault) e.preventDefault();

			// IE uses srcElement, others use target
			this.targ = e.target ? e.target : e.srcElement;

			if (this.targ.className != 'dragme') return;
			// calculate event X, Y coordinates
			this.offsetX = e.clientX;
			this.offsetY = e.clientY;

			// assign default values for top and left properties
			if(!this.targ.style.left) this.targ.style.left='0px';
			if (!this.targ.style.top) this.targ.style.top='0px';

			// calculate integer values for top and left 
			// properties
			this.coordX = parseInt(this.targ.style.left);
			this.coordY = parseInt(this.targ.style.top);
			this.drag = true;

			// move div element
			document.onmousemove = this.dragDiv;
            return false;
			
		},
		stopDrag(event) {
			this.drag = false;
		}
	}
}
</script>

<style>
#cover {
	width: 1080px;
	height: 250px;
	background-color: #e3e3e3
}

#dragme {
	position:relative;
	width: 1080px;
	height: auto;
	cursor: move;
}

#cover {
	z-index: -1;
}
</style>