<template>
  <div class="cbd-card" v-on="$listeners">
    <div class="cbd-card__content" :style="style" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
    },
    contentClass: String,
  },
  computed: {
    style() {
      const style = {}
      if (this.height) {
        style.height = this.height + 'px'
      }
      return style
    },
  },
}
</script>

<style lang="scss">
.cbd-card {
  padding: 5px;
  background: $color-dark;
  border-radius: 10px;
  &__content {
    overflow: hidden;
    background: $color-black;
    border-radius: 4px;
  }
}
</style>
