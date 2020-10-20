<template>
  <v-navigation-drawer
    id="sidebar"
    app
    :value="value"
    :mini-variant="!isMobile ? mini : false"
    :mini-variant-width="80"
    :absolute="isMobile"
    :temporary="isMobile && value"
    :permanent="!isMobile"
    :width="210"
    dark
    @input="update">
    <template v-slot:prepend>
      <v-list-item class="head-branding">
        <v-list-item-avatar
          v-if="!mini || isMobile"
          id="branding"
          min-width="150"
          max-width="150">
          <router-link :to="{ name: 'Main' }" style="font-size: 14px;">
            Project Management
          </router-link>
        </v-list-item-avatar>
        <v-btn
          v-if="isMobile"
          class="btn-collect-menu"
          icon
          @click.stop="update(false)">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-list-item>
    </template>

    <v-list>
      <v-list-item
        v-for="item in items"
        :to="item.to"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>


    <template v-slot:append>
      <v-divider />
      <div class="d-flex justify-space-between pa-2">
        <v-btn
          :text="!mini || isMobile"
          :icon="mini && !isMobile"
          small
          @click="logout()">
          <v-icon :class="{ 'mr-1': !mini || isMobile }">
            mdi-logout
          </v-icon>
          <span v-if="!mini || isMobile">
            Logout
          </span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
// import listMenu from '@/components/menu/ListMenu.vue'
import menu from '@/utils/js/menu'
export default {
  components: {
  },
  data () {
    return {
      items: menu.menus
    }
  },
  props: {
    darkMode: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    },
    brandName: {
      type: String,
      required: false,
      default: ''
    },
    mini: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    iconTheme () {
      return this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
    },
    itemsPermistion () {
      const newItems = []
      try {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i]
          if (item.children) {
            const children = item.children.filter((r) => !!r.meta && !!r.meta.middleware && !!r.meta.middleware[this.role])
            if (children.length > 0) {
              newItems.push({
                title: item.title,
                icon: item.icon,
                children
              })
            }
          } else if (!item.meta || !item.meta.middleware || (!!item.meta && !!item.meta.middleware && !!item.meta.middleware[this.role])) {
            newItems.push(item)
          }
        }
        return newItems
      } catch (err) {
        return []
      }
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
    },
    logout () {
      this.$router.push({ name: 'Logout' })
    }
  }
}
</script>

<style scoped>
div.head-branding {
  height: 64px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
div.head-branding a {
  color: #ffffff;
  text-decoration: unset;
}
div#branding {
  border-radius: 0;
  margin: 0 auto;
}
button.v-btn.btn-collect-menu {
  position: absolute;
  right: 10px;
}
</style>
