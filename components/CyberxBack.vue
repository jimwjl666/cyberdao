<template>
  <div>
    <v-btn @click="goBack"><span class="arrow reverse">→</span>Back</v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.reverse {
  transform: rotate(180deg);
  padding-left: 5px;
}
</style>
