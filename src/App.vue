<template>
  <div id="app">
    <body>
      <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
      <Linechart-Bitcoin-Price></Linechart-Bitcoin-Price>
    </body>
  </div>
</template>

<script>
import LinechartBitcoinPrice from './components/LinechartBitcoinPrice'

export default {
  name: 'App',
  components: {
    LinechartBitcoinPrice
  },
  created() {
  },
  methods: {
  },
  mounted() {
  }
}
</script>