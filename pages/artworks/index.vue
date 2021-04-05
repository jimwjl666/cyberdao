<template>
  <div class="artworks pt-10">
    <v-row class="mb-15">
      <v-col sm="12" md="4">
        <div class="artworks-card ac-error">
          <div class="artworks-card__content">
            <div class="text-gray mb-3 font-13">NFTs Created</div>
            <div class="font-20">10,083,626</div>
          </div>
        </div>
      </v-col>
      <v-col sm="12" md="4">
        <div class="artworks-card ac-info">
          <div class="artworks-card__content">
            <div class="text-gray mb-3 font-13">Txs Today</div>
            <div class="font-20">96,626</div>
          </div>
        </div>
      </v-col>
      <v-col sm="12" md="4">
        <div class="artworks-card ac-success">
          <div class="artworks-card__content">
            <div class="text-gray mb-3 font-13">Today Volume</div>
            <div class="font-20">683,626 USDT</div>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="d-flex mb-7">
      <div class="font-24 mr-16">Explorer</div>
      <v-btn color="primary" class="mr-4">All</v-btn>
      <v-btn class="mr-4">Art</v-btn>
      <v-btn class="mr-4">Collectibles</v-btn>
      <v-btn class="mr-4">Utility</v-btn>
    </div>
    <TokenList ref="tokenList" />
  </div>
</template>

<script>
import TokenList from '@/components/TokenList'
export default {
  components: { TokenList },
}
</script>

<style lang="scss">
.artworks-card {
  position: relative;
  padding: 5px;
  height: 150px;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 18px;
    right: 18px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &.ac-error {
    background: rgba(255, 82, 82, 0.3);
    &::after {
      background: rgba(255, 82, 82, 1);
    }
  }
  &.ac-info {
    background: rgba(82, 214, 255, 0.4);
    &::after {
      background: rgba(82, 214, 255, 1);
    }
  }
  &.ac-success {
    background: rgba(148, 255, 82, 0.4);
    &::after {
      background: rgba(148, 255, 82, 1);
    }
  }
  &__content {
    height: 140px;
    padding: 43px 0 0 30px;
    background: $color-black;
    border-radius: 4px;
  }
}
</style>
