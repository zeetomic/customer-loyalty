<template>
  <v-dialog max-width="500px">
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" @click="handleClick(index)">
        <v-list-item-title>Detail</v-list-item-title>
      </v-list-item>
    </template>
    <v-card class="pa-8">
      <v-row class="d-flex justify-center">
        <v-img 
          :src='logo_uri' 
          max-width="160px"
        ></v-img>
      </v-row>
      <div class="pt-2">
        <span>Branch Name: {{branches_name}}</span><br>
        <span>Address: {{address}}</span><br>
        <span>Reward Rates: {{reward_rates}}</span><br>
        <span>Asset Code: {{asset_code}}</span><br>
        <span>Minimum Spend: {{minimum_spend}}</span><br>
        <span>Logo URI: {{logo_uri}}</span><br>
        <span>Is Active: {{is_active}} </span><br>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    branch: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
      this.branches_name = data.branches_name;
      this.address = data.address;
      this.reward_rates = data.reward_rates;
      this.asset_code = data.asset_code;
      this.minimum_spend = data.minimum_spend;
      this.approval_code = data.approval_code;
      this.logo_uri = data.logo_uri;
    }
  }
}
</script>