<template>
  <div>
    <h2 class="text-primary">Data Summary</h2>
    <v-data-table :headers="headers" :items="nftInfo">
      <template #[`item.event`]=""> List </template>
      <template #[`item.price`]="{ item }">
        {{ item.detail.price | formatEth | toThousand }}
      </template>
      <template #[`item.from`]="{ item }">
        <Links :address="item.from" />
      </template>
      <template #[`item.to`]="{ item }">
        <Links :address="item.to" />
      </template>
      <template #[`item.time`]="{ item }">
        {{ item.time | toSecond | formNow }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nftInfo: [],
      count: 0,
      params: {
        sortName: 'time',
        nftId: '',
        limit: 10,
        offset: 0,
      },
      headers: [
        { text: 'Event', value: 'event' },
        { text: 'Price', value: 'price' },
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'Date', value: 'time', align: 'right' },
      ],
    }
  },
  created() {
    this.params.nftId = this.$route.params.id
    this.queryTradingHistroy()
  },
  methods: {
    async queryTradingHistroy() {
      const { data } = await this.$api.queryTradingHistroy(this.params)
      this.nftInfo = data.list
      this.count = data.count
    },
  },
}
</script>

<style></style>
