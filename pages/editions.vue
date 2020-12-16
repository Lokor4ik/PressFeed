<template>
  <NavTabsEditions :editions="editions" :loading="loading" :error="error" />
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
    loading() {
      return this.$store.getters["editions/loading"];
    },
    error() {
      return this.$store.getters["editions/error"];
    },
  },
  mounted() {
    this.$store.dispatch("editions/mounted");
  }
};
</script>