<template>
	<div class="wrapper_int" v-bind:class="compClasses">
	<header class="int_header">
		<nav>
			<div class="nav_icon" v-on:click="active = !active">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div>
				<a href="/">
					<img src="../assets/images/logo.png" class="header_logo" />
				</a>
				<ul>
					<li class="mobile_info">
						<h1 v-if="user"><img src="../assets/images/profile.png" alt=""/> {{user.name}}</h1>
					</li>
					<li>
						<a @click="logout()">
							Desloguearse
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
	<main class="admin_container">
		<h1 v-if="user"><img src="../assets/images/profile.png" alt=""/> {{user.name}}</h1>
		<h2><b>Ordenes de la tienda:</b> {{user.store}}</h2>
		<ul>
			<li class="list_orders" v-for="(order, index) in ordersFind">
				<div class="item_info">
					<div class="title_item">Código de orden: </div>
					<div class="item"># {{order.id}}</div>
				</div>
				<div class="item_info">
					<div class="title_item">Nuestro Cliente:</div>
					<div class="item">{{order.userName}}</div>
				</div>
				<div class="item_info">
					<div class="title_item">
						productos Solicitados: 
					</div>
					<ol class="item">
						<li class="product" v-for="product in order.products">
							<img src="../assets/images/test_producto.png" alt=""/>
							{{product.name}}
						</li>
					</ol>
				</div>
				<div class="item_info">
					<div class="title_item">Hora de la order:</div>
					<div class="item">{{order.createdDate}}</div>
				</div>
				<div class="item_info">
					<div class="title_item">Indicaciones de entrega:</div>
					<div class="item">{{order.indications}}</div>
				</div>
				<div class="item_info">
					<div class="title_item">Asignado a:</div>
					<div class="item"><SelectDomiciliaries v-bind:order="order"/></div>
				</div>
				
			</li>
		</ul>
	</main>
	</div>
</template>

<script>
	
	import Vuex from 'vuex';
	import SelectDomiciliaries from '../components/SelectDomiciliaries';

	export default {
		name: 'Admin',
		data(){
			return {
				selected:""
			};
		},
		data: function() {
		  return {
		    active: false
		  };
		},
		components: {
			SelectDomiciliaries
		},
		computed:{
			...Vuex.mapState(['user', 'ordersFind']),// Carga la informacion del usuario a utilizar
			
			compClasses:function(){
				return{
					active: this.active
				}
			}
		},
		methods:{
			...Vuex.mapMutations(['setUser']),// llama la funcion para desloguear al usuario
			logout: async function() {
				await this.setUser(undefined);
				this.$router.push('/');
			}
		},
		created() {

		},
		mounted() {
			if (!localStorage.user) {// si no existe la variable en localStorage redirecciona al home
				this.$router.push('/');
			}
		}
	}
</script>
