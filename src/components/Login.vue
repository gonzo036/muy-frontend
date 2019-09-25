<template>
	<main class="form_container">
		<Info />
		<Form />
	</main>
</template>

<script>

import Form from './subcomponents/Form.vue'
import Info from './subcomponents/Info.vue'
import Vuex from 'vuex';

export default {
	name: 'FormContainer',
	components: {
		Form,
		Info
	},
	mounted() {
		if (localStorage.user) {//Si existe el local stora lo redirige a la ruta de dashboard
			this.$router.push('/dashboard');
		}
	}
}
</script>
