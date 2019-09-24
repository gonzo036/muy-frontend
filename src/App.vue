<template>
	<div id="app" class="wrapper">
		<Header />
		<Login />
		<Admin />
		<Profile />
		<Footer />
	</div>
</template>

<script>
	import Header from './components/Header.vue'
	import Login from './components/Login.vue'
	import Admin from './components/Admin.vue'
	import Profile from './components/Profile.vue'
	import Footer from './components/Footer.vue'
	import Vuex from 'vuex';

	export default {
		name: 'app',
		components: {
			Header,
			Login,
			Admin,
			Profile,
			Footer
		},
		methods: {
			...Vuex.mapMutations(['setUser']),
		},
		mounted() {
			if (localStorage.user) {
				this.setUser(localStorage.getItem('user'));
			}
		}
	}
</script>

<style lang="scss" >
	@import 'assets/normalize.css';
	@import 'assets/general.scss';
	@import 'assets/header.scss';
	@import 'assets/footer.scss';
</style>
