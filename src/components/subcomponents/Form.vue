<template>
	<section class="form_box">
		<h2 class="title_form">
			Inicia tu session
		</h2>
		<div class="form">
			<div class="alert" v-show="validated">
				<div v-if="!user">Ingresa los datos en los campos</div>
			</div>
			<div class="box_elements_form">
				<label class="" htmlFor="email">Email</label>
				<input
				id="email"
				class="nameError"
				v-model="email"
				type="text"  autoComplete="username" required />
			</div>
			<div class="box_elements_form">
				<label class="" htmlFor="password">Password</label>
				<input
				id="password"
				v-model="password"
				class="numberError" type="password"  autoComplete="current-password" required />
			</div>
			<div class="box_elements_form">
				<button @click="login()">
					Enviar
				</button>
			</div>
		</div>
	</section>
</template>
<script>

	import Vuex from 'vuex';

	export default {
		name: 'Form',
		data() {
			return {// Modelos para los campos de email y password
				email: '',
				password: ''
			}
		},
		computed: {
			...Vuex.mapState(['user', 'isHiden', 'validated'])// Llama del store.js los mutations para ser usados aca
		},
		methods: {
			...Vuex.mapMutations(['searchUser']),// Llama el metodo de searchUser para buscar un usuario
			login: async function() {
				const user ={
					email: this.email,
					password:this.password
				}

				await this.searchUser(user);// se hace syncrono la busqueda del usuario

				if (this.isHiden) {// Si isHiden es true quiere decir que lo encontro y hace el redirect a dashvoard
					this.password = '';
					this.emai = '';
					this.$router.push('/dashboard');
				}
			}
		}
	}
</script>
