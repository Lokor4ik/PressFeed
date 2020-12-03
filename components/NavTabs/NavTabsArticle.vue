<template>
  <section class="article">
    <div class="article-title">Article: {{ $route.params.id }}</div>

    <div class="article-content">
      <div class="article-box">
        <p class="article-text">Title:</p>
        <p class="article-text">{{ article.title }}</p>
      </div>

      <div class="article-box">
        <p class="article-text">Edition title:</p>
        <p class="article-text">{{ article.edition_title }}</p>
      </div>

      <div class="article-box">
        <p class="article-text">Content:</p>
        <p class="article-text">{{ article.body }}</p>
      </div>

      <div class="article-box">
        <p class="article-text">Published:</p>
        <p class="article-text">
          {{ formatDate(article.published_at) }}
        </p>
      </div>

      <div class="article-box">
        <p class="article-text">Authors:</p>
        <ul>
          <li v-for="(item, index) in article.authors" :key="item.id">
            {{ `${index + 1}. ${item.name}` }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { formatDate } from "~/utils/helpers";

export default {
  props: ["article"],
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss">
.article-title {
  font-size: 2rem;
  line-height: 2.5rem;
}
.article-content {
  margin-top: 20px;
}
.article-box {
  display: flex;
  margin-bottom: 8px;
}
.article-text {
  margin-bottom: 0px !important;
  &:first-child {
    font-weight: 700;
    margin-right: 8px;
  }
}
</style>