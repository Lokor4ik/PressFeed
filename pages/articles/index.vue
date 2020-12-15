<template>
  <NavTabsArticles
    :fetchMethod="fetchMethod"
    :countArticles="countArticles"
    :page="page"
    :error="error"
    :articles="articles"
  />
</template>

<script>
import { formatDate } from "~/utils/helpers";

export default {
  async fetch({ store }) {
    await store.dispatch("articles/fetchCountArticles");
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
      const page = this.$store.getters["articles/page"];

      await this.fetchMethod(page);
    }
  }
};
</script>