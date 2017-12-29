<template>
<!-- #app -->
<div>
<mapbox
  :map-options="this.$data.mapOptions"
  :access-token="accessToken"
  @map-load="mapLoaded"
  @map-click="mapClicked"
>
</mapbox>
<div>
  {{ countryOutlines.length }} / {{ selectedCountry ? selectedCountry.id : "None" }}
</div>
</div>
</template>

<script>
import { Store } from '../store/store'

export default {
  props: [ 'selectedCountry' ],
  mounted() {
    console.log("Installing $on");
    Store.$on('countriesLoaded', () => { console.log("$on"); if (window.mapbox_map) this.mapLoaded(window.mapbox_map) })
  },
  data() {
    return {
      mapOptions: {
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [70, 37.8],
        zoom: 2
      },
      accessToken: 'pk.eyJ1IjoiYXNpYW5yaWRlciIsImEiOiJiSlowS0dBIn0.ICOwYF6Jng1-WbeDzmZ3tA',
      selectionLayer: {},
      mapbox_map: {}
    }
  },
  computed: {
    countryOutlines() { return Store.$data.countries.map(countryRef => countryRef.data().geometry) }
  },
  methods: {
    mapClicked(map) {
      if (map === window.mapbox_map) {
        console.log("Okay...")
        if (window.currentSelectionLayerId) {
          let layer = map.getLayer(window.currentSelectionLayerId)
          if (layer) {
            console.log("Ok, found old selection layer.")
          } else {
            console.log("Error: cannot find old layer with ID: " + window.currentSelectionLayerId)
          }
        }
      } else {
        console.log("Error: no match between map === window.mapbox_map");
      }
      console.log("map has " + map.getStyle().layers.length + " layers")
      let agoLayer = window.mapbox_map.getLayer("AGO")
      if (agoLayer)
        console.log("Found layer for AGO")
      else {
        console.log("AGO layer not found");
      }
      window.mapbox_map = map
      this.addSelectionLayer()
    },
    mapLoaded(map) {
      window.mapbox_map = map
      console.log(map)
      Store.$data.countries.forEach(country => {
        let data = country.data()
        console.log("Loading: " + data.adm0_a3)
        let geom = data.geometry.length

        map.addLayer({
          'id': data.adm0_a3,
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': JSON.parse(data.geometry)
          },
          'layout': {},
          'paint': {
            'line-color': '#F00',
            'line-width': 1
          }
        })

      })
      let agoLayer = map.getLayer("AGO")
      if (agoLayer)
        console.log("Found layer for AGO")
      else {
        console.log("AGO layer not found");
      }

    },
    addSelectionLayer() {
      if (this.selectedCountry) {
        console.log("New selected country: " + this.selectedCountry.id );
        // console.log("Geometry length: " + Store.selectedCountry.data().geometry.length)

        if (window.currentSelectionLayerId) {
          let layer = window.mapbox_map.getLayer(window.currentSelectionLayerId);
          if (layer) {
            console.log("Ok, found old selection layer. Now remove it");
            console.log(layer);
            window.mapbox_map.removeLayer(window.currentSelectionLayerId);
            console.log("Removed old layer: " + window.currentSelectionLayerId);
          } else {
            console.log("Error: cannot find old layer with ID: " + window.currentSelectionLayerId);
          }
        }
        window.currentSelectionLayerId = "fill" + this.selectedCountry.id;
        console.log("There are " + Object.keys(window.mapbox_map.style._layers).length + " layers before");
        window.mapbox_map.addLayer({
          'id': window.currentSelectionLayerId,
          'type': 'fill',
          'source': { 'type': 'geojson',
                      'data': JSON.parse(Store.selectedCountry.data().geometry) },
          'layout': {},
          'paint': {
            'fill-color': '#FF0',
            'fill-opacity': 0.5
          }
        });
        console.log("Added new layer: " + window.currentSelectionLayerId);
        console.log("There are " + Object.keys(window.mapbox_map.style._layers).length + " layers after");
        console.log("Checking..");
        let newLayer = window.mapbox_map.getLayer(window.currentSelectionLayerId);
        if (newLayer) {
          console.log("Ok, layer correctly added.");
        } else {
          console.log("Error: cannot find just created layer with ID: " + window.currentSelectionLayerId);
        }
      } else
        console.log("No selected country");
    }
  },
  watch: {
    selectedCountry() {
      this.addSelectionLayer()
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
<style src="../../node_modules/mapbox-gl/dist/mapbox-gl.css">
</style>
