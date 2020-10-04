<template>
<v-container>
<v-form class="ma-16">
    <v-row >
      <v-col class="px-16"
      cols="16"
        sm="6">
      <div class="text-center">
        <h1>Sing In</h1>
      </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="px-16"
      cols="12"
        sm="6">
        <v-text-field
            v-model="username"
            label="User name"
            hint=""
            persistent-hint
            outlined
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="px-16"
      cols="12"
        sm="6">
        <v-text-field
            v-model="password"
            label="Password"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show4 ? 'text' : 'password'"
            @click:append="show4 = !show4"
            hint=""
            persistent-hint
            outlined
          ></v-text-field>
          <div class="text-right">
            forget Password?
          </div>
      </v-col>
    </v-row>
    <v-row>
        <v-col class="px-16"
      cols="12"
        sm="6">
          <div class="text-center">
            <v-btn @click="handleLoginClicked" block color="primary" dark>Login</v-btn>
          </div>
        </v-col>
      </v-row>
      </v-form>
  </v-container>

</template>

<script>

</script>

<style>
</style>