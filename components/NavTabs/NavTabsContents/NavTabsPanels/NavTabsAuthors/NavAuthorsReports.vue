<template>
  <div>
    <v-select
      :items="items"
      label="Select report date"
      value="121"
      v-on:change="handleChange"
    ></v-select>
    <div class="authors-data">
      <div
        v-for="(item, index) in authors"
        :key="index + item.id"
        class="authors-data__item"
      >
        <div class="author-name">
          {{ item.name }}
        </div>
        <div class="author-articles">
          Number of articles:
          {{ item.articles_count }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
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

<style lang="scss">
.authors-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.authors-data__item {
  flex: 1;
  height: 380px;
}
</style>