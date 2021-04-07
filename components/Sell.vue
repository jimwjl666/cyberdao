<template>
  <v-dialog
    class="cbd-sell"
    :value="value"
    persistent
    max-width="800px"
    @click:outside="onClose"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Select your sell method</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="mb-5">
            <v-col v-for="(item, index) in tabs" :key="index" cols="4">
              <div
                class="cbd-sell__item"
                :class="{
                  active: isActive === index,
                  disabled: isActive !== index,
                }"
              >
                <h3>{{ item.title }}</h3>
                <p>{{ item.content }}</p>
              </div>
            </v-col>
          </v-row>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="MinimumBid"
              :counter="50"
              type="number"
              min="0"
              label="fix price"
              placeholder="Set your fix price."
              :rules="MinimumBidRules"
              outlined
              shaped
              suffix="CBD"
            ></v-text-field>
            <!-- <v-text-field
              v-model="ReservePrice"
              label="Reserve Price"
              placeholder="SCreate a hidden limit by setting a reserve price."
              disabled
              outlined
              shaped
            ></v-text-field>
            <v-text-field
              v-model="ExpirationDate"
              label="Expiration Date"
              placeholder="Your auction will auomatically end at this time and the highest bidder will win. No need to cancel it!"
              disabled
              outlined
              shaped
            ></v-text-field> -->
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="blue darken-1" text @click="onClose"> Close </v-btn> -->
        <v-btn color="blue darken-1" text @click="onOk"> List </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BigNumber from 'bigNumber.js'
import { mapState } from 'vuex'
import miniToastr from 'mini-toastr'
import { nftContractAddress, nftContractAbi } from '~/contracts/nftToken'
import {
  exchangeContractAbi,
  exchangeContractAddress,
} from '~/contracts/exchange.js'

export default {
  model: {
    prop: 'value',
    event: 'on-change',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    tokenId: String,
  },
  data: () => ({
    valid: false,
    MinimumBid: '',
    ReservePrice: '',
    ExpirationDate: '',
    MinimumBidRules: [
      (v) => !!v || 'fix price is required',
      (v) =>
        (v && v.length <= 50) || 'artWorkName must be less than 50 characters',
    ],
    isActive: 0,
    tabs: [
      { title: 'Set Price', content: 'Sell at a fix or a declining price' },
      {
        title: 'Highest Bid',
        content: 'Auction to the highest bidder(Coming Soon)',
      },
      {
        title: 'Bundle',
        content: 'Sell at a fix or a declining price (Coming Soon)',
      },
    ],
    exchangeContract: Object.create(null),
    nftTokenContract: Object.create(null),
  }),
  computed: {
    ...mapState(['web3', 'web3Instance']),
  },
  mounted() {},
  methods: {
    onClose() {
      this.$emit('on-change', false)
    },
    async onOk() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.$loading.open()
        this.$emit('on-ok', { price: this.MinimumBid })
        this.onSell()
      }
    },
    async onSell() {
      const contract = new this.web3Instance.eth.Contract(
        nftContractAbi,
        nftContractAddress
      )
      const account = this.web3.account

      // 授权交易所
      await contract.methods
        .approve(exchangeContractAddress, this.tokenId)
        .send({ from: account })
      console.log(this.tokenId, '授权成功')
      // 上架
      await this.readyToSellToken()
    },
    async readyToSellToken() {
      const contract = new this.web3Instance.eth.Contract(
        exchangeContractAbi,
        exchangeContractAddress
      )
      const account = this.web3.account
      const price = new BigNumber(this.MinimumBid * 10 ** 18).toString()
      console.log(this.tokenId, price)
      const contractRes = await contract.methods
        .readyToSellToken(this.tokenId, price)
        .send({ from: account })
      console.log(contractRes)
      this.actiontoken(price, contractRes.transactionHash)
    },
    async actiontoken(price, Txhash) {
      const params = {
        token_id: this.tokenId,
        action_type: 101,
        price,
        Txhash,
      }
      const { code } = await this.$api.actiontoken(params)
      if (code === 0) {
        miniToastr.success('Successful launch')
      } else {
        miniToastr.error('Failed to launch')
      }
      this.$loading.close()
      this.onClose()
      // 更新Created
      this.$parent.queryNfts({ creator: this.web3.account })
    },
  },
}
</script>

<style lang="scss">
.cbd-sell {
  &__item {
    text-align: center;
    border: 1px solid $color-primary;
    height: 104px;
    cursor: pointer;
    h3 {
      padding-top: 20px;
    }
    &.disabled {
      background: #999;
    }
    &.active {
      // background: #fff;
    }
  }
}
</style>
