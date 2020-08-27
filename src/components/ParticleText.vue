<template>
	<canvas ref="scene" class="scene"></canvas>
</template>

<script>
import TextParticle from "@/constructors/TextParticle";

export default {
	name: "ParticleText",
	data() {
		return {
			showText: true,
			mouse: { x: 0, y: 0 },
			ww: 0,
			wh: 0,
			ctx: {},
			particles: [],
			colors: ["#000"],
			textParticle: {},
			amount: 0,
			canvasOffset: {},
			radius: 1,
			particleRadius: 5,
			sceneHeight: 0,
		};
	},
	props: ["text"],
	methods: {
		onMouseMove(e) {
			this.mouse.x = e.clientX - this.canvasOffset.left;
			this.mouse.y =
				e.clientY -
				this.canvasOffset.top +
				this.$store.state.page.scroll.y;
		},
		onTouchMove(e) {
			if (e.touches.length > 0) {
				this.mouse.x = e.touches[0].clientX - this.canvasOffset.left;
				this.mouse.y =
					e.touches[0].clientY -
					this.canvasOffset.top +
					window.scrollY;
			}
		},
		initScene(e) {
			this.ww = this.$refs.scene.width = window.innerWidth;
			this.wh = this.$refs.scene.height = this.sceneHeight;

			this.ctx.clearRect(
				0,
				0,
				this.$refs.scene.width,
				this.$refs.scene.height
			);

			this.ctx.font = "bold " + this.ww / 9.8 + "px sans-serif";
			this.ctx.textAlign = "center";
			this.ctx.fillText(this.text, this.ww / 2, this.wh / 1.8);

			var data = this.ctx.getImageData(0, 0, this.ww, this.wh).data;
			this.ctx.clearRect(
				0,
				0,
				this.$refs.scene.width,
				this.$refs.scene.height
			);
			this.ctx.globalCompositeOperation = "screen";

			this.particles = [];
			for (var i = 0; i < this.ww; i += Math.round(this.ww / 150)) {
				for (var j = 0; j < this.wh; j += Math.round(this.ww / 150)) {
					if (data[(i + j * this.ww) * 4 + 3] > 150) {
						this.particles.push(
							new TextParticle(
								i,
								j,
								this.radius,
								this.colors,
								this.ctx,
								this.mouse,
								this.particleRadius
							)
						);
					}
				}
			}
			this.amount = this.particles.length;
		},
		onTouchEnd(e) {
			this.mouse.x = -9999;
			this.mouse.y = -9999;
		},
		render(a) {
			requestAnimationFrame(this.render);
			this.ctx.clearRect(
				0,
				0,
				this.$refs.scene.width,
				this.$refs.scene.height
			);
			for (var i = 0; i < this.amount; i++) {
				this.particles[i].render();
			}
		},
	},
	mounted() {
		if (window.innerWidth > 1200) {
			this.sceneHeight = 600;
		} else if(window.innerWidth > 768) {
			this.sceneHeight = 500;
		} else if(window.innerWidth < 769) {
			this.sceneHeight = 300;
		}

		this.canvasOffset = this.$refs.scene.getBoundingClientRect();
		this.ctx = this.$refs.scene.getContext("2d");
		this.ww = this.$refs.scene.width = window.innerWidth;
		this.wh = this.$refs.scene.height = this.sceneHeight;

		window.addEventListener("resize", (e) => this.initScene(e));
		window.addEventListener("mousemove", (e) => this.onMouseMove(e));
		window.addEventListener("touchmove", (e) => this.onTouchMove(e));
		window.addEventListener("touchend", (e) => this.onTouchEnd(e));
		this.initScene();
		requestAnimationFrame(this.render);
	},
	destroy() {
		window.removeEventListener("resize", (e) => this.initScene(e));
		window.removeEventListener("mousemove", (e) => this.onMouseMove(e));
		window.removeEventListener("touchmove", (e) => this.onTouchMove(e));
		window.removeEventListener("touchend", (e) => this.onTouchEnd(e));
	},
};
</script>
