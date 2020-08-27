<template>
	<div id="app">
		<Menu></Menu>
		<NavBar></NavBar>
		<div id="main-scroll" ref="mainSroll">
			<!-- <div id="nav">
				<router-link to="/">Home</router-link> |
				<router-link to="/about">About</router-link>
			</div> -->
			<div>
				<router-view />
				<Footer></Footer>
			</div>
		</div>
	</div>
</template>

<script>
import "reset-css";
import "@/assets/sass/main.sass";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Scrollbar from "smooth-scrollbar";

export default {
	data() {
		return {};
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
	},
	mounted() {
		const scrollbar = Scrollbar.init(this.$refs.mainSroll);

		// On page scroll
		scrollbar.addListener((status) => {
			window.dispatchEvent(new Event("scroll"));
			this.$store.commit("changePageScroll", status);
		});
	},
	destroy() {
		Scrollbar.destroyAll();
	},
};
</script>
