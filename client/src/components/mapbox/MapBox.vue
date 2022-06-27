<template>
    <main class="map-container">
        <v-map class="w-full h-full" :options="map" />
    </main>
</template>

<script>
import VMap from "v-mapbox";

export default {
    components: {
        VMap,
    },
    props: {
        workout: Object,
        startPos: Array
    },
    data() {
        return {
            map: {
                accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
                style: "mapbox://styles/mapbox/streets-v11?optimize=true",
                // style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
                center: this.startPos,
                zoom: 11,
                maxZoom: 22,
                crossSourceCollisions: false,
                failIfMajorPerformanceCaveat: false,
                attributionControl: false,
                preserveDrawingBuffer: true,
                hash: false,
                minPitch: 0,
                maxPitch: 60,
            },
        }
    },
    created() {
        console.log('map data', this.startPos)
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