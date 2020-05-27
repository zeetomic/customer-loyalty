<template>
  <div class="pt-6">
    <v-data-table
      hide-default-footer
      hide-default-header
      fixed-header
      dark
      height="620px"
      class="custom-table"
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
    <client-only>
      <download-csv
        :data = "my_report"
        :labels = "labels"
        :fields = "fields"
        name  = "report.csv"
        class="btn-download"
      >
        Download Report
      </download-csv>
    </client-only>
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
      Json: [],
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
  }

}
</script>

<style scoped>
.custom-table,
.v-data-table__wrapper {
  border-radius: 20px!important;
  background-image: linear-gradient(to right top, #1f4287, #1a3879, #142d6c, #0e245f, #071a52)!important
}
thead th{
  background: #142d6c!important;
  border-radius: 20px!important;
}
tbody tr:hover {
  background: rgba(0, 0, 0, 0.3)!important;
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
</style>