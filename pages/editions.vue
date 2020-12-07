<template>
  <NavTabsEditions :error="error" :editions="editions" />
</template>

<script>
export default {
  async fetch({ store }) {
    if (!store.getters["editions/editions"].length) {
      await store.dispatch("editions/fetch");
    }
  },
  computed: {
    editions() {
      return this.$store.getters["editions/editions"];
    },
    error() {
       return this.$store.getters["editions/error"];
    },
  },
};
</script>