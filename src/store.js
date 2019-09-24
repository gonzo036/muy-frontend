import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		users: [],
		orders: [],
		user: undefined,
		isHiden: false,
		validated: false
	},
	mutations: {
		searchUser(state, user) {
			state.validated = true;
			const userFind = state.users.find((u) => {
				return u.email === user.email && u.password === user.password;
			});
			if (userFind) {
				localStorage.user = userFind;
				state.user = userFind;
				state.isHiden = true;
			}
		},
		getAllData(state, response) {
			state.users = response.users;
			state.orders = response.orders;
		},
		setUser(state, user) {
			state.user = user;
			if (user) {
				state.validated = true;
				state.isHiden = true;
			} else {
				localStorage.removeItem('user');
				state.validated = false;
				state.isHiden = false;
			}

		}
	},
	actions: {
		getData: async function ({commit}) {
			const data = await fetch('https://raw.githubusercontent.com/kevmuy/test-frontend/master/RH.json');
			const resp = await data.json();
			commit('getAllData', resp.response);
		}
	}
});
