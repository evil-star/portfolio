<template>
	<div id="app">
		<Menu></Menu>
		<NavBar></NavBar>
		<div id="main-scroll" ref="mainSroll">
			<div>
				<transition
					name="page-slide"
					mode="out-in"
					@beforeLeave="beforeLeave"
				>
					<router-view />
				</transition>
				<Footer></Footer>
			</div>
		</div>
	</div>
</template>

<style lang="sass">
.page-slide-enter-active,
.page-slide-leave-active
	transition-duration: 0.3s
	transition-property: transform, opacity
	transition-timing-function: cubic-bezier(.77,0,.175,1)

.page-slide-enter,
.page-slide-leave-active
	opacity: 0

.page-slide-enter
	transform: translateX(100%)
.page-slide-leave-active
	transform: translateX(-100%)
</style>

<script>
import "reset-css";
import "@/assets/sass/main.sass";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Scrollbar from "smooth-scrollbar";

export default {
	data() {
		return {
			pageLeaveDelay: 0,
		};
	},
	components: {
		NavBar,
		Footer,
		Menu,
	},
	methods: {
		onPageScroll(status) {
			this.scrollTop = status.offset.y;
		},
		beforeLeave() {
			if (this.$store.state.menu.isActive) {
				this.$store.commit("toggleMenu");
			}
		},
	},
	mounted() {
		const scrollbar = Scrollbar.init(this.$refs.mainSroll);

		// On page scroll
		scrollbar.addListener((status) => {
			window.dispatchEvent(new Event("scroll"));
			this.$store.commit("changePageScroll", status);
		});
	},
	destroyed() {
		Scrollbar.destroyAll();
	},
};
</script>
