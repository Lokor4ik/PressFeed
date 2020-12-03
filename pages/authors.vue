<template>
  <section class="authors">
    <NavAuthorsInputs />
    <NavAuthorsReports
      v-show="allMonths.length"
      :allMonths="allMonths"
      :authors="authors"
      :handleChange="handleChange"
    />
  </section>
</template>

<script>
export default {
  computed: {
    allMonths() {
      return this.$store.getters["authors/allMonths"];
    },
    authors() {
      return this.$store.getters["authors/authors"];
    },
    error() {
      return this.$store.getters["authors/error"];
    },
  },
  methods: {
    async handleChange(month) {
      await this.$store.dispatch("authors/fetchAuthors", { month });
    },
  },
};
</script>

<style>
.authors {
  text-align: center;
}
</style>