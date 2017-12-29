<template>
  <div id="app">
    <nav-bar></nav-bar>
    <el-row :gutter="20">
      <el-col :span="8">
        <h1>Countries</h1>
        <countries></countries>
        <p></p>
        <country-detail></country-detail>
      </el-col>
      <el-col :span="16">
          <country-map :selected-country="selectedCountry">
          </country-map>
      </el-col>
    </el-row>
    <el-row :gutter="20">
    </el-row>
  </div>
</template>

<script>
import {Store} from './store/store'

export default {
  name: 'app',
  computed: {
    totalCost(){
      return Store.totalCost
    },
    selectedCountry() {
      return Store.selectedCountry
    },
    token() { return 'pk.eyJ1IjoiYXNpYW5yaWRlciIsImEiOiJiSlowS0dBIn0.ICOwYF6Jng1-WbeDzmZ3tA' }
  }
}
</script>
