<template>
	<section class="form_box">
		<h2 class="title_form">
			Login
		</h2>
		<div class="form" v-bind:class="{ hidden: isHiden }">
			<div class="box_elements_form">
				<label class="" htmlFor="email">Email</label>
				<input
				id="email"
				class="nameError"
				v-model="email"
				type="text"  />
			</div>
			<div class="box_elements_form">
				<label class="" htmlFor="password">Password</label>
				<input
				id="password"
				v-model="password"
				class="numberError" type="password"   />
			</div>
			<div class="alert">alert !</div>
			<div class="box_elements_form">
				<button @click="searchUser({email, password})">
					Enviar
				</button>
			</div>
		</div>
		<div v-show="validated">
			<h1 v-if="!user">Usuario no encontrado</h1>
		</div>
		<div v-show="validated">
			<h1 v-if="user">Usuario logueado {{user.name}}</h1>
			<div class="box_elements_form">
				<button @click="setUser(undefined)">
					Desloguearse
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
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			...Vuex.mapState(['user', 'isHiden', 'validated']),
		},
		methods: {
			...Vuex.mapMutations(['searchUser', 'setUser']),
		}
	}
</script>
