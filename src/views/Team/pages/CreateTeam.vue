<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <div>
            <h1>Creat New Team</h1>
          </div>
        </v-col>
        </v-row>
        <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Team name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
        </v-row>
        <v-row>
        <v-col cols="12" sm="6" class="my-n8">
          <v-text-field
            label="Desccription"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
        </v-row>
        <v-row>
          <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="value"
            :items="items"
            chips
            label="Employees"
            multiple
            solo
          ></v-select>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="9" sm="6">
          <div class="text-center">
            <v-btn rounded color="primary" dark>Save</v-btn>
          </div>
        </v-col>
        </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
data: () => ({
      items: ['pin', 'yok', 'name', 'name3'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
}
</script>

<style>

</style>