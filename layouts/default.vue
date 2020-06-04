<template>
  <div class="mything">
    <v-app>
      <Navbar/>
      <v-content>
        <v-container>
          <div v-if="$nuxt.isOffline">You are offline</div>
          <nuxt v-if="$nuxt.isOnline"/>
          
        </v-container>
      </v-content>
      <v-footer class="font-weight-medium">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }}
        </v-col>
      </v-footer>
    </v-app>
  </div>
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
  background: #e3e3e3!important;
}
.v-content {
  padding: 20px;
  border-radius: 16px;
}
</style>