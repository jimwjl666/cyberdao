<template>
  <div class="cyberx-container">
    <CyberxBack />
    <h1 class="cyberx-title">Create collectible</h1>
    <p class="description">
      Choose "Single" if you want your collectible to be one of a kind or
      "Multiple" if you want to sell one collectible multiple times
    </p>
    <v-item-group class="create-card-container">
      <div>
        <v-row>
          <v-col cols="12" sm="12" lg="6" class="card-item">
            <v-item>
              <v-card
                class="d-flex align-center create-item"
                width="270"
                min-width="270"
                height="238"
                @click="goErc721"
              >
                <img src="~/assets/sigle.png" alt="" />
                <div>Single</div>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" sm="12" lg="6" class="card-item">
            <v-item>
              <v-card
                class="d-flex align-center create-item"
                width="270"
                min-width="270"
                height="238"
              >
                <img src="~/assets/mutiple.png" alt="" />
                <div>Multiple</div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
    <p class="create-tips">
      我们没有您的私钥，而且没有您的确认，我们就无法动用您的资金
    </p>
  </div>
</template>
<script>
import CyberxBack from '~/components/CyberxBack'
export default {
  components: {
    CyberxBack,
  },
  methods: {
    goErc721() {
      this.$router.push('/create/erc721')
    },
  },
}
</script>
<style lang="scss" scoped>
.create-title {
  text-align: left;
}
.create-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  img {
    width: 80px;
    height: 136px;
  }
  div {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
.create-card-container {
  padding-top: 40px;
}
.create-tips {
  padding-top: 40px;
  opacity: 0.7;
  text-align: center;
}
</style>
