<template>
  <div>
    <div class="text-center text-primary mb-12">
      <h3 class="pt-16">{{ web3.account | formatAccount }}</h3>
    </div>
    <div class="mb-9 text-primary">
      <v-tabs
        v-model="tab"
        background-color="rgba(0,0,0,0)"
        @change="changTabs"
      >
        <v-tab v-for="item in items" :key="item"> {{ item }} </v-tab>
      </v-tabs>
    </div>

    <TokenList ref="tokenList" close-auto />
  </div>
</template>

<script>
import TokenList from '@/components/TokenList'
import { mapState } from 'vuex'

export default {
  components: { TokenList },
  filters: {
    formatAccount(address) {
      if (address) {
        return address
          .toString()
          .replace(/(\S{13})\S{12}(\S{17})/, '$1************$2')
      }
    },
  },
  data() {
    return {
      tab: 'Created',
      items: ['Created', 'Collected'],
    }
  },
  computed: {
    ...mapState(['web3']),
    computedItems() {
      return ['creator', 'creator']
    },
  },
  methods: {
    changTabs(index) {
      console.log(index)
      this.$refs.tokenList.queryNfts({
        [this.computedItems[index]]: this.web3.account,
      })
    },
  },
}
</script>

<style></style>
