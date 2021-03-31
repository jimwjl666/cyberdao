<template>
  <v-item-group class="index-list-container">
    <h2 class="crberx-title">Data Summary</h2>
    <div class="summary-container">
      <v-row>
        <v-col md="8" sm="6">
          <v-card class="d-flex align-center summary-card">
            <v-row>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>Your BAKE balance</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>Pending harvest</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>BAKE price</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>BAKE Market Cap</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>BAKE in circulation</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>BAKE burned</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>TVL</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="3" sm="12">
                <div class="summary-item">
                  <h4>Volume(24r)</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="4" sm="6">
          <v-card class="d-flex align-center summary-card">
            <v-row>
              <v-col md="6" sm="12">
                <div class="summary-item">
                  <h4>Minted NFT</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="6" sm="12">
                <div class="summary-item">
                  <h4>NFT Transactions</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="6" sm="12">
                <div class="summary-item">
                  <h4>NFT Trading Vol</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
              <v-col md="6" sm="12">
                <div class="summary-item">
                  <h4>locked by NFT</h4>
                  <div class="summary-item-number">$1.1222</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <h2 class="crberx-title">Hottest Artworks</h2>
      <v-row>
        <v-col
          v-for="n in 12"
          :key="n"
          cols="12"
          md="4"
          sm="6"
          lg="3"
          class="card-item"
        >
          <v-item>
            <v-card
              class="d-flex align-center"
              width="193"
              min-width="193"
              height="254"
            >
              <div class="card-item-content">
                <img src="" alt="" class="card-item-content--img" />
                <div class="card-item-content-wrap">
                  <h3 class="card-item-content--title">Wrapped Cryptopunks</h3>
                  <span class="card-item-content--price">350</span>
                </div>
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-item-group>
</template>

<script>
/* import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue' */

export default {
  components: {
    /*  Logo,
    VuetifyLogo, */
  },
}
</script>
<style lang="scss" scoped>
.crberx-title {
  padding: 10px;
  margin-top: 20px;
  color: rgb(214, 164, 133);
}
.summary-container {
  padding: 0 30px;
}
.summary-card {
  padding: 15px;
}
.summary-item h4 {
  color: rgb(214, 164, 133);
  font-size: 14px;
}
.summary-item-number {
  font-size: 16px;
  color: rgb(114, 47, 13);
  font-weight: bold;
}
.card-item {
  display: flex;
  justify-content: center;
}
.card-item-content {
  width: 100%;
  height: 100%;

  text-align: center;
}
.card-item-content--img {
  width: 100%;
  height: 100%;
  background: gray;
  /*  todo 有数据后去掉这里 */
}
.card-item-content-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: left;
  padding: 10px;
}
.card-item-content--title {
  font-size: 16px;
}
.card-item-content--type {
  font-size: 12px;
  opacity: 0.7;
}
</style>
