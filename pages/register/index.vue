<template>
  <v-row>
    <v-col class="d-flex flex-column align-center justify-center">
      <v-card class="pa-12" min-width="500px">
        <span class="font-weight-medium text-center display-1">
          SignUp To <img src="~/assets/zee-business.png" class="img">
        </span>
        <div class="py-2"></div>
        <v-tabs
          centered
          fixed-tabs
          background-color="transparent"
        >
          <v-tab to="/login">Login</v-tab>
          <v-tab to="/register">Sign Up</v-tab>
        </v-tabs>
        <div class="py-4"></div>
        <v-form>
          <v-text-field
            label="Email"
            placeholder="Email"
            solo
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Password"
            solo
          ></v-text-field>
          <v-btn style="width: 100%" class="primary" large>Sign Up</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'login',

}
</script>

<style scoped>
.img {
  max-width: 260px;
  margin-bottom: -8px;
}
</style>