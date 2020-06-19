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
          flat
        >
          <v-row>
            <v-col>
              <p class="font-weight-medium display-1" style="color: #0077c0">Branch</p>
            </v-col>
            <v-col>
              <v-text-field
                label="Search"
                v-model="search"
                rounded
                solo
                background-color="#0077c0"
                color="#fff"
                dark
              ></v-text-field>
            </v-col>
          </v-row>
          <div>
            <div
              class="branch" 
              v-for="(item, index) in handleSearch" 
              :key="item.branches_name"
              light
            >
              <v-row>
                <v-col cols="1">
                  <v-img 
                    :src="item.logo_uri" 
                    class="logo"
                  ></v-img>
                </v-col>
                <v-col>
                  <span class="body-1">Branch Name: {{item.branches_name}}</span>
                  <br>
                  <span class="body-1">Address: {{item.address}}</span>
                </v-col>
                <v-col class="d-flex align-center justify-end">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon color="#07689f">fas fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <EditDialog 
                        :portfolio="portfolio"
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
              <v-divider inset></v-divider>
            </div>
          </div>
          <div>
            <AddBranch 
              :portfolio="portfolio"
              :merchant="merchant"
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
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    AddBranch,
    BalanceAndBranch,
    EditDialog,
    DetailDialog,
    GrantAccess
  },
  data() {
    return {
      search: '',
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
    background: #fff!important;
  }
  .branch {
    background: transparent!important;
    border-radius: 6px;
    padding: 0 16px;
    margin: 1rem;
  }
  .branch:hover {
    background: rgba(199, 238, 255, 0.6)!important;
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