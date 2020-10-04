<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <div>
            <h1>Creat Department</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field
            label="Department name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field
            label="Desccription"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col  sm="3">
          <div class="text-center">
            <v-btn rounded color="primary" dark>Save</v-btn>
          </div>
        </v-col>
        <v-col  sm="3">
          <div class="text-center">
            <v-btn rounded color="grey darken-1" dark>Cancle</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>