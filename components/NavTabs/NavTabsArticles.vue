<template>
  <section class="articles">
    <div v-if="!error" class="articles-wrapper">
      <v-data-table
        fixed-header
        :headers="headers"
        :items="articles"
        :page="page"
        :server-items-length="countArticles"
        @pagination="updatePage"
        class="elevation-1 v-table"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td class="v-table__number">
                {{ item.id }}
                <template>
                  <nuxt-link prefetch exact :to="`articles/${item.id}`">
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
        </template>
      </v-data-table>
    </div>

    <div v-if="error" class="err">
      <h3 class="error-title">{{ error }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: ["fetchMethod", "page", "countArticles", "error", "articles"],
  computed: {
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
    async updatePage(tableData) {
      if (this.page !== tableData.page) {
        await this.fetchMethod(tableData.page);
      }
    },
  },
};
</script>

<style lang="scss">
.v-table {
  .v-data-footer__select {
    display: none;
  }

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