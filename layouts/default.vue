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
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from '~/components/UI/Navbar.vue';
import Footer from '~/components/UI/Footer.vue';

export default {
  middleware: ['auth'],
  components: {
    Navbar,
    Footer
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