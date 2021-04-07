<template>
  <v-app dark>
    <v-app-bar fixed app class="top-bar">
      <div class="top-img-wrap">
        <img src="~/assets/images/logo_nav.png" class="top-logo" />
      </div>

      <v-tabs dark align-with-title class="nav-tabs">
        <v-tab @click="nav('/')"> Home </v-tab>
        <v-tab @click="nav('/swap')"> Exchange </v-tab>
        <v-tab @click="nav('/artworks')"> NFT&nbsp;Market </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <div class="right-operate-btn--wrap">
        <v-btn v-if="web3.isConnected" to="/mint" color="white">Create</v-btn>
        <v-btn
          v-if="!web3.isConnected"
          color="primary"
          @click="showConnectDialog"
          >Connect wallet</v-btn
        >
        <div v-if="web3.isConnected" class="account-btn-wrap">
          <span class="account-coins-balance"
            >{{ web3.balance | formatEth }} BNB</span
          >
          <nuxt-link to="/space" tag="v-btn" class="account-address">
            <span>{{ simpleAddress }}</span>
          </nuxt-link>
        </div>
        <!-- <v-btn
          v-if="web3.isConnected"
          class="account-setting-btn"
          fab
          small
          @click="toggleDrawer"
          ><v-icon>mdi-cog-outline</v-icon></v-btn
        > -->
      </div>
      <v-navigation-drawer
        fixed
        right
        width="300"
        :value="isShowDrawer"
        style="top: 64px"
      >
        <v-card class="drawer-wrap">
          <div class="drawer-settings">
            <v-btn block color="rgb(117, 77, 56)" @click="disConnect"
              ><span text-all-caps="false"> Disconnect</span>
            </v-btn>
          </div>
        </v-card>
      </v-navigation-drawer>
    </v-app-bar>
    <v-dialog
      v-model="isShowConnectDialog"
      content-class="connect-wallet-dialog"
    >
      <v-card color="rgb(50, 41, 37)" class="dialog-card-content">
        <v-card-title class="dialog-toolbar">
          Connect to wallet
          <v-btn
            fab
            x-small
            class="dialog-close"
            @click="closeDialog('isShowConnectDialog')"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-row class="metamask-wrap">
          <v-col v-if="!isInstallMetamask" cols="12" md="12">
            <v-btn
              block
              outlined
              color="rgb(255, 205, 132)"
              class="connect-wallet-btn"
              @click="goInstallMetamask"
              >Install Metamask

              <img
                class="connect-wallet-btn--metamask"
                src="~/assets/metamask.png"
                alt=""
              />
            </v-btn>
          </v-col>
          <v-col v-else cols="12" md="12">
            <v-btn
              block
              outlined
              color="rgb(255, 205, 132)"
              class="connect-wallet-btn"
              @click="connectWallet"
              >Connect Metamask
              <img
                class="connect-wallet-btn--metamask"
                src="~/assets/metamask.png"
                alt=""
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- accountDialog -->
    <v-dialog v-model="isShowAccountDialog" content-class="account-dialog">
      <v-card color="rgb(50, 41, 37)" class="dialog-card-content">
        <v-card-title class="dialog-toolbar">
          Account
          <v-btn
            fab
            x-small
            class="dialog-close"
            @click="closeDialog('isShowAccountDialog')"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <div class="account-dialog-content">
          <div class="account-dialog-subtitle">
            <span>Connected with MetaMask</span>
          </div>
          <div class="account-dialog-address">
            <span>{{ simpleAddress }}</span>
          </div>
          <div class="account-dialog-address--operate">
            <a
              v-show="!isCopy"
              v-clipboard:copy="web3.account"
              v-clipboard:success="onCopy"
              class="account-dialog-address--copy"
            >
              <v-icon small>mdi-content-copy</v-icon> Copy Address
            </a>
            <a v-show="isCopy" class="account-dialog-address--copy">
              <v-icon small>mdi-check</v-icon> Copied
            </a>
            <a class="account-dialog-address--view"
              ><v-icon small>mdi-call-made</v-icon> View on Bscscan</a
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
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
      isShowConnectDialog: false,
      isInstallMetamask: false,
      isShowAccountDialog: false,
      isCopy: false,
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
    showConnectDialog() {
      if (window.ethereum) {
        this.isInstallMetamask = true
      }
      this.isShowConnectDialog = true
    },
    showAccountdialog() {
      this.isShowAccountDialog = true
    },
    closeDialog(dialogState) {
      console.log(dialogState)
      this[dialogState] = false
    },
    goInstallMetamask() {
      const tempwindow = window.open('_blank')
      tempwindow.location = 'https://metamask.io/'
    },
    async connectWallet() {
      if (window.ethereum) {
        this.isInstallMetamask = true
        await window.ethereum.enable().catch((e) => {
          console.log(e.toString())
        })

        const account = await this.web3Instance.eth.getAccounts()
        const balance = await this.web3Instance.eth.getBalance(account[0])
        this.setWeb3({ balance, account: account[0], isConnected: true })
        this.isShowConnectDialog = false
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
    onCopy() {
      this.isCopy = true
      setTimeout(() => {
        this.isCopy = false
      }, 1000)
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
/* dialog-common */
.dialog-card-content {
  padding-bottom: 10px;
}
.connect-wallet-dialog {
  width: 400px;
}
.account-dialog {
  width: 400px;
}
.account-detail-wrap {
  padding: 10px;
}
</style>
<style lang="scss" scoped>
$basic-theme-color: rgb(117, 77, 56);
$basic-font-color: rgb(255, 205, 132);
$basic-dialog-bg: rgb(50, 41, 37);
.v-btn {
  text-transform: none !important;
  font-size: 16px;
}
.top-bar {
  box-shadow: none !important;
  background: $color-black !important;
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
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 0px;
}
.v-btn__content {
  justify-content: left !important;
  color: rgb(117, 77, 56) !important;
}
.v-item-group.v-bottom-navigation .v-btn {
  font-size: 16px !important;
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
  margin-left: 10px;
}
.account-address {
  background-color: #ffae00 !important;
}
.account-setting-btn {
  margin-left: 10px;
}
.account-coins-balance {
  padding: 0 10px;
}
.drawer-wrap {
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
.metamask-wrap {
  padding: 30px 20px 30px;
}
/* dialog-common */
.dialog-toolbar {
  padding-left: 10px;
  color: $basic-font-color;
  background: $basic-dialog-bg;
  position: relative;
}
.dialog-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
/* dialog-common-end */
.connect-wallet-btn {
  position: relative;
}
.connect-wallet-btn--metamask {
  width: 24px;
  height: 24px;
}
.connect-wallet-btn--metamask {
  position: absolute;
  right: 0px;
  top: -5px;
}

/* account-dialog */
.account-dialog-content {
  margin: 10px;
  border: 1px solid rgb(117, 77, 56);
  border-radius: 4px;
  padding: 20px;
}
.account-dialog-subtitle {
  font-size: 13px;
  color: rgb(108, 114, 132);
}
.account-dialog-address {
  font-size: 18px;
  color: rgb(255, 205, 132);
  padding-top: 10px;
}
.account-dialog-address--operate {
  font-size: 13px;

  padding-top: 10px;
  display: flex;
  text-align: left;
}
.account-dialog-address--copy,
.account-dialog-address--view {
  flex: 1;
  text-decoration: none;
  color: rgb(108, 114, 132);
}
</style>
