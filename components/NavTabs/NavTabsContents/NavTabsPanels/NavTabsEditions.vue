<template>
  <section class="editions">
    <div v-if="!error" class="tab-pane__editions">
      <v-data-table :headers="headers" :items="editions" item-key="id">
      </v-data-table>
    </div>
    <div v-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: ["headers", "editions", "error"],
};
</script>