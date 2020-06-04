<template>
  <div>
    <v-card
      v-for="(item, i) in merchant.slice(0,1)" 
      :key="i"
      class="pa-6 card" 
      flat
    >
      <p class="font-weight-medium display-1 text-center" style="color: #0077c0">{{item.merchant_name}}</p>
      <v-row>
        <v-col>
          <v-card
            class="company" 
            flat
          >
            <span class="headline font-weight-bold bg-title">Balance</span>
            <div class="py-2"></div>
            <v-row>
              <v-col class="d-flex justify-center">
                <client-only>
                  <PieChart 
                    :chart-data="datacollection"
                    :styles="chart"
                  ></PieChart>
                </client-only>
              </v-col>
              <v-col class="d-flex flex-column align-center justify-center">
                <div
                  v-for="(item, i) in portfolio"
                  :key="i"
                  class="px-6 py-2"
                  style="text-align: start"
                >
                  <span class="subtitle ml-2" v-if="item.balance">{{item.asset_code ? item.asset_code : 'Native'}}: </span>
                  <span class="title ml-2" style="color: #0077c0">{{item.balance}}</span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex justify-center" cols="1">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col>
          <v-card
            class="company"
            flat
          >
            <span class="headline font-weight-bold bg-title">Branch</span>
            <div class="py-2"></div>
            <div class="pa-6">
              <span class="subtitle ml-2">Total Branches:</span>
              <span class="title ml-2" style="color: #0077c0">{{ branch.length }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import PieChart from '~/plugins/PieChart.js';
export default {
  props: {
    merchant: {
      type: Array,
      required: true
    },
    portfolio: {
      type: Array,
      required: true
    },
    branch: {
      type: Array,
      required: true
    }
  },
  components:{
    PieChart,
  },
  data() {
    return {
      datacollection: null,
      width: 180,
    }
  },
  mounted() {
    if(!this.portfolio.error) this.fillData();
  },
  computed: {
    chart () {
      return {
        width: `${this.width}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.portfolio.map(asset => asset.asset_code !== undefined ? asset.asset_code : asset.asset_type),
        datasets: [
          {
            backgroundColor: ['#0077c0', '#fc5185', '#004a7c'],
            data: this.portfolio.map(asset => asset.balance)
          }
        ]
      }
    }
  },
}
</script>

<style scoped>
.card,
.branch-card {
  background: #fff!important;
}
.company, 
.branch {
  /* background: rgba(200, 200, 200, 0.1)!important; */
  border-radius: 6px;
  padding: 0 16px;
  margin: 1rem;
  text-align: center;
}
.bg-title {
  background: #07689f!important;
  padding: 6px 120px;
  border-radius: 6px;
  color: #fff;
}
</style>