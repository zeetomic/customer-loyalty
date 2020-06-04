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
        <v-form 
          ref="form"
          v-model="valid"
        >
          <v-select
            outlined
            label="Merchant"
            :items="merchant"
            item-text="merchant_name"
            item-value="id"
            :rules="merchant_rule"
            v-model="merchant_id"
          ></v-select>
          <v-text-field
            label="Branch Name"
            :rules="branchesName_rule"
            v-model="branches_name"
            outlined
          ></v-text-field>
          <v-text-field
            label="Address"
            :rules="address_rule"
            v-model="address"
            outlined
          ></v-text-field>
          <v-text-field
            label="Reward Rates"
            :rules="rewardRate_rule"
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
            :rules="assetCode_rule"
            v-model="asset_code"
          ></v-select>
          <v-text-field
            label="Minimum Spend"
            :rules="minimumSpend_rule"
            v-model="minimum_spend"
            outlined
          ></v-text-field>
          <v-text-field
            label="Approval Code"
            :rules="approvalCode_rule"
            v-model="approval_code"
            outlined
          ></v-text-field>
          <v-text-field
            label="Logo URI"
            :rules="logoUri_rule"
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
import { validateAddBranch } from '~/utils/mixins/validateAddBranch.js';
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
  mixins: [message, validateAddBranch],
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
      if(this.$refs.form.validate()) {
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
}
</script>

<style>

</style>