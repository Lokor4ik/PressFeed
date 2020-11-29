<template>
  <div class="authors-inputs__wrapper">
    <div class="authors-inputs">
      <v-menu
        ref="menuFrom"
        v-model="menuFrom"
        :close-on-content-click="false"
        :return-value.sync="dateFrom"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFrom"
            label="Date from"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateFrom" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menuFrom = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menuFrom.save(dateFrom)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        ref="menuTo"
        v-model="menuTo"
        :close-on-content-click="false"
        :return-value.sync="dateTo"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateTo"
            label="Date to"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateTo" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menuTo = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menuTo.save(dateTo)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>

    <v-btn depressed color="#00c58e" dark @click="getAuthorsInfo">
      Get info
    </v-btn>
  </div>
</template> 

<script>
export default {
  data: () => ({
    dateFrom: '2020-01-01',
    dateTo: '2020-02-01',
    menuFrom: false,
    menuTo: false,
  }),
  methods: {
    async getAuthorsInfo() {
      const body = {
        startDate: this.dateFrom,
        endDate: this.dateTo,
      };

      await this.$store.dispatch("authors/fetchMonths", body);
    },
  },
};
</script>

<style lang='scss'>
.authors-inputs__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.authors-inputs {
  display: inline-flex;
  margin-top: 30px;

  & .v-input {
    max-width: 200px;

    &:first-child {
      margin-right: 50px;
    }
    &:last-child {
      margin-left: 50px;
    }
  }
}
</style>