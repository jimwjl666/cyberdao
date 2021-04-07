<template>
  <div class="token-list">
    <div class="ml-n5 token-list__main d-flex flex-wrap">
      <CbdCard
        v-for="item in nfts"
        :key="item.id"
        :height="294"
        content-class="p-relative"
        class="token-list__card ml-5 mb-5 c-pointer"
        @click="toDetail(item.tokenID)"
      >
        <v-img :src="item.fileURL"></v-img>
        <div class="token-list__vote">
          <i class="cbd-favierate"></i>{{ item.votes | toThousand }}
        </div>
        <div class="token-list__info">
          <div class="token-list__info--name mb-1">
            {{ item.name }}
          </div>
          <div class="d-flex justify-space-between">
            <div class="token-list__info--earnings">
              1 CBD投票收益：{{ queryEarnings(item.currentPrice, item.votes) }}$
            </div>
            <div class="token-list__info--price text-primary">
              {{ item.currentPrice | toThousand }}$
            </div>
          </div>
        </div>
        {{ item.showListBtn }}
        <div class="listbtn p-zoom justify-center align-center bg-gray">
          <v-btn
            v-if="
              web3.isConnected &&
              web3.account === item.creator &&
              item.status === 0
            "
            color="primary"
            @click.stop="showSell(item.tokenID)"
            >List</v-btn
          >
        </div>
      </CbdCard>
    </div>
    <Sell v-model="sellStatus" :token-id="tokenId" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CbdCard from '../CbdCard'
import Sell from '../Sell'
// import { Abi, contractAddress } from '~/contracts/testAbi'
export default {
  components: { Sell, CbdCard },
  props: {
    closeAuto: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      nfts: [],
      params: {
        offset: 0,
        limit: 100,
        desc: 'asc',
      },
      sellStatus: false,
      tokenId: '',
      showListBtn: false,
    }
  },
  computed: {
    ...mapState(['web3']),
    isSpace() {
      return this.$route.path === '/space'
    },
  },
  created() {
    console.log(this.$route.path)
    !this.closeAuto && this.queryNfts()
  },
  methods: {
    queryEarnings(price = 0, vote = 0) {
      if (!price || !vote) return 0
      return (Number(price) / Number(vote)).toFixed(3)
    },
    toDetail(id) {
      this.$router.push(`/artworks/artworkInfo/${id}`)
    },
    async queryNfts(params = {}) {
      const tokenParams = Object.assign({}, this.params, params)
      const { data } = await this.$api.queryNfts(tokenParams)
      this.nfts = data
    },
    showSell(tokenID) {
      this.tokenId = tokenID
      this.sellStatus = true
    },
  },
}
</script>

<style lang="scss">
.listbtn {
  display: none;
}

.token-list {
  &__card {
    width: 235px;
    height: 304px;
    &:hover {
      .listbtn {
        display: flex;
      }
    }
  }
  &__vote {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
    background: rgba(5, 5, 7, 0.7);
    border-radius: 0 0 0 2px;
    color: #fff;
    span {
      margin-right: 3px;
    }
  }
  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 3px 3px;
    height: 50px;
    background: rgba(5, 5, 7, 0.7);
    &--earnings {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
