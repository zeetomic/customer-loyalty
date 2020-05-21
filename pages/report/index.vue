<template>
  <div class="pt-6">
    <v-data-table
      hide-default-footer
      hide-default-header
    >
      <template v-slot:header> 
        <thead>
          <tr>
            <th class="text-left">Branches Name</th>
            <th class="text-left">Customer Contact</th>
            <th class="text-left">Total Spend</th>
            <th class="text-left">Reward Rates</th>
            <th class="text-left">Total Reward</th>
            <th class="text-left">Transaction Date</th>
          </tr>
        </thead>
      </template>
      <template v-slot:body>
        <tbody>
          <tr>
            <td class="d-flex align-center">
              <span>{{  }}</span>
            </td>
            <td>
              <span>{{  }}</span> 
            </td>
            <td>
              <span>{{  }}</span>
            </td>
            <td>
              <span>{{  }}</span>
            </td>
            <td>
              <span>{{  }}</span>
            </td>
            <td>
              <span>{{  }}</span>
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
  // asyncData: report
}
</script>

<style>

</style>