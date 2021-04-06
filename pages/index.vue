<template>
  <div class="cbd-page-home">
    <div class="cbd-page-home__bg"></div>
    <div class="cbd-page-home__content">
      <h2 class="text-center">
        The largest encrypted
        <span class="text-primary">financial ecosystem</span>
      </h2>
      <div class="cbd-page-home__dev"></div>
      <p class="cbd-page-home__subtitle">
        Encrypted financial service platform aggregating NFT, defi and Dao
      </p>
      <div class="d-flex justify-center cbd-page-home__btngroup">
        <v-btn class="mr-10 bg-white" to="/mint" large> Explore </v-btn>
        <v-btn v-if="web3.isConnected" color="primary" to="/mint" large
          >Create</v-btn
        >
      </div>
      <EcologicalPromotionPlan />
      <AboutCyberDAO />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EcologicalPromotionPlan from '@/components/Home/EcologicalPromotionPlan'
import AboutCyberDAO from '@/components/Home/AboutCyberDAO'
export default {
  components: { EcologicalPromotionPlan, AboutCyberDAO },
  computed: {
    ...mapState(['web3']),
  },
}
</script>

<style lang="scss">
.cbd-page-home {
  position: relative;
  &__bg {
    position: absolute;
    background-image: url('~@/assets/images/kv.png');
    background-size: contain;
    background-position-x: center;
    background-position-y: 50px;
    height: 618px;
    width: 100%;
  }
  &__content {
    position: relative;
    z-index: 1;
    padding-top: 570px;
    h2 {
      font-size: 40px;
      font-weight: normal;
    }
  }
  &__dev {
    height: 10px;
    background: $color-white;
    margin: 20px 30px;
    width: calc(100% - 60px);
  }
  &__subtitle {
    font-size: 28px;
    text-align: center;
    margin-bottom: 35px !important;
  }
  &__btngroup {
    margin-bottom: 72px;
  }
}
</style>
