<template>
  <NavTabsEditions :error="error" :headers="headers" :editions="editions" />
</template>

<script>
export default {
  async fetch({ store }) {
    if (!store.getters["editions/editions"].length) {
      await store.dispatch("editions/fetch");
    }
  },
  computed: {
    headers() {
      /* return [
        { text: "Title", value: "title" },
        { text: "Content", value: "body", width: 300, class: "tableCell" },
        { text: "Edition title", value: "edition_title" },
        { text: "Authors", value: "authors", width: 250 },
        { text: "Published", value: "published_at" },
      ]; */
    },
    editions() {
      /*  const val = this.$store.getters["articles/articles"];

      return val.map((article) => ({
        ...article,
        published_at: formatDate(article.published_at),
        authors: article.authors.map((authors) => authors.name).join(", "),
      })); */
    },
    error() {
      /*  return this.$store.getters["articles/error"]; */
    },
  },
};
</script>