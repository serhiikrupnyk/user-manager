<template>
  <v-main>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="user in paginatedUsers" :key="user.id" cols="12">
          <v-card
              @click="goToUserDetails(user.id)"
              :title="`${user.first_name + ' ' + user.last_name}`"
              :subtitle="`${user.email}`"
              :prepend-avatar="`${user.avatar}`"
          ></v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-pagination
              v-model="currentPage"
              :length="numberOfPages"
              @input="changePage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import router from "../router/index.ts";

export default {
  setup() {
    const store = useStore();
    const users = ref([]);
    const itemsPerPage = 4;
    const currentPage = ref(1);

    onMounted(async () => {
      await store.dispatch('fetchUsers');
      users.value = store.state.users;
    });

    const goToUserDetails = (id) => {
      router.push({ path: `/user/${id}` });
    };

    const changePage = (page) => {
      currentPage.value = page;
    };

    const paginatedUsers = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return users.value.slice(startIndex, endIndex);
    });

    const numberOfPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

    return {
      users,
      goToUserDetails,
      currentPage,
      changePage,
      paginatedUsers,
      numberOfPages,
    };
  },
};
</script>
