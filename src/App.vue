<template>
  <v-app>
    <v-main>
      <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
        <v-layout>
          <AppBar/>
          <router-view/>
        </v-layout>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppBar from "./components/AppBar.vue";

export default defineComponent({
  name: 'App',
  components: {AppBar},

  data () {
    return {
      //
    }
  },
})
</script>
