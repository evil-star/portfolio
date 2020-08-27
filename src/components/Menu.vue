<template>
	<div class="menu" :class="{ active: $store.state.menu.isActive }">
		<div class="menu__anim-lines">
			<div class="menu__anim-line"></div>
			<div class="menu__anim-line"></div>
			<div class="menu__anim-line"></div>
			<div class="menu__anim-line"></div>
		</div>
		<div class="menu__links">
			<div
				class="menu__link-wrap"
				v-for="(link, index) in links"
				:key="index"
			>
				<a href="" class="menu__link">
					<span class="menu__link-num">{{
						formatLinkNum(index + 1)
					}}</span>
					<span class="menu__link-text">{{ link.text }}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Menu",
	data() {
		return {
			links: [
				{ text: "Главная", url: "/" },
				{ text: "Обо мне", url: "/" },
				{ text: "Работы", url: "/" },
				{ text: "Контакты", url: "/" },
			],
		};
	},
	methods: {
		formatLinkNum(num) {
			if (num < 10) {
				num = "0" + num;
			}
			return num;
		},
	},
};
</script>

<style lang="sass" scoped>
.menu
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100%
	pointer-events: none
	z-index: 10
	&__anim-lines
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
	&__anim-line
		height: 25vh
		background-color: #000
		width: 0
		transform-origin: left top
		transition: width .7s ease
		&:nth-child(2)
			transition-delay: .1s
		&:nth-child(3)
			transition-delay: .2s
		&:nth-child(4)
			transition-delay: .3s
	&__links
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		min-height: 100vh
	&__link
		display: block
		visibility: hidden
		color: #3D3D3D
		font-weight: 600
		font-size: 3em
		text-decoration: none
		transform: translateY(100%)
		transition: transform 1s cubic-bezier(.4,0,.2,1)
		padding: 3.5vh 0
		&:hover, &.active
			color: #fff
			.menu
				&__link-num
					display: block

		&-text
			z-index: 10
			position: relative
		&-num
			display: none
			font-weight: 600
			font-size: 2.5em
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			z-index: 5
			color: #3D3D3D
		&-wrap
			overflow: hidden
			position: relative

			&:nth-child(1)
				.menu__link
					transition-delay: .3s
			&:nth-child(2)
				.menu__link
					transition-delay: .4s
			&:nth-child(3)
				.menu__link
					transition-delay: .5s
			&:nth-child(4)
				.menu__link
					transition-delay: .6s


	// Active menu
	&.active
		pointer-events: auto
		.menu
			&__anim-line
				width: 100%
			&__link
				visibility: visible
				transform: translateY(0)
</style>
