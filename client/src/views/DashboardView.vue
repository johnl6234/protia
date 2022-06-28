<template>
    <div class="flex flex-row mb-10 dashboard">
        <div class="flex flex-col w-2/6 bg-slate-50">
            // TODO Select charts to display
        </div>
        <div class="flex flex-col bg-gray-300">
            <div class="w-full p-2 bg-slate-50 border-l border-b-8 shadow-lg">
                // TODO add date range
            </div>
            <div class="flex flex-row flex-wrap overflow-scroll overflow-x-hidden mb-3">
                <div class="w-64 h-48 bg-white m-2 p-2 rounded-md">
                    <LineChart />
                </div>
                <div class="w-64 h-48 bg-white m-2 p-2 rounded-md">
                    <BarChart />
                </div>
                <div class="w-64 h-48 bg-white m-2 p-2 rounded-md">
                    <PieChart />
                </div>
                <div v-for="chart in charts" class="w-64 h-48 bg-white m-2 p-2 rounded-md">
                    Chart {{ chart.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../components/charts/LineChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import PieChart from '../components/charts/PieChart.vue'
export default {
    components: {
        LineChart,
        BarChart,
        PieChart
    },
    name: 'dashboard-page',
    data() {
        return {
            charts: [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: 6 },
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: 6 },
            ]
        }
    }
}
</script>
<style scoped>
.dashboard {
    max-height: 90vh;
}
</style>
