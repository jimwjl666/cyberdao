<template>
  <v-app dark>
    <v-app-bar fixed app class="top-bar">
      <div class="top-img-wrap">
        <img src="~/assets/logo.svg" type="image/svg+xml" class="top-logo" />
        <h2 class="top-logo-sub">CyberDAO</h2>
      </div>

      <v-tabs dark align-with-title color="rgb(214 164 133)" class="nav-tabs">
        <v-tabs-slider color="rgb(214 164 133)"></v-tabs-slider>
        <v-tab @click="nav('/')"> Home </v-tab>
        <v-tab @click="nav('swap')"> Exchange </v-tab>
        <v-tab> News </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <div class="right-operate-btn--wrap">
        <v-btn to="/mint"><v-icon left> mdi-pencil </v-icon>Create</v-btn>
        <v-btn v-if="!web3.isConnected" @click="connectWallet"
          ><v-icon left>mdi-transit-connection-variant</v-icon> Connect
          wallet</v-btn
        >
        <div v-if="web3.isConnected" class="account-btn-wrap">
          <span class="account-coins-balance">0 BNB</span>
          <v-btn
            ><span>{{ simpleAddress }}</span>
          </v-btn>
        </div>
        <v-btn v-if="web3.isConnected" fab small @click="toggleDrawer"
          ><v-icon>mdi-cog-outline</v-icon></v-btn
        >
      </div>
      <v-navigation-drawer
        fixed
        right
        width="300"
        height="400"
        :value="isShowDrawer"
        style="top: 64px"
      >
        <v-card class="drawer-wrap">
          <div class="drawer-address">address:{{ simpleAddress }}</div>
          <div class="balance-wrap">
            <div class="balance-title">
              Balance: <span>{{ web3.balance }} ETH</span>
            </div>
          </div>
          <div class="drawer-settings">
            <v-btn block small color="rgb(117, 77, 56)" @click="disConnect"
              ><span text-all-caps="false"> Disconnect</span>
            </v-btn>
          </div>
        </v-card>
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
      this.setWeb3({ ...this.web3, isConnected: false })
      this.isShowDrawer = false
    },
    toggleDrawer() {
      this.isShowDrawer = !this.isShowDrawer
    },
    nav(routePath) {
      this.$router.push(routePath)
    },
  },
}
</script>
<style lang="scss">
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
  width: 100%;
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
.v-btn {
  text-transform: none !important;
}
.top-logo {
  background: #d6a485;
  border-radius: 50%;
}
</style>
<style lang="scss" scoped>
$basic-theme-color: rgb(117, 77, 56);
.v-btn {
  text-transform: none !important;

  font-size: 16px;
}
.top-bar {
  box-shadow: none !important;
  background: none;
  padding: 0;
  display: flex;
}
.top-img-wrap {
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.top-logo-sub {
  padding-left: 10px;
}

.center-conent-container {
  width: 100%;
  padding-top: 0px;
}
.v-btn__content {
  justify-content: left !important;
  color: rgb(117, 77, 56) !important;
}
.v-item-group.v-bottom-navigation .v-btn {
  font-size: 16px !important;
}
.nav-tabs {
  flex: 1;
}
.right-operate-btn--wrap {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}
.account-btn-wrap {
  height: 40px;
  background-color: $basic-theme-color;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
  margin-left: 20px;
}
.account-coins-balance {
  padding: 0 10px;
}
.drawer-wrap {
  padding: 10px;
  height: 100%;
  position: relative;
}
.drawer-settings {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
}
.drawer-address,
.balance-wrap {
  padding-top: 10px;
}
</style>
