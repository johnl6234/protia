<template>
    <main class="map-container">
        <VMap class="w-full h-full" :options="state.map" @load="onMapLoaded" />
    </main>
</template>

<script>
import { VMap, } from "v-mapbox";
import mapbox from "mapbox-gl";
import { reactive } from "vue";

export default {
    components: {
        VMap,
    },
    props: {
        workout: Object,
        startPos: Array
    },
    setup(props) {
        const state = reactive({
            map: {
                accessToken:
                    "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
                style: "mapbox://styles/mapbox/streets-v11?optimize=true",
                // style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
                center: props.startPos,
                zoom: 15,
                maxZoom: 22,
                crossSourceCollisions: false,
                failIfMajorPerformanceCaveat: false,
                attributionControl: false,
                preserveDrawingBuffer: true,
                hash: false,
                minPitch: 0,
                maxPitch: 60,
            }
        });

        return {
            state,
        };
    },
    methods: {
        onMapLoaded(event) {
            console.log('before event')//, event)
            event.map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': this.workout.route
                    }
                }
            });
            event.map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#E73838',
                    'line-width': 4
                }
            });
            console.log('after event', event)

        }
    },
    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = mapbox;
    }
}


</script>

<style>
@import "mapbox-gl/dist/mapbox-gl.css";
@import "v-mapbox/dist/v-mapbox.css";

.map-container {
    height: 400px;
    width: 100%
}
</style>