<template>
	<el-row>
  <el-table
    :data="filteredCountries"
		@row-click="rowClick"
		highlight-current-row
    stripe
		max-height="250"
    style="width: 100%">
    	<el-table-column
			prop="name"
			label="Name"></el-table-column>
    <el-table-column
      prop="adm0_a3"
      label="adm0_a3"></el-table-column>
<!--
    <el-table-column
        label="">
        <template scope="scope">
          <el-button type="success" icon="plus" @click='addToCart(scope.row.details)' size="mini"></el-button>
          <el-button type="danger" icon="minus" @click='removeFromCart(scope.row.details.sku)' size="mini"></el-button>
        </template>
      </el-table-column>
-->
  </el-table>
	<el-button type="info" @click='fetch()'>Fetch</el-button>
	</el-row>
</template>

<script>
import {Store} from '../store/store'

export default {
  data() {
    return {
    	countries: [
          {"name": "Switzerland", "adm0_a3": "CHE"},
          {"name": "France", "adm0_a3": "FRA"}
        ]
    };
  },
	computed: {
			filteredCountries() { return _.map(Store.$data.countries, countryRef => countryRef.data()) }
  },
  methods: {
		rowClick: function(object) {
			console.log("RowClick")
			console.log(object)
				Store.selectCountry(object)
		},
		fetch: () => {
			console.log("Fetch")
			Store.fetchCountries()
		}
  }
}
</script>
<style>
</style>
