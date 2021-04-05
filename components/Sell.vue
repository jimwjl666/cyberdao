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
            <v-col cols="4">
              <div class="cbd-sell__item disabled">
                <h3>Set Price</h3>
                <p>Sell at a fix or a declining price (Coming Soon)</p>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="cbd-sell__item active">
                <h3>Set Price</h3>
                <p>Sell at a fix or a declining price (Coming Soon)</p>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="cbd-sell__item disabled">
                <h3>Set Price</h3>
                <p>Sell at a fix or a declining price (Coming Soon)</p>
              </div>
            </v-col>
          </v-row>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="MinimumBid"
              :counter="50"
              label="Minimum Bid"
              placeholder="Set your starting bid price."
              :rules="MinimumBidRules"
              outlined
              shaped
            ></v-text-field>
            <v-text-field
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
            ></v-text-field>
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
import { Abi, contractAddress } from '~/contracts/testAbi'

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
      (v) => !!v || 'Minimum Bid is required',
      (v) =>
        (v && v.length <= 50) || 'artWorkName must be less than 50 characters',
    ],
  }),
  computed: {
    ...mapState(['web3', 'web3Instance']),
  },
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
      const contract = new this.web3Instance.eth.Contract(Abi, contractAddress)
      const account = this.web3.account
      console.log(this.tokenId)

      await contract.methods
        .approve('0x129997ac388723c166a3c16bce0e1d2504cd3d2b', this.tokenId)
        .send({ from: account })

      await this.readyToSellToken()
    },
    async readyToSellToken() {
      const contract = new this.web3Instance.eth.Contract(
        Abi,
        '0x129997ac388723c166a3c16bce0e1d2504cd3d2b'
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
        miniToastr.success('上架成功！')
      } else {
        miniToastr.error('上架失败！')
      }
      this.$loading.close()
      this.onClose()
    },
  },
}
</script>

<style lang="scss">
.cbd-sell {
  &__item {
    text-align: center;
    border: 1px solid $color-primary;
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
