<template>
  <v-container>
    <v-row>
      <v-col>
        <BalanceAndBranch 
          :merchant="merchant"
          :portfolio="portfolio"
          :branch="branch"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card 
          class="pa-6 branch-card" 
          elevation="10"
          dark
        >
          <v-row>
            <v-col>
              <p class="font-weight-medium display-1">Branch</p>
            </v-col>
            <v-col>
              <v-text-field
                label="Search"
                v-model="search"
                rounded
                solo
                light
              ></v-text-field>
            </v-col>
          </v-row>
          <div>
            <v-card 
              class="branch" 
              elevation="4"
              v-for="(item, index) in handleSearch" 
              :key="item.branches_name"
            >
              <v-row>
                <v-col cols="1">
                  <v-img 
                    :src="item.logo_uri" 
                    class="logo"
                  ></v-img>
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
                      <EditDialog 
                        :branch="handleSearch"
                        :index="index"
                      />
                      <GrantAccess 
                        :branch="handleSearch"
                        :index="index"
                      />
                      <DetailDialog 
                        :branch="handleSearch"
                        :index="index"
                      />
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div>
            <AddBranch 
              :portfolio="portfolio"
              :merchant="merchant.slice(0,1)"
              class="py-2"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BalanceAndBranch from '~/components/UI/BalanceAndBranch.vue';
import EditDialog from '~/components/Dialog/EditDialog.vue';
import DetailDialog from '~/components/Dialog/DetailDialog.vue';
import GrantAccess from '~/components/Dialog/GrantAccess.vue';
import AddBranch from '~/components/Dialog/AddBranch.vue';
import { getBoth } from '~/utils/getMerchantBranch.js';

export default {
  components: {
    AddBranch,
    BalanceAndBranch,
    EditDialog,
    DetailDialog,
    GrantAccess
  },
  data() {
    return {
      search: ''
    }
  },
  asyncData: getBoth,
  computed: {
    handleSearch() {
      return this.branch.filter(post => {
        return post.branches_name.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },
}
</script>

<style scoped>
  .branch-card {
    background-image: linear-gradient(to right top, #1f4287, #1a3879, #142d6c, #0e245f, #071a52)!important;
  }
  .branch {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 0 16px;
    margin: 1rem;
  }
  .branch:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow:  2px 2px 3px 4px rgba(0, 0, 0, 0.5)!important;
  }
  .logo {
    max-width: 60px;
    border-radius: 8px;
  }
  .branch-card {
    max-height: 520px;
    overflow-y: auto;
  }
</style>