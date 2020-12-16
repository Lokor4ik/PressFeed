<template>
  <NavTabsArticles
    :fetchMethod="fetchMethod"
    :countArticles="countArticles"
    :page="page"
    :error="error"
    :articles="articles"
    :loading="loading"
  />
</template>

<script>
import { formatDate } from "~/utils/helpers";

export default {
  async fetch({ store }) {
    if (!store.getters["articles/count"]) {
      await store.dispatch("articles/fetchCountArticles");
    }
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
    countArticles() {
      return this.$store.getters["articles/count"];
    },
    page() {
      return this.$store.getters["articles/page"];
    },
    loading() {
      return this.$store.getters["articles/loading"];
    },
    error() {
      return this.$store.getters["articles/error"];
    },
  },
  methods: {
    async fetchMethod(page) {
      await this.$store.dispatch("articles/fetchAllArticles", page);
    },
  },
  async mounted() {
    if (!this.$store.getters["articles/articles"].length) {
      await this.fetchMethod(this.page);
    }
  },
};
</script>