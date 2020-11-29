<template>
  <NavTabsLinks :setActive="setActive" :isActive="isActive" />
</template>

<script>
export default {
  methods: {
    setActive(tabItem) {
      this.$store.dispatch("tabs/appointTab", { data: tabItem });
    },
    isActive(tabItem) {
      const activeTab = this.$store.getters["tabs/activeTab"];
      return activeTab === tabItem;
    },
  },
};
</script>

<style>
.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>