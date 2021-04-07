<template>
  <div class="d-md-flex pt-12 pb-16">
    <v-card
      style="width: 375px; height: 492px"
      class="border pa-2 d-flex align-center justify-center mr-10"
    >
      <v-img :src="nftInfo.fileURL" />
    </v-card>
    <div class="d-flex flex-column justify-space-between flex-grow-1">
      <div>
        <h2 class="text-primary">{{ nftInfo.name }}</h2>
        <div class="mb-2">Artist: {{ nftInfo.author }}</div>
        <p>{{ nftInfo.name }}</p>
      </div>
      <div>
        <h1 class="text-primary pb-12">
          {{ nftInfo.auctionPrice | toCBD }} CBD
        </h1>
        <div v-if="isYourSelf">
          <v-btn @click="setCurrentPrice">更新一口价</v-btn>
          <v-btn @click="cancelSellToken">取消出售</v-btn>
        </div>
        <v-divider></v-divider>
        <v-row class="pt-12">
          <v-col sm="12" md="6">
            <v-card style="height: 90px" class="border pa-4">
              <div class="d-flex justify-space-between mb-2">
                <div class="text-primary">NFT Contract ID :</div>
                <div>-</div>
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-primary">Token ID :</div>
                <div>{{ nftInfo.tokenID }}</div>
              </div>
            </v-card>
          </v-col>
          <v-col sm="12" md="6">
            <v-card style="height: 90px" class="border pa-4">
              <div class="d-flex justify-space-between mb-2">
                <div class="text-primary">Creator's Address :</div>
                <Links :address="nftInfo.creator" />
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-primary">Owner's Address :</div>
                <Links :address="nftInfo.owner" />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BigNumber from 'bigNumber.js'
import VueNotifications from 'vue-notifications'
import {
  exchangeContractAbi,
  exchangeContractAddress,
} from '~/contracts/exchange.js'
export default {
  data() {
    return {
      nftInfo: Object.create(null),
      currentPrice: 10,
      exchangeContractInstance: Object.create(null),
      tokenId: null,
    }
  },
  computed: {
    ...mapState(['web3', 'web3Instance']),
    isYourSelf() {
      if (!this.nftInfo || !this.web3) return false
      return this.nftInfo.creator === this.web3.account
    },
  },
  watch: {
    web3Instance(newInstance, oldInstance) {
      console.log(newInstance, oldInstance)
      if (newInstance && newInstance !== oldInstance) {
        this.exchangeContractInstance = new this.web3Instance.eth.Contract(
          exchangeContractAbi,
          exchangeContractAddress
        )
      }
    },
  },
  notifications: {
    showSettingError: {
      message: 'setting fail',
      type: 'warning', // You also can use 'VueNotifications.types.error' instead of 'error'
    },
    showSetttingSuccess: {
      message: 'setting success',
      type: VueNotifications.types.success,
    },
  },
  created() {
    this.tokenId = this.$route.params.id
    this.queryNftByIds()
  },
  methods: {
    async queryNftByIds() {
      const id = this.$route.params.id
      const params = { token_id: id }
      const { data } = await this.$api.queryNfts(params)
      console.log(data)
      this.nftInfo = data[0] ? data[0] : []
    },
    // 卖家设置一口价
    async setCurrentPrice() {
      this.$loading.open()
      const price = new BigNumber(this.currentPrice * 10 ** 18).toString()
      const setCurrentPriceRes = await this.exchangeContractInstance.methods
        .setCurrentPrice(this.tokenId, price)
        .send({ from: this.web3.account })
        .catch((e) => {
          console.log('设置一口价失败')
          console.log(e.toString())
          // this.$toast.error('set current price fail')
        })
      if (setCurrentPriceRes && setCurrentPriceRes.status) {
        // this.queryNftByIds()
        this.$toast.success('set current price success')
      } else {
        this.$toast.error('set current price fail')
      }
      console.log(setCurrentPriceRes)
      this.$loading.close()
    },
    // 卖家取消出售
    async cancelSellToken() {
      this.$loading.open()
      const canSellTokenRes = await this.exchangeContractInstance.methods
        .cancelSellToken(this.tokenId)
        .send({ from: this.web3.account })
        .catch((e) => {
          console.log('取消失败')
          console.log(e.toString())
        })
      if (canSellTokenRes.status) {
        this.queryNftByIds()
      }
      console.log(canSellTokenRes)
      this.$loading.close()
    },
    // todo sellTokenTo
    // 买家
    // 购买人出价
    // 购买人取消出价
    async cancelBidToken() {
      this.$loading.open()
      const cancelBidTokenRes = await this.exchangeContractInstance.methods
        .cancelBidToken(this.tokenId)
        .send({ from: this.web3.account })
        .catch((e) => {
          console.log('取消出价失败')
          console.log(e.toString())
        })
      if (cancelBidTokenRes.status) {
        this.queryNftByIds()
        // cancelSuccess
      }
      console.log(cancelBidTokenRes)
      this.$loading.close()
    },
    // 购买人一口价
    async buyToken() {
      this.$loading.open()
      const buyTokenRes = await this.exchangeContractInstance.methods
        .buyToken(this.tokenId)
        .send({ from: this.web3.account })
        .catch((e) => {
          console.log('购买失败')
          console.log(e.toString())
        })
      if (buyTokenRes.status) {
        this.queryNftByIds()
        // buySuccess
      }
      console.log(buyTokenRes)
      this.$loading.close()
    },
  },
}
</script>

<style></style>
