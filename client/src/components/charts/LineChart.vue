<template>
    <div id="lineChart" class="w-full h-full"></div>
</template>

<script>
import { bb, line } from "billboard.js";
import "billboard.js/dist/billboard.css";
export default {
    name: 'line-chart',
    data() {
        return {

        }
    }, methods: {
        initChart() {
            const chart = bb.generate({
                bindto: '#lineChart',
                data: {
                    // for ESM import usage, import 'line' module and execute it as
                    type: line(),
                    //type: "line",
                    columns: [
                        ["data1", 30, 200, 100, 400, 150, 250]
                    ]
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