import { createStore } from 'vuex';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface State {
    users: User[];
}

const store = createStore<State>({
    state: {
        users: JSON.parse(localStorage.getItem('users')) || [],
    },
    mutations: {
        setUsers(state, users: User[]) {
            state.users = users;
        },
        updateUser(state, updatedUser: User) {
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
    },
    actions: {
        async fetchUsers({ commit, state }) {
            try {
                if (state.users.length === 0) {
                    const response = await fetch('https://reqres.in/api/users');
                    const data = await response.json();
                    commit('setUsers', data.data);
                    localStorage.setItem('users', JSON.stringify(data.data));
                } else {}
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
    },
});

export default store;
