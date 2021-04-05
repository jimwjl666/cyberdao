<template>
  <div class="about-cbd">
    <div class="font-40 mb-2">About CyberDAO</div>
    <p style="width: 70%; margin-bottom: 34px" class="text-gray">
      CyberDAO is an encrypted financial consensus ecosystem that aggregates
      NFT, DeFi and DAO. With smart contracts,Oracles, distributed storage
      technology and open platform governance policy, CyberDAO creates a
      high-liquidity NFT aggregation marketplace for users and provides a
      one-stop solution for quality off-chain assets to be on blockchain and
      circulated.
    </p>

    <div class="d-flex mr-n5 mb-16">
      <div v-for="item in list" :key="item.name" class="about-cbd__item">
        <div class="about-cbd__item--pic">
          <img :src="require(`@/assets/images/${item.img}`)" alt="item.name" />
        </div>
        <div class="text-center">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '流动性挖矿', img: 'icon_1.svg' },
        { name: '流动性挖矿', img: 'icon_2.svg' },
        { name: '流动性挖矿', img: 'icon_3.svg' },
        { name: '流动性挖矿', img: 'icon_4.svg' },
      ],
    }
  },
}
</script>

<style lang="scss">
.about-cbd__item {
  width: 235px;
  height: 200px;
  // background: $color-dark;
  border-radius: 10px;
  padding-top: 30px;
  margin-right: 20px;
  &--pic {
    margin: 0 auto;
    text-align: center;
    width: 95px;
    height: 95px;
    // background: rgba(255, 174, 0, 0.1);
    border-radius: 50%;
    margin-bottom: 25px;
  }
}
</style>
