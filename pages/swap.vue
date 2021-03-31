<template>
  <div class="cyberx-container">
    <div class="swap-logo-wrap">
      <img
        src="~/assets/logo.svg"
        type="image/svg+xml"
        class="top-logo swap-logo"
      />
      <h2>CyberDAO</h2>
    </div>
    <v-card class="exchange-cotainer">
      <v-tabs
        v-model="tab"
        align-with-title
        color="white"
        centered
        active-class="tab-active"
      >
        <v-tabs-slider color="rgb(214 164 133)"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="basil" flat>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="swap-form"
            >
              <v-text-field
                v-model="fromCount"
                type="number"
                min="0"
                :rules="fromCountRules"
                label="From"
                placeholder="0"
                required
                outlined
                shaped
                color="rgb(214 164 133)"
              >
                <template #append>
                  <div class="append-wrap">
                    <div class="from-coins-balance">
                      Balance: <span>0</span>
                    </div>
                    <v-select
                      :items="fromCoins"
                      label="Select a token"
                      dense
                      outlined
                    ></v-select>
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                v-model="toCount"
                type="number"
                min="0"
                :rules="toCountRules"
                label="To"
                placeholder="0"
                required
                outlined
                shaped
                color="rgb(214 164 133)"
              >
                <template #append>
                  <div class="append-wrap">
                    <div class="from-coins-balance">
                      <span>-</span>
                    </div>
                    <v-select
                      :items="fromCoins"
                      label="Select a token"
                      dense
                      outlined
                    ></v-select>
                  </div>
                </template>
              </v-text-field>
              <v-btn block large color="rgb(117, 77, 56)"
                >Enter an amount</v-btn
              >
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      tab: null,
      items: ['swap'],
      fromCount: 0,
      fromCountRules: [],
      fromCoins: ['BNB'],
      toCount: 0,
      toCountRules: [],
    }
  },
}
</script>
<style lang="scss" scoped>
.exchange-cotainer {
  margin-top: 40px;
  padding: 0 20px 20px;
}
.swap-logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.swap-logo {
  width: 60px;
  height: 60px;
}
.tab-active {
  color: rgb(214 164 133);
}
.swap-form {
  margin: 20px 10px 10px;
}
.from-coins-balance {
  padding-bottom: 10px;
}
/* .v-input input::-webkit-outer-spin-button,
.v-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
} */
</style>
