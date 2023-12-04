<template>
  <v-card max-width="448" class="mx-auto">
    <v-card-title>{{ user.first_name }} {{ user.last_name }}</v-card-title>
    <v-card-subtitle>{{ user.email }}</v-card-subtitle>
    <v-card-text>
      <v-img :src="user.avatar" alt="user-avatar"></v-img>
      <v-text-field v-model="user.first_name" label="First Name"></v-text-field>
      <v-text-field v-model="user.last_name" label="Last Name"></v-text-field>
      <v-text-field v-model="user.email" label="Email"></v-text-field>
      <v-btn @click="saveChanges">Save Changes</v-btn>
      <v-btn @click="handleBack" variant="tonal">Back</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from "../router/index.ts";

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();
    const user = ref({});

    onMounted(async () => {
      const userId = parseInt(props.id);
      await store.dispatch('fetchUsers');
      const foundUser = store.state.users.find(u => u.id === userId);

      if (foundUser) {
        user.value = { ...foundUser };
      } else {
        router.push({ path: '/' });
      }
    });

    const saveChanges = () => {
      store.commit('updateUser', user.value);
      store.dispatch('fetchUsers');
      router.push({ path: '/' });
    };

    const handleBack = () => {
      router.push({ path: '/' });
    };

    return {
      user,
      saveChanges,
      handleBack,
    };
  },
};
</script>
