<template>
    <div id="pieChart" class="w-full h-full"></div>
</template>

<script>
import { bb, pie } from "billboard.js";
import "billboard.js/dist/billboard.css";
export default {
    name: 'pie-chart',
    data() {
        return {

        }
    }, methods: {
        initChart() {
            const chart = bb.generate({
                bindto: '#pieChart',
                data: {
                    // for ESM import usage, import 'line' module and execute it as
                    type: pie(),
                    //type: "line",
                    columns: [
                        ["data1", 30],
                        ["data2", 120]
                    ],
                },
                zoom: {
                    // for ESM import usage, import 'zoom' module and execute it as
                    // enabled: zoom()
                    enabled: true
                }
            });
        }
    }, mounted() {
        this.initChart()
    }
}
</script>