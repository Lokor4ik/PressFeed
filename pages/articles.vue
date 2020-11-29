<template>
  <NavTabsArticles :error="error" :headers="headers" :articles="articles" />
</template>

<script>
import formatDate from "~/utils/formate-date";

export default {
  async fetch({ store }) {
    if (!store.getters["articles/articles"].length) {
      await store.dispatch("articles/fetch");
    }
  },
  computed: {
    headers() {
      return [
        { text: "Title", value: "title" },
        { text: "Content", value: "body", width: 300},
        { text: "Edition title", value: "edition_title" },
        { text: "Authors", value: "authors", width: 250 },
        { text: "Published", value: "published_at" },
      ];
    },
    articles() {
      const val = this.$store.getters["articles/articles"];

      return val.map((article) => ({
        ...article,
        published_at: formatDate(article.published_at),
        authors: article.authors.map((authors) => authors.name).join(", "),
      }));
    },
    error() {
      return this.$store.getters["articles/error"];
    },
  },
};
</script>