<template>
  <v-app>
    <Navbar/>
    <v-content>
      <v-container>
      <div v-if="$nuxt.isOffline">You are offline</div>
      <nuxt v-if="$nuxt.isOnline"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '~/components/UI/Navbar.vue';

export default {
  middleware: ['auth'],
  components: {
    Navbar
  },
}
</script>

<style>
.v-application {
  background: #e2f3f5!important;
}
</style>