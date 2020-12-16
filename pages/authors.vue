<template>
  <section class="authors">
    <div v-if="!error">
      <NavAuthorsInputs />
      <NavAuthorsReports
        v-show="allMonths.length"
        :allMonths="allMonths"
        :authors="authors"
        :loading="loading"
        :handleChange="handleChange"
      />
    </div>

    <div v-else-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
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
    loading() {
      console.log(this.$store.getters["authors/loading"])
      return this.$store.getters["authors/loading"];
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