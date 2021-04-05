<template>
  <div class="d-md-flex pt-12 pb-16">
    <v-card
      style="width: 450px; height: 700px"
      class="border pa-2 d-flex align-center justify-center mr-10"
    >
      <v-img :src="nftInfo.fileURL" />
    </v-card>
    <div class="d-flex flex-column justify-space-between flex-grow-1">
      <div>
        <h2 class="text-primary">{{ nftInfo.name }}</h2>
        <div class="mb-2">Artist: {{ nftInfo.author }}</div>
        <p>{{ nftInfo.name }}</p>
      </div>
      <div>
        <h1 class="text-primary pb-12">
          {{ nftInfo.price | toThousand }} BAKE
        </h1>
        <v-divider></v-divider>
        <v-row class="pt-12">
          <v-col sm="12" md="6">
            <v-card style="height: 90px" class="border pa-4">
              <div class="d-flex justify-space-between mb-2">
                <div class="text-primary">NFT Contract ID :</div>
                <div>-</div>
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-primary">Token ID :</div>
                <div>{{ nftInfo.nftId }}</div>
              </div>
            </v-card>
          </v-col>
          <v-col sm="12" md="6">
            <v-card style="height: 90px" class="border pa-4">
              <div class="d-flex justify-space-between mb-2">
                <div class="text-primary">Creator's Address :</div>
                <Links :address="nftInfo.creator" />
              </div>
              <div class="d-flex justify-space-between">
                <div class="text-primary">Owner's Address :</div>
                <Links :address="nftInfo.owner" />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nftInfo: {},
    }
  },
  created() {
    this.queryNftByIds()
  },
  methods: {
    async queryNftByIds() {
      const id = this.$route.params.id
      const params = { token_id: id }
      const { data } = await this.$api.queryNfts(params)
      console.log(data)
      this.nftInfo = data[0]
    },
  },
}
</script>

<style></style>
