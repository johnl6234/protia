<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TheNavbar from './components/TheNavbar.vue';
import AuthView from './views/AuthView.vue';
</script>

<template>
    <AuthView v-if="!this.$store.getters.isLoggedIn" />
    <div v-else class="container">
        <TheNavbar />
        <RouterView />
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: mapState(['loggedIn']),
    watch: {
        loggedIn(newValue, oldValue) {
            console.log(`Updating from ${oldValue} to ${newValue}`);
        }
    }
}
</script>
<style>
@import '@/assets/base.css';

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: sans-serif;
    font-weight: 100;
    --grid-gap: 1px;
    --day-label-size: 20px;
    --light-grey: rgb(239, 239, 239);
    --blue: #005695;
    --light-blue: #D1EBFF;
    --color-blue-1: #005695;
    --color-blue-1-light: #006bb9;
    --color-blue-2: #3c7fc4;
    --color-blue-2-dark: #336da9;
    --color-blue-2-darker: #244c76;
    --color-white: #fff;
    --color-grey-white: #f7f7f7;
    --color-grey-1: #eaebec;
    --color-grey-2: #ccc;
    --color-grey-3: #636569;
    --color-grey-4: #303030;
    --color-grey-6: #dedcdc;
    --color-grey-9: #b5b5b5;
    --color-grey-9-dark: #a3a3a3;
    --color-grey-9-darker: #828282;
    --color-grey-10: #76787d;
    --color-grey-11: #8d8d8d;
    --color-grey-12: #4a4a4a;
    --color-grey100: #e4e9f0;
    --color-grey200: #cfd7e3;
    --color-grey300: #b5c0cd;
    --color-grey800: #3e4e63;
    --color-event: #007c7c;
    --color-save: #058D05;
    --color-reset: #929292;
    --color-cancel: #D42D2D;
    --color-sport-bike: #561484;
    --color-sport-brick: #7b1f40;
    --color-sport-mtb: #6e512a;
    --color-sport-other: #8e1094;
    --color-sport-rest: #84979c;
    --color-sport-rowing: #14afd9;
    --color-sport-run: #1e5162;
    --color-sport-ski: #d26033;
    --color-sport-strength: #551a51;
    --color-sport-swim: #0382b1;
    --color-sport-walk: #aba001;
    --color-zones-hr: #b82410;
    --color-zones-power: #5a0792;
    --color-zones-pace: #125689;
    --color-zebra-stripe-even: hsla(0, 0%, 80%, 0.5);
    --color-zebra-stripe-odd: var(--color-grey-1);
    --color-zebra-stripe-hover: hsla(0, 0%, 80%, 0.25);
    --color-zebra-stripe-selected: var(--color-white)
}

html {
    scroll-behavior: smooth;
}

body,
html {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
    background-color: var(--color-grey-2) !important;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 100vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
}

.container {
    min-height: 100vh;
}
</style>
