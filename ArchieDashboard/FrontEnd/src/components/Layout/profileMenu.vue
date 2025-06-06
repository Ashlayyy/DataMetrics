<template>
  <v-menu
    min-width="200px"
    rounded
    :location="'bottom center'"
    activator="#profile_menu_opener"
    :open-delay="0"
    :close-delay="0"
  >
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <h3>{{ user?.name }}</h3>
          <p class="text-caption mt-1">
            {{ user?.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn href="/profile" variant="text" rounded>{{ $t('menu.profile.account') }}</v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn href="/settings" variant="text" rounded>{{ $t('menu.profile.settings') }}</v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn @click="logOut()" variant="text" rounded>{{ $t('menu.profile.logout') }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const { logout } = useAuth0();
const user = ref(auth0.user);

const logOut = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};
</script>
