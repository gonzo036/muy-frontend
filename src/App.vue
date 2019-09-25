<template>
	<div id="app" class="wrapper">
		<router-view/><!-- Carga las vista de las paginas en esta seccion con un header y footer -->
		<Footer />
	</div>
</template>

<script>
	import Footer from './components/Footer.vue'
	import Vuex from 'vuex';

	export default {
		name: 'app',
		components: {
			Footer
		},
		methods: {
			//Llama los metodos y las actions del store.js
			...Vuex.mapMutations(['setUser', 'setOrders']),
			...Vuex.mapActions(['getData'])
		},
		created() {
			//Valida si esta logeado para sacar la data del localStorage y asignarsela al usuario
			if (localStorage.orders) {
				this.setOrders(JSON.parse(localStorage.getItem('orders')));
			}

			if (localStorage.user) {
				this.setUser(JSON.parse(localStorage.getItem('user')));
			}
		},
		mounted() {
			//trae la data del servicio y la carga los usuarios en memoria para usar, los pedidos si no existen los mete al localStorage
			this.getData();
		}
	}
</script>

<style lang="scss" >
	@import 'assets/normalize.css';
	@import 'assets/general.scss';
	@import 'assets/header.scss';
	@import 'assets/footer.scss';
</style>
