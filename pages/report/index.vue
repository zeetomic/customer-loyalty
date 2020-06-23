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
              clearable
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
              clearable
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
      <v-col>
        <v-select
          hide-details
          clearable
          label="Location"
          :items="branch.map(b => b.branches_name)"
          v-model="location"
          class="pt-3"
        ></v-select>
      </v-col>
      <v-col class="d-flex align-center">
        <v-btn class="primary" width="60%" large :loading="loading" @click="handleSearch">
          <v-icon small>fas fa-search</v-icon>Search
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
            <v-icon dark small>fas fa-download</v-icon>
            Export As CSV 
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
      <template v-slot:body v-if="report.length > 0">
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
      <template v-if="!report.length" v-slot:no-data>
        <span>No data available</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { report } from '~/utils/getReport.js';
import Cookie from 'js-cookie';

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  middleware: ['auth'],
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
      date_from: '',
      date_to: '',
      filterDate: [],
      location: '',
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
      ],

      menu: false,
      menu1: false,
      loading: false
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
    },
    handleSearch() {
      if(this.date_from && this.date_to && !this.location) {
        this.loading = true;
        this.$axios.setToken(Cookie.get('token'), 'Bearer');
        this.$axios.post('/reports-from-to-date', {
          from_date: this.date_from,
          to_date: this.date_to
        })
        .then(res => {
          this.report = res.data;
          this.loading = false;
        })
      } else if(!this.date_from && !this.date_to && this.location){
        this.loading = true;
        this.$axios.setToken(Cookie.get('token'), 'Bearer');
        this.$axios.post('/reports-by-location', {
          location: this.location
        })
        .then(res => {
          this.report = res.data;
          this.loading = false;
        })
      } else if (this.date_from && this.date_to && this.location) {
        this.loading = true;
        this.$axios.setToken(Cookie.get('token'), 'Bearer');
        this.$axios.post('/reports-from-to-date-by-location', {
          from_date: this.date_from,
          to_date: this.date_to,
          location: this.location
        })
        .then(res => {
          this.report = res.data;
          this.loading = false;
        })
      } else return;
    }
  }
}
</script>

<style scoped>
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