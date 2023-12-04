<template>
  <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
  >
    <v-app-bar-title>Users</v-app-bar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppBar',

  data () {
    return {
      //
    }
  },
})
</script>
