<template>
  <section class="articles">
    <div v-if="!error" class="tab-pane__article">
      <v-data-table :headers="headers" :items="articles" item-key="id">
      </v-data-table>
    </div>
    <div v-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: ["headers", "articles", "error"],
};
</script>