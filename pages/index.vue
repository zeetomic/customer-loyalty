<template>
<v-row>
  <v-col>
    <v-row>
      <v-col>
        <v-card class="pa-4" flat>
          <v-row class="d-flex justify-center">
            <v-img :src="profilePic" max-width="80px" class="logo"></v-img>
          </v-row>
          <div class="px-12 pt-4">
            <span>Username: <span class="title">{{profile.first_name + ' ' + profile.mid_name + ' ' + profile.last_name}}</span></span>
            <br>
            <span>Email: <span class="title">{{profile.email}}</span></span>
            <br>
            <span>Gender: <span class="title">{{profile.gender}}</span></span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-4" flat>
          <span class="headline">Branch :</span>
          <br>
          <div class="text-center pt-4">
            <span class="title">Total Branches :<span style="color: #0077c0">{{branch.length}}</span></span>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="pa-4" flat>
          <span class="headline">Balance :</span>
          <br>
          <v-row>
            <v-col class="d-flex justify-center">
              <client-only>
                <PieChart 
                  :chart-data="datacollection"
                  :styles="chart"
                ></PieChart>
              </client-only>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <div
              v-for="(item, i) in portfolio"
              :key="i"
              class="px-6 py-2"
            >
              <span class="title" v-if="item.balance">{{item.asset_code ? item.asset_code : 'Native'}}: </span>
              <span class="" style="color: #0077c0">{{item.balance}}</span>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
  <v-col>
    <v-row>
      <v-col>
        <v-card class="pa-4" flat>
          <span class="headline">Recent Activities:</span>
          <br>
          <v-data-table
            hide-default-footer
            hide-default-header
            fixed-header
            height="635px"
          >
            <template v-slot:header> 
              <thead>
                <tr>
                  <th class="text-left">Branches Name</th>
                  <th class="text-left">Total Spend</th>
                  <th class="text-left">Total Reward</th>
                  <th class="text-left">Transaction Date</th>
                </tr>
              </thead>
            </template>
            <template v-slot:body v-if="report.length > 0">
              <tbody v-for="(item, i) in report" :key="i">
                <tr>
                  <td class="d-flex align-center">
                    <span>{{ item.location }}</span>
                  </td>
                  <td>
                    <span>{{ item.amount }}</span>
                  </td>
                  <td>
                    <span>{{ Math.floor(item.rewards*100)/100 }}</span>
                  </td>
                  <td>
                    <span>{{ Timecon(item.created_at) }}</span>
                  </td>
                </tr>
              </tbody>
            </template>
            <template v-if="!report.length" v-slot:no-data>
              <span>No data available</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import { dashboard } from '~/utils/dashboard.js';
import PieChart from '~/plugins/PieChart.js';

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  middleware: ['auth'],
  components:{
    PieChart,
  },
  asyncData: dashboard,
  data() {
    return {
      profilePic: require('~/assets/profile.svg'),

      datacollection: null,
      width: 180,
    }
  },
  computed: {
    chart () {
      return {
        width: `${this.width}px`,
        position: 'relative'
      }
    }
  },
  mounted() {
    this.fillData();
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
    },
    Timecon(time) {
      const d = new Date(time);
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
      const h = d.getHours();
      const m = d.getMinutes();
      return (`${h}:${m}, ${mo} ${da} ${ye}`);
    },
  },
}
</script>

<style scoped>
.logo {
  border: 3px dashed #fc5185!important;
  border-radius: 50%;
}
</style>