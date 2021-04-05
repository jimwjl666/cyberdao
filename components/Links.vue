<template>
  <!-- eth address -->
  <a
    class="cbd-links"
    :href="`https://bscscan.com/address/${address}`"
    target="_bank"
  >
    {{ address | formatAddress }}
  </a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'eth',
    },
    address: {
      type: [String, Number],
      require: true,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.cbd-links {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
