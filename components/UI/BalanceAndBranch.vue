<template>
  <div>
    <v-card
      v-for="(item, i) in merchant.slice(0,1)" 
      :key="i"
      class="pa-6 card" 
      elevation="10"
      dark 
    >
      <p class="font-weight-medium display-1">{{item.merchant_name}}</p>
      <v-row>
        <v-col>
          <v-card 
            class="company py-4" 
            height="100%"
          >
            <span class="headline">Balance</span>
            <div
              v-for="(item, i) in portfolio"
              :key="i"
              class="px-6 py-2"
            >
              <v-icon>fas fa-wallet</v-icon><span class="title ml-2" v-if="item.balance">{{item.asset_code ? item.asset_code : 'Native'}}: </span>
              <span  class="title ml-2" style="color: #30e3ca">{{item.balance}}</span>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card 
            class="company py-4" 
            height="100%"
          >
            <span class="headline">Branch</span>
            <div class="pa-6">
              <v-icon>fas fa-store</v-icon>
              <span class="title ml-2">Branch:</span>
              <span class="title ml-2" style="color: #30e3ca">{{ branch.length }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
.card,
.branch-card {
  background: #1F4287!important;
}
.company, 
.branch {
  background: rgba(200, 200, 200, 0.1)!important;
  border-radius: 6px;
  padding: 0 16px;
  margin: 1rem;
  text-align: center;
}
</style>