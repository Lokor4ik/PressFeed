<template>
  <NavTabsArticles
    :fetchMethod="fetchMethod"
    :fetchedArticles="fetchedArticles"
    :setQuery="setQuery"
    :error="error"
    :articles="articles"
  />
</template>

<script>
import formatDate from "~/utils/formate-date";

export default {
  async fetch({ store }) {
    if (!store.getters["articles/articles"].length) {
      await store.dispatch("articles/fetchAllArticles");
      store.dispatch("articles/putQuery", 1);
    }
  },
  data() {
    return {
      stepPage: 1,
    };
  },
  computed: {
    articles() {
      const val = this.$store.getters["articles/articles"];

      return val.map((article) => ({
        ...article,
        published_at: formatDate(article.published_at),
        authors: article.authors.map((authors) => authors.name).join(", "),
      }));
    },
    query() {
      return this.$store.getters["articles/query"];
    },
    fetchedArticles() {
      return this.$store.getters["articles/fetchedArticles"];
    },
    error() {
      return this.$store.getters["articles/error"];
    },
  },
  methods: {
    async fetchMethod() {
      await this.$store.dispatch("articles/fetchAllArticles");
    },
    setQuery() {
      this.$store.dispatch("articles/putQuery", this.stepPage);
    },
  },
};
</script>