import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
	state: {
		page: {
			scroll: {
				x: 0,
				y: 0
			}
		},
		menu: {
			isActive: false
		}
	},
	getters: {},
	mutations: {
		changePageScroll(state, payload) {
			state.page.scroll = payload.offset;
		},
		toggleMenu(state) {
			state.menu.isActive = !state.menu.isActive;
		}
	},
	actions: {}
});