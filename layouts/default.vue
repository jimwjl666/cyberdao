<template>
  <v-app dark>
    <v-app-bar fixed app class="top-bar">
      <v-bottom-navigation
        :value="value"
        color="primary"
        style="positon: fixed; left: 0; top: 0"
      >
        <div class="search">
          <v-text-field
            label="Search by creator,collectible or collection"
            prepend-inner-icon="mdi-magnify"
            hide-details="true"
          ></v-text-field>
        </div>

        <v-btn>
          <span>Explore</span>
        </v-btn>

        <v-btn>
          <span>My items</span>
        </v-btn>

        <v-btn>
          <span>Following</span>
        </v-btn>

        <v-btn>
          <span>How it works</span>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn rounded to="/create">Create</v-btn>

        <v-btn v-if="web3.isConnected" @click="toggleDrawer"
          ><span>{{ simpleAddress }}</span>
        </v-btn>

        <v-btn v-if="!web3.isConnected" rounded @click="connectWallet"
          >Connect wallet</v-btn
        >
      </v-bottom-navigation>
      <v-navigation-drawer
        fixed
        right
        width="200"
        height="300px"
        :value="isShowDrawer"
        style="top: 64px"
      >
        <div class="drawer-address">{{ simpleAddress }}</div>
        <div class="balance-wrap">
          <div class="balance-title">
            Balance <span>{{ web3.balance }} ETH</span>
          </div>

          <!--    <div class="balance-content"></div> -->
          <div class="drawer-settings">
            <v-btn block small @click="disConnect"
              ><span text-all-caps="false"> Disconnect</span>
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </v-app-bar>
    <v-main>
      <v-container fluid class="center-conent-container">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      fixed: true,
      value: 1,
      isShowDrawer: false,
    }
  },
  computed: {
    ...mapState(['web3', 'web3Instance']),
    ...mapGetters(['simpleAddress']),
  },
  created() {
    this.$vuetify.theme.dark = true
  },
  mounted() {
    this.initWeb3()
  },
  methods: {
    ...mapActions(['initWeb3']),
    ...mapMutations(['setWeb3']),
    async connectWallet() {
      if (window.ethereum) {
        console.log(window.ethereum)
        window.ethereum.enable()
        const account = await this.web3Instance.eth.getAccounts()
        const balance = await this.web3Instance.eth.getBalance(account[0])
        this.setWeb3({ balance, account: account[0], isConnected: true })
      }
    },
    disConnect() {
      console.log(this.web3Instance)
      this.setWeb3({ ...this.web3, isConnected: false })
    },
    toggleDrawer() {
      this.isShowDrawer = !this.isShowDrawer
    },
  },
}
</script>
<style lang="scss">
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0;
}
.v-btn {
  text-transform: none;
}
.description {
  padding-top: 40px;
  opacity: 0.7;
}
.cyberx-container {
  width: 580px;
  margin: 0 auto;
}
.cyberx-title {
  padding-top: 20px;
}
</style>
<style lang="scss" scoped>
.top-bar {
  box-shadow: none !important;
  background: none;
  padding: 0;
}
.search {
  width: 500px;
  padding-left: 50px;
  transform: translateY(10px);
}
.v-item-group.v-bottom-navigation {
  justify-content: left;
  height: 64px !important;
}
.center-conent-container {
  width: 100%;
  padding-top: 40px;
}
.v-btn__content {
  justify-content: left !important;
}
/* .header {
  width: 100%;
}
.header-wrap {
  list-style: none;
  display: flex;
}
.header-wrap-item {
  width: 150px;
}
.header-wrap-item--search {
  width: 300px;
} */
</style>
