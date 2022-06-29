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
		},
		methods: {},
		mounted() {
			console.log('workout', this.workout);
			mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
			const long = [];
			const lat = [];
			this.workout.route.forEach(coord => {
				long.push(coord[0]);
				lat.push(coord[1]);
			});
			const map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: this.startPos,
				zoom: 15,
				maxZoom: 22,
			});
			map.on('load', () => {
				map.addSource('route', {
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
				map.addLayer({
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
				map.fitBounds([
					[Math.min(...long) - 0.01, Math.min(...lat) - 0.01], // southwestern corner of the bounds
					[Math.max(...long) + 0.01, Math.max(...lat) + 0.01], // northeastern corner of the bounds
				]);
			});
		},
		beforeUnmount() {},
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
