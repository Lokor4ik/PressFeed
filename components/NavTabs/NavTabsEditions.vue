<template>
  <section class="editions">
    <div v-if="!error" class="tab-pane__editions">
    {{editions}}
    </div>
    <div v-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: ["editions", "error"],
};
</script>