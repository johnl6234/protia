<template>
	<main class="map-container">
		<div id="map" />
	</main>
</template>

<script>
	import 'mapbox-gl/dist/mapbox-gl.css';
	import mapboxgl from 'mapbox-gl';
	export default {
		components: {},
		props: {
			workout: Object,
			startPos: Array,
			mapPoint: Number,
		},
		data() {
			return {
				map: null,
			};
		},
		methods: {
			setPointOnMap(point) {
				if (this.workout.route.length > 1) {
					this.map.getSource('point').setData({
						type: 'Point',
						coordinates: this.workout.route[point],
					});
				}
			},
			initMap() {
				mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
				const long = [];
				const lat = [];
				this.workout.route.forEach(coord => {
					long.push(coord[0]);
					lat.push(coord[1]);
				});
				this.map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: this.startPos,
					zoom: 15,
					maxZoom: 22,
				});
				this.map.on('load', () => {
					this.map.addSource('route', {
						type: 'geojson',
						data: {
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: this.workout.route,
							},
						},
					});
					this.map.addLayer({
						id: 'route',
						type: 'line',
						source: 'route',
						layout: {
							'line-join': 'round',
							'line-cap': 'round',
						},
						paint: {
							'line-color': '#E73838',
							'line-width': 4,
						},
					});
					this.map.fitBounds([
						[Math.min(...long) - 0.01, Math.min(...lat) - 0.01], // southwestern corner of the bounds
						[Math.max(...long) + 0.01, Math.max(...lat) + 0.01], // northeastern corner of the bounds
					]);
					// set end marker
					new mapboxgl.Marker({
						color: '#FF0000',
						draggable: false,
					})
						.setLngLat(
							this.workout.route[this.workout.route.length - 1]
						)
						.addTo(this.map);
					// set start marker
					new mapboxgl.Marker({
						color: '#00FF00',
						draggable: false,
					})
						.setLngLat(this.startPos)
						.addTo(this.map);

					// Create dot for elevation
					this.map.addSource('point', {
						type: 'geojson',
						data: { type: 'Point', coordinates: [this.startPos] },
					});
					this.map.addLayer({
						id: 'point',
						source: 'point',
						type: 'circle',
						paint: {
							'circle-radius': 5,
							'circle-color': '#007cbf',
						},
					});
				});
			},
		},
		watch: {
			mapPoint(newValue) {
				this.setPointOnMap(newValue);
			},
		},
		mounted() {
			this.initMap();
		},
	};
</script>

<style>
	.map-container {
		height: 400px;
		width: 100%;
	}

	#map {
		height: 100%;
		width: 100%;
	}
</style>
