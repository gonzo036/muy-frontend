import Vue from 'vue';
import Vuex from 'vuex';

const INDICATIONS = [
	'Por aquí a la izquierda',
	'Lo quiero ¡ya!',
	'No me Importa',
	'Por acá al frente, casa roja'
]

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		users: [],
		orders: [],
		ordersFind: [],
		user: undefined,
		isHiden: false,
		validated: false,
		domiciliaries: []
	},
	mutations: {
		searchUser(state, user) {
			state.validated = true;
			const userFind = state.users.find((u) => {
				return u.email === user.email && u.password === user.password;
			});
			if (userFind) {
				if (userFind.role === 'Asignador') {
					state.ordersFind = state.orders.filter((order) => {
						return order.store === userFind.store;
					});
				} else {
					state.ordersFind = state.orders.filter((order) => {
						return order.domiciliarioId === userFind.id;
					});
				}

				localStorage.user = JSON.stringify(userFind);
				state.user = userFind;
				state.isHiden = true;
			}
		},
		getAllData(state, response) {
			state.users = response.users;

			if (!localStorage.orders) {
				const myNewOrders = response.orders.map((order) => {
					const i =Math.floor((Math.random() * 4));
					return {...order, assignated:false, domiciliarioId: null, deliveryTime: null, indications: INDICATIONS[i]}
				});
				state.orders = myNewOrders;
				state.ordersFind = myNewOrders;
				localStorage.orders = JSON.stringify(myNewOrders);
			}

		},
		setUser(state, user) {
			state.user = user;
			if (user) {
				state.validated = true;
				state.isHiden = true;
				if (user.role === 'Asignador') {
					state.ordersFind = state.orders.filter((order) => {
						return order.store === user.store;
					});
				} else {
					state.ordersFind = state.orders.filter((order) => {
						return order.domiciliarioId === user.id;
					});
				}
				console.log(state.ordersFind);
			} else {
				localStorage.removeItem('user');
				state.validated = false;
				state.isHiden = false;
			}
		},
		setOrders(state, orders) {
			state.orders = orders;
		},
		getDomiciliaries(state) {
			state.domiciliaries = state.users.filter((user) => {
				return user.role === 'Domiciliario' && user.store === state.user.store;
			});
		},
		assignDomiciliary(state, data) {
			const myOrders = state.orders.map((order) => {
				if (data.order === order.id ) {
					order.domiciliarioId = data.domiciliary;
				}
				return order;
			});

			localStorage.orders = JSON.stringify(myOrders);
		}
	},
	actions: {
		getData: async function ({commit}) {
			const data = await fetch('https://raw.githubusercontent.com/kevmuy/test-frontend/master/RH.json');
			const resp = await data.json();
			await commit('getAllData', resp.response);
			commit('getDomiciliaries');
		}
	}
});
