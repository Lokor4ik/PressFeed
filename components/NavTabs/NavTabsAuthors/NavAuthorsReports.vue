<template >
  <div>
    <v-select
      :items="allMonths"
      label="Select report date"
      v-on:change="handleChange"
    ></v-select>
    <div class="authors-data">
      <v-card
        v-for="(item, index) in authors"
        :key="index + item.id"
        class="authors-data__item"
        elevation="2"
      >
        <div class="author-item__place">{{ definePlace(index + 1) }}</div>
        <div class="author-item__initials">
          <div class="author-name">
            <div class="author-item__title">Name:</div>
            <div class="author-item__text">
              {{ item.name }}
            </div>
          </div>
          <div class="author-articles">
            <div class="author-item__title">Number of articles:</div>
            <div class="author-item__text">
              {{ item.articles_count }}
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["allMonths", "authors", "handleChange"],
  methods: {
    definePlace(place) {
      switch (place) {
        case 1:
          return "I";
        case 2:
          return "II";
        case 3:
          return "III";

        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss">
.authors-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
.authors-data__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 380px;
  padding: 70px 10px;
  font-size: 18px;
}
.author-item__place {
  font-family: monospace;
  font-size: 25px;
}
.author-name {
  &:first-child {
    .author-item__text {
      margin-bottom: 15px;
    }
  }
}
.author-item__title {
  font-weight: bold;
}
</style>