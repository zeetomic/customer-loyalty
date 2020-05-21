<template>
  <div>
    <v-row class="px-12">
      <v-col class="px-12">
        <v-card 
          v-for="(item, i) in merchant.slice(0,1)" 
          :key="i"
          class="pa-6 card" 
          elevation="6"
          dark 
        >
          <p class="font-weight-medium display-1">{{item.merchant_name}}</p>
          <v-row>
            <v-col>
              <v-card
                class="company py-4" 
              >
                <span class="headline">Balance</span>
                <v-row 
                  v-for="(item, i) in portfolio"
                  :key="i"
                  class="px-6 py-2"
                >
                  <!-- <v-icon color="#f4fa9c">fas fa-dollar-sign</v-icon> -->
                  <span class="title ml-2">{{item.asset_code ? item.asset_code : 'Native'}}: </span>
                  <span  class="title ml-2" style="color: #30e3ca">{{item.balance}}</span>
                </v-row>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                class="company py-4" 
              >
                <span class="headline">Branch</span>
                <v-row class="pa-6">
                  <v-icon small>fas fa-store</v-icon>
                  <span class="title ml-2">Branch:</span>
                  <span class="title ml-2" style="color: #30e3ca">{{ branch.length }}</span>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="px-12">
      <v-col class="px-12">
        <v-card 
          class="pa-6 card" 
          elevation="6"
          min-height="50vh"
          dark 
        >
          <v-row>
            <v-col>
              <p class="font-weight-medium display-1">Branch</p>
            </v-col>
            <v-col>
              <v-autocomplete
                label="Search"
                rounded
                solo
                light
                :items="branch"
                item-text="branches_name"
                v-model="branches_name"
                chips
                small-chips
                hide-details
                hide-no-data
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card 
                class="branch" 
                elevation="4"
                v-for="(item, index) in handleSearch" 
                :key="index"
              >
                <v-row>
                  <v-col cols="1">
                    <v-img :src="item.logo_uri" class="logo"></v-img>
                  </v-col>
                  <v-col>
                    <span>Branch Name: {{item.branches_name}}</span>
                    <br>
                    <span>Address: {{item.address}}</span>
                  </v-col>
                  <v-col class="d-flex align-center justify-end">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                          <v-icon>fas fa-ellipsis-h</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="handleEdit(index)">
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleGrant(index)">
                          <v-list-item-title>Grant Access</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleDetail(index)">
                          <v-list-item-title>Detail</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <AddBranch 
              :portfolio="portfolio"
              :merchant="merchant.slice(0,1)"
            />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  <!-- Dialog -->
    <v-dialog 
      v-model="dialogEdit"
      max-width="600px"
    >
      <v-card class="pa-6 px-12">
        <span class="headline">Update Branch</span>
        <div class="py-4"></div>
        <v-form>
          <v-text-field
            outlined
            label="Branch Name"
            v-model="branches_name"
          ></v-text-field>
          <v-text-field
            outlined
            label="Address"
            v-model="address"
          ></v-text-field>
          <v-text-field
            outlined
            label="Reward Rates"
            v-model="reward_rates"
          ></v-text-field>
          <v-text-field
            outlined
            label="Asset Code"
            v-model="asset_code"
          ></v-text-field>
          <v-text-field
            outlined
            label="Minimun Spend"
            v-model="minimum_spend"
          ></v-text-field>
          <v-text-field
            outlined
            label="Approval Code"
            v-model="approval_code"
          ></v-text-field>
          <v-text-field
            outlined
            label="Logo URI"
            v-model="logo_uri"
          ></v-text-field>
          <v-text-field
            outlined
            label="Status is active"
            v-model="is_active"
          ></v-text-field>
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
    <!-- DialogGrant -->
    <v-dialog
      v-model="dialogGrant"
      max-width="600px"
    >
      <v-card class="pa-6 px-12">
        <span class="headline">Grant Branch</span>
        <div class="py-4"></div>
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
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
  <!-- Detail -->
    <v-dialog
      v-model="dialogDetail"
      max-width="500px"
    >
      <v-card class="pa-8">
        <v-row class="d-flex justify-center">
          <v-img :src='logo_uri' max-width="160px"></v-img>
        </v-row>
        <div class="pt-2">
          <span>Branch Name: {{branches_name}}</span>
          <br>
          <span>Address: {{address}}</span>
          <br>
          <span>Reward Rates: {{reward_rates}}</span>
          <br>
          <span>Asset Code: {{asset_code}}</span>
          <br>
          <span>Minimum Spend: {{minimum_spend}}</span>
          <br>
          <span>Logo URI: {{logo_uri}}</span>
          <br>
          <span>Is Active: {{is_active}} </span>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AddBranch from '~/components/Dialog/AddBranch.vue';
import { message } from '~/utils/mixins/message.js';
import { getBoth } from '~/utils/getMerchantBranch.js';

export default {
  mixins: [message],
  components: {
    AddBranch
  },
  data() {
    return {
      dialogEdit: false,
      dialogGrant: false,
      dialogDetail: false,
      loading: false,

      branches_name: '',
      address: '',
      reward_rates: '',
      asset_code: '',
      minimum_spend: '',
      approval_code: '',
      logo_uri: '',
      is_active: true,

      email: ''
    }
  },
  asyncData: getBoth,
  computed: {
    handleSearch() {
      return this.branch.filter(post => {
        return post.branches_name.toLowerCase().includes(this.branches_name.toLowerCase())
      })
    }
  },
  methods: {
    handleEdit(index) {
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
    handleGrant(index) {
      this.dialogGrant = true;
      this.branches_name = this.branch[index].branches_name;
    },
    handleDetail(index) {
      const data = this.branch[index];
      this.dialogDetail = true;
      this.branches_name = data.branches_name;
      this.address = data.address;
      this.reward_rates = data.reward_rates;
      this.asset_code = data.asset_code;
      this.minimum_spend = data.minimum_spend;
      this.approval_code = data.approval_code;
      this.logo_uri = data.logo_uri;
    },
    handleUpdate() {
      this.loading = true;
      this.$store.dispatch('user/handleUpdate', {
        branches_name: this.branches_name,
        address: this.address,
        reward_rates: this.reward_rates,
        asset_code: this.asset_code,
        minimum_spend: this.minimum_spend,
        approval_code: this.approval_code,
        logo_uri: this.logo_uri,
        is_active: true,
      })
      .then(_=> {
        this.loading = false;
        this.$toast.success(this.msg);
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    },
    handleActionGrant() {
      this.loading = true;
      this.$store.dispatch('user/handleActionGrant', {
        email: this.email,
        branches_name: this.branches_name
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
</script>

<style scoped>
  .card {
    background-image: linear-gradient(to right top, #1f4287, #1a3879, #142d6c, #0e245f, #071a52);
  }
  .company, 
  .branch {
    background: rgba(0, 0, 0, 0.3);
    /* border: .1px solid grey; */
    border-radius: 6px;
    padding: 0 16px;
    margin: 1rem;
  }
  .branch:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow:  2px 2px 3px 4px rgba(0, 0, 0, 0.5)!important;
  }
  .btn-branch {
    margin: 1rem 0;
  }
  .logo {
    max-width: 60px;
    border-radius: 8px;
  }
</style>