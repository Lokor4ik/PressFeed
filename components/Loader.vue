<template>
  <div class="loader-wrapper">
    <v-progress-circular
      :size="70"
      :width="7"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style lang="scss">
.loader-wrapper { 
display: flex;
justify-content: center;
}
</style>