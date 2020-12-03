<template>
  <!-- disable-pagination -->
  <section class="articles">
    <div v-if="!error" class="articles-wrapper">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="articles"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        hide-default-footer
        class="elevation-1 v-table"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td class="v-table__number">
                {{ item.id }}
                <template>
                  <nuxt-link :to="`articles/${item.id}`">
                    <v-icon> mdi-arrow-right </v-icon>
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
          <!-- <client-only>
            <div class="v-table__infinity-wrapper">
              <InfiniteLoading
                :identifier="infiniteId"
                @infinite="infiniteHandler"
              ></InfiniteLoading>
            </div>
          </client-only> -->
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
  data () {
      return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 2,
      }
  },
  computed: {
    infiniteId() {
      return +new Date();
    },
    headers() {
      return [
        { text: "Id", value: "id" },
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
    },
  },
};
</script>

<style lang="scss">
.v-table {
  table {
    position: relative;
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
.v-table__infinity-wrapper {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
</style>