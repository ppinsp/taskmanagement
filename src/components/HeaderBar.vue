<template>
  <v-app-bar
    app
    color="blue"
    :class="{ 'app-bar-mobile': windowWidth < 768 }">
    <v-app-bar-nav-icon @click="windowWidth < 768 ? update(true) : setMini()" />

    <v-breadcrumbs
      class="pl-3 py-2"
      :items="breadcrumbs" />

    <v-spacer />

    <v-menu offset-y>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    breadcrumbs: {
      type: Array,
      required: false,
      default: () => []
    },
    windowWidth: {
      type: Number,
      required: true
    },
    mini: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      items: [
        {
          title: 'Logout',
          to: '/logout'
        }
      ]
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
    },
    setMini () {
      this.$emit('update:mini', !this.mini)
    }
  }
}
</script>

<style>
#select-warehouse,
#select-warehouse .v-input {
  display: flex;
  align-items: center;
}
#select-warehouse .v-input {
  width: 150px;
  margin-bottom: -5px;
}
#select-warehouse .v-text-field__details {
  display: none;
}
button.user-avatar {
  margin-right: 0 !important;
}
button.user-avatar i.v-icon.mdi-account-circle {
  width: 36px;
  height: 36px;
  font-size: 36px;
}
@media screen and (max-width: 767px) {
  #select-warehouse {
    width: 100%;
  }
}
</style>
