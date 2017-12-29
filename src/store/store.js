import Vue from 'vue';
import products from '../products'

import 'babel-polyfill'

import firebase from 'firebase'
import 'firebase/firestore'
import config from '../config'

console.log("intitializing with projectId: " + config.project_id)
firebase.initializeApp(config)

import countries from './countries'

export const Store = new Vue({
	data() {
	    return {
	    	products,
				currentCountryID: null,
	    	cart: [],
				countries: [],
				db: firebase.firestore()
	    };
	},
	computed: {
		totalCost(){
			return this.cart.reduce((accum, product) => {
				return accum + product.details.price * product.quantity
			}, 0)
		},
		selectedCountry() {
			console.log("Looking for " + this.currentCountryID)
			let doc = _.find(this.countries, country => country.data().adm0_a3 == this.currentCountryID)
			console.log("Found selected country: ")
			console.log(doc)
			return doc;
		}
	},
	methods: {
		selectCountry(country) {
			this.currentCountryID = country.adm0_a3
			console.log("Select country ID: " + this.currentCountryID)
		},

		async fetchCountries() {
			console.log("Fetching all countries")
			let countriesRef = this.db.collection('countries')
			let countries = await countriesRef.get()

			countries.forEach(country => this.setCountry(country))
			console.log("$emit")
			this.$emit('countriesLoaded')
		},

		setCountry(country) {
			const data = country.data()
			console.log("Setting country " + data.name)
			this.countries.push(country)
		},

		addToCart(product){
			const locationInCart = this.cart.findIndex(p => {
				return p.details.sku === product.sku
			})

		    if (locationInCart === -1) {
		        this.cart.push({
		          details: product,
		          quantity: 1
		        })
		    } else {
		        this.cart[locationInCart].quantity++
		    }
		},
		removeFromCart(sku){
			const locationInCart = this.cart.findIndex(p => {
				return p.details.sku === sku
			})

			if(this.cart[locationInCart].quantity <= 1){
				this.cart.splice(locationInCart, 1)
			} else {
				this.cart[locationInCart].quantity--
			}
		}
	},
	modules: {
		countries
	}
});
