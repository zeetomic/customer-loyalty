<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="620">
      <template v-slot:activator="{ on }">
        <v-btn 
          fab 
          x-large 
          text 
          v-on="on"
        >
          <v-icon color="#0077c0">fas fa-plus</v-icon>
        </v-btn>
      </template>

      <v-card class="px-12 py-6">
        <p class="headline pt-4">Add Branch</p>
        <v-form>
          <v-select
            outlined
            label="Merchant ID"
            :items="merchant"
            item-text="merchant_name"
            item-value="id"
            v-model="merchant_id"
          ></v-select>
          <v-text-field
            label="Branch Name"
            v-model="branches_name"
            outlined
          ></v-text-field>
          <v-text-field
            label="Address"
            v-model="address"
            outlined
          ></v-text-field>
          <v-text-field
            label="Reward Rates"
            v-model="reward_rates"
            outlined
          ></v-text-field>
          <v-select
            outlined
            label="Asset Type"
            :items="portfolio.map(
              portfolio => portfolio.asset_code !== undefined ? 
              portfolio.asset_code : portfolio.asset_type
            )"
            v-model="asset_code"
          ></v-select>
          <v-text-field
            label="Minimum Spend"
            v-model="minimum_spend"
            outlined
          ></v-text-field>
          <v-text-field
            label="Approval Code"
            v-model="approval_code"
            outlined
          ></v-text-field>
          <v-text-field
            label="Logo URI"
            v-model="logo_uri"
            outlined
          ></v-text-field>
          <v-btn class="primary" large width="100%" :loading="loading" @click="handleSubmit">Submit</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { message } from '~/utils/mixins/message.js';

export default {
  props: {
    portfolio: {
      Type: Array,
      Required: true 
    },
    merchant: {
      Type: Array,
      Required: true
    }
  },
  mixins: [message],
  data () {
    return {
      dialog: false,
      loading: false,

      merchant_id: '',
      branches_name: '',
      address: '',
      reward_rates: '',
      asset_code: '',
      minimum_spend: '',
      approval_code: '',
      logo_uri: ''
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$store.dispatch('user/handleAddBranch', {
        merchant_id: this.merchant_id,
        branches_name: this.branches_name,
        address: this.address,
        reward_rates: this.reward_rates,
        asset_code: this.asset_code,
        minimum_spend: this.minimum_spend,
        approval_code: this.approval_code,
        logo_uri: this.logo_uri
      })
      .then(_=> {
        this.loading = false;
        this.$toast.success(this.msg);
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    }
  }
}
</script>

<style>

</style>