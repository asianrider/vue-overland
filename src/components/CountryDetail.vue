<template>
	    <el-card>
        <span>Code:</span><el-input v-model="country.adm0_a3"></el-input>
        <span>Name:</span><el-input v-model="country.name"></el-input>
        <div class="bottom clearfix">
        	<el-button type="info" @click='addToCart(product)'>Add to cart</el-button>
        </div>
	    </el-card>
</template>

<script>
import {Store} from '../store/store'

export default {
  data() {
    return {
    	products: Store.$data.products,
			}
	},
	computed: {
			country() {
				let current = Store.selectedCountry
				if (current) {
					return current.data()
				} else
				 	return {
						name: "",
						adm0_a3: ""
					}
			}
  },
  methods: {
  	addToCart(product){
  		Store.addToCart(product)
  	}
  },
  created () {
    console.log(Store.$data.db)
  }
}
</script>
<style>
  .image {
    width: 100%;
    display: block;
  }
</style>
