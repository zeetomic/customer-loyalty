<template>
  <v-dialog 
    max-width="600px"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" @click="handleClick(index)">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
    </template>
    <v-card class="pa-6 px-12">
      <span class="headline">Update Branch</span>
      <div class="py-4"></div>
      <v-form
        ref="form1"
        v-model="valid"
      >
        <v-text-field
          outlined
          label="Branch Name"
          :rules="branchesName_rule"
          v-model="branches_name"
        ></v-text-field>
        <v-text-field
          outlined
          label="Address"
          :rules="address_rule"
          v-model="address"
        ></v-text-field>
        <v-text-field
          outlined
          label="Reward Rates"
          :rules="rewardRate_rule"
          v-model="reward_rates"
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
          outlined
          label="Minimun Spend"
          :rules="minimumSpend_rule"
          v-model="minimum_spend"
        ></v-text-field>
        <v-text-field
          outlined
          label="Approval Code"
          :rules="approvalCode_rule"
          v-model="approval_code"
        ></v-text-field>
        <v-text-field
          outlined
          label="Logo URI"
          :rules="logoUri_rule"
          v-model="logo_uri"
        ></v-text-field>
        <v-select
          outlined
          label="Status is active"
          :items="status"
          v-model="is_active"
        ></v-select>
        <v-btn 
          class="primary"
          :loading="loading"  
          width="100%"
          large 
          @click="handleUpdate"
        >
          Update
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { validateUpdate } from '~/utils/mixins/validateUpdate.js';
import { message } from '~/utils/mixins/message.js';

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    branch: {
      type: Array,
      required: true
    },
    portfolio: {
      type: Array,
      required: true
    }
  },
  mixins: [message, validateUpdate],
  data() {
    return {
      loading: false,
      dialog: false,
      status: [true, false],

      branches_name: '',
      address: '',
      reward_rates: '',
      asset_code: '',
      minimum_spend: '',
      approval_code: '',
      logo_uri: '',
      is_active: true,
    }
  },
  methods: {
    handleClick(index) {
      const data = this.branch[index];
      this.dialogEdit = true;
      this.branches_name = data.branches_name;
      this.address = data.address;
      this.reward_rates = data.reward_rates;
      this.asset_code = data.asset_code;
      this.minimum_spend = data.minimum_spend;
      this.approval_code = data.approval_code;
      this.logo_uri = data.logo_uri;
    },
    handleUpdate() {
      if(this.$refs.form1.validate()) {
        this.loading = true;
        this.$store.dispatch('user/handleUpdate', {
          branches_name: this.branches_name,
          address: this.address,
          reward_rates: this.reward_rates.toString(),
          asset_code: this.asset_code,
          minimum_spend: this.minimum_spend.toString(),
          approval_code: this.approval_code,
          logo_uri: this.logo_uri,
          is_active: this.is_active
        })
        .then(_=> {
          this.loading = false;
          this.$toast.success(this.msg);
          this.dialog = false;
          setTimeout(() => {
            location.reload();
          }, 1500);
        })
      }
    }
  },
}
</script>