import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'

import NavBar from './components/NavBar.vue'
import ProductList from './components/ProductList.vue'
import CountryDetail from './components/CountryDetail.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import Countries from './components/Countries.vue'
import CountryMap from './components/CountryMap.vue'
import _ from 'lodash'
import mapboxgl from 'mapbox-gl'
import Mapbox from 'mapbox-gl-vue'

// Services
Vue.use(Element, { locale })

// external
Vue.set(Vue.prototype, '_', _);

// Components
Vue.component('NavBar', NavBar)
Vue.component('ProductList', ProductList)
Vue.component('CountryDetail', CountryDetail)
Vue.component('ShoppingCart', ShoppingCart)
Vue.component('Countries', Countries)
Vue.component('CountryMap', CountryMap)
Vue.component('Mapbox', Mapbox)

// Filters
Vue.filter('currency', function (value) {
    return '$' + parseFloat(value/100).toFixed(2);
});

new Vue({
  el: '#app',
  render: h => h(App)
})
