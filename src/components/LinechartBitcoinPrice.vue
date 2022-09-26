<template>
    <div>
        <div id="myChart" :style="{width: '1350px', height: '600px', margin: 'auto'}"></div>
    </div>
</template>

<script>

export default {
    name: 'LinechartBitcoinPrice',
    data() {
        return {
            bitcoinPrice: [],
            timeLine: []
        }
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        this.initEchart();
        this.getRealTimeBitcoinPrices();
    },
    methods: {
        /**
         * 初始化Echart图像，开始就可以显示175个时间节点的比特币价格
        */
        initEchart() {
            this.axios('/dis/bitcoinData').then(res => {
                this.bitcoinPrice = JSON.parse(res.data[0].bitcoinPrice);
                this.timeLine = JSON.parse(res.data[0].time);
                this.drawLineChartBitcoin(this.bitcoinPrice, this.timeLine);
            })
        },
        getRealTimeBitcoinPrices() {
            var pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')
            let recThis = this;
            let myDate;
            let localeString;
            pricesWs.onmessage = function (res) {
                myDate = new Date();
                localeString = myDate.toLocaleString();  // 获取年月日 时分秒时间
                let recBitcoin = JSON.parse(res.data).bitcoin;
                if (typeof recBitcoin !== 'undefined') {
                    recThis.bitcoinPrice.push(recBitcoin);
                    recThis.timeLine.push(localeString);
                    recThis.bitcoinPrice.shift();
                    recThis.timeLine.shift();
                    recThis.drawLineChartBitcoin(recThis.bitcoinPrice, recThis.timeLine);
                }
            }
        },
        /**
         * Echart画折线图
         * @param {*} paramsOption - 传入的比特币价格数组
         * @param {*} timeLine - 传入的时间
         * @param {*} nowThime - 时间前缀
         */
        drawLineChartBitcoin(paramsOption, timeLine) {
            // 基于准备好的dom，初始化echarts实例

            var myChart = this.$echarts.init(document.getElementById('myChart'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    left: 'center',
                    text: '比特币价格实时变化折线图'
                },
                animationDuration: 3000,
                xAxis: {
                    type: 'category',
                    name: '时间',   
                    data: timeLine,
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                    name: '价格/美元',
                    // min: 18800,   // y轴起始价格
                    scale: true
                },
                tooltip: {
                    order: 'valueDesc',
                    trigger: 'axis'
                },
                series: [
                    {
                        type: 'line',
                        data: paramsOption,
                        showSymbol: false       // 不显示原点
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
  },
}
</script>

<!-- 需要系统掌握的知识
    1. webSocket
    2. v-model 怎么实现的？？ 选择性学习
    3. Echart还有那些图呢,怎么配置,怎么用canvas实现的
    4. 亮点一，提前可以记录175个时间节点的比特币价格，并把他们画在图上
 -->