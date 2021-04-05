<template>
  <div style="margin-bottom: 60px">
    <div class="font-40 mb-11">Ecological promotion plan</div>
    <v-row class="mb-11">
      <v-col md="6" sm="12">
        <CbdCard>
          <div class="pa-5 epp-item nfl">
            <h4>NFT creators competition phase 1</h4>
            <p style="width: 280px">
              The cyberdao foundation first invested $100000 to encourage NFT
              creators to participate in cyberdao ecology.
            </p>
            <v-btn color="primary">Explore</v-btn>
          </div>
        </CbdCard>
      </v-col>
      <v-col md="6" sm="12">
        <CbdCard>
          <div class="pa-5 epp-item dao">
            <h4>Uh, what’s with the CyberDAO？</h4>
            <p style="width: 300px">
              Cyberdao is an exploratory financial agreement, which integrates
              the most interesting play methods of defi and encrypted
              collections, such as using CBD (cyberdao token) to vote and earn
              auction income, etc.
            </p>
            <v-btn color="primary">Explore</v-btn>
          </div>
        </CbdCard>
      </v-col>
    </v-row>
    <div class="font-24 mb-6">Hot selling</div>
    <TokenList ref="tokenList" close-auto />
  </div>
</template>

<script>
import CbdCard from '../CbdCard'
import TokenList from '../TokenList'
export default {
  components: { CbdCard, TokenList },
  mounted() {
    const params = { limit: 4 }
    this.$refs.tokenList.queryNfts(params)
  },
}
</script>

<style lang="scss">
.epp-item {
  height: 260px;
  h4 {
    padding-top: 28px;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  p {
    min-height: 90px;
    color: rgba(255, 255, 255, 0.66);
    font-size: 13px;
    line-height: 18px;
  }
  &.nfl {
    background-image: url('~@/assets/images/pic_1.png');
    background-position-x: right;
    background-position-y: 10px;
  }
  &.dao {
    background-image: url('~@/assets/images/pic2.png');
    background-position-x: right;
    background-position-y: 10px;
  }
}
</style>
