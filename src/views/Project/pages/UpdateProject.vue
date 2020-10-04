<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <div>
            <h1>Creat New Project</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Project name"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="my-n8">
            <v-textarea
              outlined
              name="input-7-4"
              label="Project detail"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="12" sm="3" >
          <v-select
            :items="items"
            label="Team"
            outlined
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3" >
      <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Deadline Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date2"
            @input="menu2 = false"
          ></v-date-picker>
      </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="my-n8">
          <v-textarea
            outlined
            name="input-7-4"
            label="Requirement"
          ></v-textarea>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
          <v-file-input
              show-size
              counter
              multiple
              label="File input"
          ></v-file-input>
          </v-col>
          <v-col cols="9" sm="3" class="my-3">
          <div class="text-center">
            <v-btn rounded color="brown lighten-2" dark>Add</v-btn>
          </div>
        </v-col>
        </v-row>
        <v-row>
        <v-col class="px-16"
      cols="12"
        sm="3">
          <div class="text-center">
            <v-btn  block color="primary" dark>Save</v-btn>
          </div>
        </v-col>
        <v-col class="px-16"
      cols="12"
        sm="3">
          <div class="text-center">
            <v-btn  block color="grey darken-1" dark>Cancel</v-btn>
          </div>
        </v-col>
          
        </v-row>
        
    </v-form>
  </v-container>
</template>

<script>
export default {
data: () => ({
      items: ['Team DEVa', 'Team DEVb', 'Team DEVc', 'Team DEVe'],
    }),
data2: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu2: true,
    }),
}
</script>

<style>

</style>