<template>
  <v-app>
    <NavTabsContainer />
    <div class="container">
      <Nuxt />
    </div>
  </v-app>
</template>

<style lang='scss'>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: sans-serif;
}
a {
  text-decoration: none;
  display: inline-block;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.err {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
}
.error-title {
  color: red;
}
</style>