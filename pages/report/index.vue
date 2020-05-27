<template>
  <div>
    <v-row>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date_from"
          transition="scale-transition"
          offset-y
          min-width="200px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date_from"
              label="From"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date_from" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date_from)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="date_to"
          transition="scale-transition"
          offset-y
          min-width="200px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date_to"
              label="To"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date_to" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(date_to)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex align-center">
        <v-btn class="primary" width="50%" large @click="handleSearch">
          Search <v-icon small>fas fa-search</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <client-only>
          <download-csv
            :data = "my_report"
            :labels = "labels"
            :fields = "fields"
            name  = "report.csv"
            class="btn-download"
          >
            Export As CSV 
            <v-icon dark small>fas fa-download</v-icon>
          </download-csv>
        </client-only>
      </v-col>
    </v-row>
    <v-data-table
      hide-default-footer
      hide-default-header
      fixed-header
      height="620px"
    >
      <template v-slot:header> 
        <thead>
          <tr>
            <th class="text-left">Branches Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Total Spend</th>
            <th class="text-left">Total Reward</th>
            <th class="text-left">Transaction Date</th>
          </tr>
        </thead>
      </template>
      <template v-slot:body>
        <tbody v-for="(item, i) in my_report" :key="i">
          <tr>
            <td class="d-flex align-center">
              <span>{{ item.location }}</span>
            </td>
            <td>
              <span>{{ item.email }}</span> 
            </td>
            <td>
              <span>{{ item.phone }}</span> 
            </td>
            <td>
              <span>{{ item.amount }}</span>
            </td>
            <td>
              <span>{{ item.rewards }}</span>
            </td>
            <td>
              <span>{{ item.created_at }}</span>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-slot:no-data>
        <span>No data available</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { report } from '~/utils/getReport.js';
export default {
  asyncData: report,
  computed: {
    my_report() {
      return this.report.map(x => ({
        location: x.location,
        email: x.email,
        phone: x.phone,
        amount: x.amount,
        rewards: Math.floor(x.rewards*100)/100,
        created_at: this.Timecon(x.created_at)
      }))
    }
  },
  data() {
    return {
      date_from: new Date().toISOString().substr(0, 10),
      date_to: new Date().toISOString().substr(0, 10),
      filterDate: [],
      labels: {
        location: 'Branches Name',
        email: 'Email',
        phone: 'Phone',
        amount: 'Total Spend',
        rewards: 'Total Reward',
        created_at: 'Transaction Date'
      },
      fields: [
        'location',
        'email',
        'phone',
        'amount',
        'rewards',
        'created_at'
      ]
    }
  },
  methods: {
    Timecon(time) {
      const d = new Date(time);
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
      const h = d.getHours();
      const m = d.getMinutes();
      return (`${h}:${m}, ${mo} ${da} ${ye}`);
    }
  },
  handleSearch() {

  }
}
</script>

<style scoped>

thead th{
  background: #dddddd!important;
}
.btn-download {
  cursor: pointer;
  text-align: center;
  width: auto;
  background: #071a52;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  color: white;
}
.btn-download:hover {
  background: #482ff7;
}
</style>