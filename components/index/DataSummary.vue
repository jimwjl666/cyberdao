<template>
  <div class="summary-container">
    <v-row>
      <v-col md="8" sm="12">
        <v-card class="d-flex align-center summary-card">
          <v-row>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>Your BAKE balance</h4>
                <div class="summary-item-number">{{ 0 | toThousand(3) }}</div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>Pending harvest</h4>
                <div class="summary-item-number">{{ 0 | toThousand(3) }}</div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>BAKE price</h4>
                <div class="summary-item-number">
                  ${{ statistics.priceUSD | toThousand(3) }}
                </div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>BAKE Market Cap</h4>
                <div class="summary-item-number">
                  ${{ statistics.circulationMarketCap | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>BAKE in circulation</h4>
                <div class="summary-item-number">
                  {{ statistics.circulation | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>BAKE burned</h4>
                <div class="summary-item-number">
                  {{ statistics.burned | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>TVL</h4>
                <div class="summary-item-number">
                  ${{ statistics.totalLiquidityUSD | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="3" sm="6">
              <div class="summary-item">
                <h4>Volume(24r)</h4>
                <div class="summary-item-number">
                  ${{ statistics.volume24hUSD | toThousand }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="4" sm="12">
        <v-card class="d-flex align-center summary-card">
          <v-row>
            <v-col md="6" sm="6">
              <div class="summary-item">
                <h4>Minted NFT</h4>
                <div class="summary-item-number">
                  {{ statistics.totalNft | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="6" sm="6">
              <div class="summary-item">
                <h4>NFT Transactions</h4>
                <div class="summary-item-number">
                  {{ statistics.totalNftTransaction | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="6" sm="6">
              <div class="summary-item">
                <h4>NFT Trading Vol</h4>
                <div class="summary-item-number">
                  {{ statistics.totalNftVolumeBAKE | toThousand }}
                </div>
              </div>
            </v-col>
            <v-col md="6" sm="6">
              <div class="summary-item">
                <h4>BAKE locked by NFT</h4>
                <div class="summary-item-number">
                  {{ statistics.totalNftLockedBAKE | toThousand }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style></style>
