<template>
  <section :class="`article-${$route.params.id}`">
    {{article}}
  </section>
</template>

<script>
export default {
  async fetch({ store, params }) {
    const article = store.getters["articles/article"];

    if (article.id !== +params.id) {
      await store.dispatch("articles/fetchCurrentArticle", params.id);
    }
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    }
  },
  methods: {},
};
</script>

<style lang="scss">
</style>