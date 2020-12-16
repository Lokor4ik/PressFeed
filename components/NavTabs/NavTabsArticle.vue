<template>
  <section class="article">
    <div class="article-title">Article: {{ $route.params.id }}</div>

    <div class="article-content">
      <div class="article-item">
        <p class="article-item-title">Title:</p>
        <p class="article-item-title">Edition title:</p>
        <p class="article-item-title">Content:</p>
        <p class="article-item-title">Published:</p>
        <p class="article-item-title">Authors:</p>
      </div>

      <div class="article-item">
        <p class="article-item-text">{{ article.title }}</p>
        <p class="article-item-text">{{ article.edition_title }}</p>
        <p class="article-item-text">{{ article.body }}</p>
        <p class="article-item-text">
          {{ formatDate(article.published_at) }}
        </p>
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
  display: flex;
  margin-top: 20px;
}
.article-item {
  margin-bottom: 8px;

  ul {
    padding: 0;
  }
}
.article-item-title {
  font-weight: 700;
  margin-right: 15px;
}
</style>