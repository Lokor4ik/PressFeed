<template>
  <nav class="navbar">
    <ul class="navbar__tabs">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <li class="tab-item" v-bind="attrs" v-on="on">
            <nuxt-link
              class="tab-link"
              @click="setActive('articles')"
              active-class="active"
              prefetch
              exact
              to="/articles"
            >
              Articles
            </nuxt-link>
          </li>
        </template>
        <span>All articles and information about them</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <li class="tab-item" v-bind="attrs" v-on="on">
            <nuxt-link
              class="tab-link"
              @click="setActive('editions')"
              active-class="active"
              prefetch
              exact
              to="/editions"
            >
              Editions
            </nuxt-link>
          </li>
        </template>
        <span
          >Editions in which more often than usual there are articles on which
          more than 1 journalist has worked</span
        >
      </v-tooltip>
      <li class="tab-item">
        <nuxt-link
          class="tab-link"
          @click="setActive('authors')"
          active-class="active"
          prefetch
          exact
          to="/authors"
        >
          Top 3 authors
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["setActive", "isActive"],
};
</script>

<style lang="scss">
.navbar {
  padding-top: 5rem;
  padding-bottom: 4rem;

  .navbar__tabs {
    display: flex;
    margin: 0 auto;
    padding-left: 0;
    border-bottom: 1px solid #dee2e6;
  }
}
.tab-item {
  margin-bottom: -1px;
  flex-grow: 1;
  flex-basis: 0;
}
.tab-link {
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: center;
  color: #495057;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  outline: none;

  &.active {
    color: #00c58e;
    border-color: #dee2e6 #dee2e6 #fff;
  }
}
</style>