<template>
  <v-row class="d-flex justify-center">
    <v-col cols="6">
      <v-card 
        class="pa-4" 
        flat
      >
        <v-row class="d-flex justify-center">
          <v-img :src="profile" max-width="80px" class="logo"></v-img>
        </v-row>
        <div class="pa-4">
          <span class="headline"><span class="title">User Name:</span> {{user_profile.first_name + ' ' + user_profile.mid_name + ' ' + user_profile.last_name}}</span>
          <br>
          <span class="headline"><span class="title">Email:</span> {{user_profile.email}}</span>
          <br>
          <span class="headline"><span class="title">Gender:</span> {{user_profile.gender}}</span>
        </div>
        <div>
          <ChangePass />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { profile } from '~/utils/getProfile.js';
import ChangePass from '~/components/Dialog/ChangePass.vue';

export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    ChangePass
  },
  asyncData: profile,
  data() {
    return {
      profile: require('~/assets/profile.svg')
    }
  }
}
</script>

<style scoped>
.logo {
  border: 3px dashed #fc5185!important;
  border-radius: 50%;
}
</style>