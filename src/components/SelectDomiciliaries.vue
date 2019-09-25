<template>
	<div class="select-style">
		<select v-model="selected"  @change="changeLocation(order.id)">
			<option value="">No esta asignado...</option>
			<option v-for="domiciliary in domiciliaries" v-bind:value="domiciliary.id">
				{{domiciliary.name}}
			</option>
		</select>
	</div>
</template>


<script>
	import Vuex from 'vuex';

	export default {
		name: 'SelectDomiciliaries',
		props: ['order'],
		data() {
			return {
				selected: this.order.domiciliarioId ? this.order.domiciliarioId : ''
			}
		},
		computed:{
			...Vuex.mapState(['domiciliaries']),// Carga la informacion del usuario a utilizar
		},
		methods: {
			...Vuex.mapMutations(['assignDomiciliary']),// llama la funcion para desloguear al usuario
			changeLocation(orderId) {
				if (this.selected) {
					const data = {
						domiciliary: this.selected,
						order: orderId
					};

					this.assignDomiciliary(data);
				} else {
					const data = {
						domiciliary: undefined,
						order: orderId
					};

					this.assignDomiciliary(data);
				}
			}
		}
	}
</script>
