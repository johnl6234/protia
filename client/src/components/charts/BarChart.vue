<template>
    <div id="barChart" class="w-full h-full"></div>
</template>

<script>
import { bb, bar } from "billboard.js";
import "billboard.js/dist/billboard.css";
export default {
    name: 'bar-chart',
    data() {
        return {

        }
    }, methods: {
        initChart() {
            const chart = bb.generate({
                bindto: '#barChart',
                data: {
                    // for ESM import usage, import 'line' module and execute it as
                    type: bar(),
                    //type: "line",
                    columns: [
                        ["data1", 30, 200, 100, 400, 150, 250]
                    ]
                },
                bar: {
                    width: {
                        ratio: 0.5
                    }
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