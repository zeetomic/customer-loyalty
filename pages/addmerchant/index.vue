<template>
  <v-row>
    <v-col class="d-flex flex-column align-center justify-center" v-if="!portfolio.error">
      <v-card class="pa-12" min-width="500px">
        <span class="font-weight-medium text-center display-1">
          SignUp To <img src="~/assets/zee-business.png" class="img">
        </span>
        <div class="py-4"></div>
        <v-form>
          <v-text-field
            label="Merchant Name"
            placeholder="Merchant Name"
            v-model="merchant_name"
            solo
          ></v-text-field>
          <v-text-field
            label="Short Name"
            placeholder="Short Name"
            v-model="short_name"
            solo
          ></v-text-field>
          <v-btn 
            class="primary" 
            width="100%"
            :loading="loading"
            @click="handleAddMerchant"
            large
          >
            Add Merchant
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col class="d-flex flex-column align-center justify-center" v-if="portfolio.error">
      <v-card class="pa-12" min-width="500px">
        <span class="headline red--text">{{ portfolio.error.message }}</span>
        <div class="py-2"></div>
        <v-row class="d-flex justify-center">
          <v-btn large class="error" width="100%" href="https://beta.zeetomic.com/login" target="blank">Get Wallet</v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { portfolio } from '~/utils/getPortfolio.js';
import { message } from '~/utils/mixins/message.js';
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'login',
  middleware: ['auth'],
  mixins: [ message ],
  asyncData: portfolio,
  data() {
    return {
      merchant_name: '',
      short_name: '',

      loading: false
    }
  },
  methods: {
    handleAddMerchant() {
      this.loading = true;
      this.$store.dispatch('user/handleAddMerchant', {
        merchant_name: this.merchant_name,
        short_name: this.short_name
      })
      .then(_=> {
        if(this.type === 'success') {
          this.$toast.success(this.msg);
          this.$router.push('/');
        } else {
          this.$toast.error(this.msg);
        }
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
.img {
  max-width: 260px;
  margin-bottom: -8px;
}
</style>