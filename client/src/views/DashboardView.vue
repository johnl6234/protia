<template>
    <div class="flex flex-row min-h-screen ">
        <div class="flex flex-col w-1/6 bg-slate-50">
            left Div
        </div>
        <div class="flex flex-col bg-gray-500 w-full">
            <div class="flex flex-row flex-wrap">
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
            ]
        }
    }
}
</script>
<style>
</style>
