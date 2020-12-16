<template>
  <section class="editions">
    <div v-if="!error" class="editions-box">
      <p class="editions-title">Editions:</p>
      <div class="editions-items-wrapper">
        <div
          v-for="(edition, index) in editions"
          :key="edition.id"
          :class="
            index === editions.length - 1
              ? 'editions-item last'
              : 'editions-item'
          "
        >
          <div class="editions-item-number">{{ index + 1 }}.</div>

          <div class="editions-item-info">
            <div class="editions-item-box">
              <p class="editions-item-title">Title:</p>
              <p class="editions-item-title">Articles count:</p>
            </div>
            <div class="editions-item-box">
              <p class="editions-item-text">{{ edition.title }}</p>
              <p class="editions-item-text">{{ edition.articles_count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: ["editions", "loading", "error"],
};
</script>

<style lang="scss">
.editions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.editions-box {
  min-width: 400px;
}
.editions-title {
  font-size: 31px;
  line-height: 40px;
  text-align: center;
}
.editions-items-wrapper {
  max-height: 720px;
  overflow-y: auto;
}
.editions-item {
  display: flex;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid gray;
}
.last {
  margin-bottom: 0;
}
.editions-item-number {
  display: flex;
  align-items: center;
  min-width: 50px;
}
.editions-item-info {
  display: flex;
  p {
    margin-bottom: 0px !important;
  }
}
.editions-item-box {
  &:first-child {
    margin-right: 10px;
  }
}
.editions-item-title {
  font-weight: 700;
  margin-right: 8px;
}
.editions-item-text {
  margin-bottom: 0px !important;
}
</style>