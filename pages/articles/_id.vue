<template>
  <NavTabsArticle :article='article' />
</template>

<script>
export default {
  async fetch({ store, params }) {
    const article = store.getters["articles/article"];

    if (article?.id !== +params.id) {
      await store.dispatch("articles/fetchCurrentArticle", params.id);
    }
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    },
  }
};
</script>