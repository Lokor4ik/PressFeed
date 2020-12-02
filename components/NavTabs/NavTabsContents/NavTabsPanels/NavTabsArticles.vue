<template>
  <section class="articles">
    <div v-if="!error" class="articles-wrapper">
      <!--   <div v-for="item in articles" :key="item.id" class="articles-item">
        {{ item }}
      </div> -->
      <client-only>
        <v-data-table
          :headers="headers"
          :items="articles"
          fixed-header
          hide-default-footer
          disable-pagination
          class="elevation-1 v-table"
          height="700"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.name">
                <td class="v-table__number">
                  {{ index + 1 }}
                  <template>
                    <nuxt-link :to="`articles/${item.id}`">
                      <v-icon>
                        mdi-arrow-right
                      </v-icon>
                    </nuxt-link>
                  </template>
                </td>
                <td class="v-table__title">{{ item.title }}</td>
                <td class="v-table__body">{{ item.body }}</td>
                <td class="v-table__edition-title">{{ item.edition_title }}</td>
                <td class="v-table__authors">{{ item.authors }}</td>
                <td>{{ item.published_at }}</td>
              </tr>
            </tbody>
            <InfiniteLoading
              :identifier="infiniteId"
              @infinite="infiniteHandler"
            ></InfiniteLoading>
          </template>
        </v-data-table>
      </client-only>
    </div>
    <div v-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  props: ["fetchMethod", "fetchedArticles", "setQuery", "error", "articles"],
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      articleContent: "",
    };
  },
  computed: {
    infiniteId() {
      return +new Date();
    },
    headers() {
      return [
        { text: "Number" },
        { text: "Title", value: "title" },
        { text: "Content", value: "body", width: 300 },
        { text: "Edition title", value: "edition_title" },
        { text: "Authors", value: "authors", width: 250 },
        { text: "Published", value: "published_at" },
      ];
    },
  },
  methods: {
    async infiniteHandler($state) {
      await this.fetchMethod();

      if (this.fetchedArticles.length) {
        this.setQuery();
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
};
</script>

<style lang="scss">
.articles-wrapper {
  margin-top: 50px;
}
.v-table {
  table {
    thead {
      th {
        &:first-child {
          width: 100px;
        }
        &:last-child {
          width: 120px;
        }
      }
    }
    tbody {
      td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.v-table__number {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-table__title {
  max-width: 160px;
}
.v-table__body {
  max-width: 180px;
}
.v-table__authors,
.v-table__edition-title {
  max-width: 200px;
}
</style>