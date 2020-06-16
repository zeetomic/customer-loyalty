<template>
  <v-dialog
    max-width="600px"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" @click="handleGrant(index)">
        <v-list-item-title>Grant Access</v-list-item-title>
      </v-list-item>
    </template>
    <v-card class="pa-6 px-12">
      <span class="headline">Grant Branch</span>
      <div class="py-4"></div>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          label="Email"
          v-model="email"
          :rules="emailRule"
          outlined
        ></v-text-field>
        <v-btn 
          class="primary" 
          :loading="loading" 
          @click="handleActionGrant" 
          width="100%" 
          large
        > 
          Grant
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { message } from '~/utils/mixins/message.js';
import { validateGrant } from '~/utils/mixins/validateGrant.js';
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
  mixins: [message, validateGrant],
  data() {
    return {
      email: '',
      branches_name: '',

      loading: false,
      dialog: false
    }
  },
  methods: {
    handleGrant(index) {
      this.branches_name = this.branch[index].branches_name;
    },
    handleActionGrant() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch('user/handleActionGrant', {
          email: this.email,
          branches_name: this.branches_name
        })
        .then(_=> {
          this.loading = false;
          this.dialog = false;
          this.$toast.success(this.msg);
          setTimeout(() => {
            location.reload();
          }, 1500);
        })
      }
    }
  }
}
</script>