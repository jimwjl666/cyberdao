<template>
  <v-overlay :value="show" z-index="999">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
}
</script>

<style></style>
