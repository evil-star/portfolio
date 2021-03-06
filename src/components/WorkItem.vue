<template>
	<div class="work-item" ref="workItem">
		<div class="work-item__media">
			<video
				loop
				muted
				@mouseenter="playVideo"
				@mouseleave="stopVideo"
				ref="video"
			>
				<source
					:src="require(`@/assets/video/${video}.mp4`)"
					type="video/mp4"
				/>
				<source
					:src="require(`@/assets/video/${video}.webm`)"
					type="video/webm"
				/>
			</video>
		</div>
		<div
			class="work-item__info"
			ref="info"
			:style="{ transform: translateY }"
		>
			<div class="work-item__title">{{ title }}</div>
			<div class="work-item__desc">{{ desc }}</div>
			<Button :href="url" target="_blank">Перейти</Button>
		</div>
	</div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";
import percentageSeen from "@/helpers/percentageSeen.js";
import Button from "@/components/Button";

export default {
	name: "WorkItem",
	data() {
		return {
			tiltOptions: {
				max: 5,
				reverse: true,
				"full-page-listening": true,
			},
			isInfoVisible: false,
			translateY: "",
		};
	},
	props: ["title", "desc", "video", "url"],
	methods: {
		initTilt() {
			VanillaTilt.init(this.$refs.video, this.tiltOptions);
		},
		parallax() {
			if (window.innerWidth < 1200 && !this.$refs.video.length) return 0;

			const percent = percentageSeen(
				this.$refs.info,
				this.$store.state.page.scroll
			);
			const val = percent * 2;

			this.translateY = `translateY(${val}px)`;
		},
		playVideo() {
			this.$refs.video.play();
		},
		stopVideo() {
			this.$refs.video.pause();
		},
	},
	components: { Button },
	mounted() {
		this.initTilt();

		window.addEventListener("scroll", this.parallax);
	},
	destroyed() {
		window.removeEventListener("scroll", this.parallax);
	},
};
</script>

<style lang="sass">
.work-item
	display: flex
	flex-wrap: wrap
	&__media
		width: 70%
		video
			max-width: 100%
			box-shadow: rgba(0, 0, 0, 0.05) 1px -2px 20px 3px
	&__title
		font-family: "Merriweather"
		font-size: 16px
		font-size: 1.5em
		margin-bottom: .7em
		line-height: 1.2em
	&__desc
		margin-bottom: 1.5em
	&__info
		padding: 3vh 0 3vh 3.5vw
		width: 30%
		will-change: transform

@media (max-width: 1200px)
	.work-item
		&__media
			width: 100%
		&__info
			width: 100%
			padding-left: 0
			padding-right: 0
</style>
