<template>
  <section class="profileSection">
    <div class="profileWrapper">
      <v-card variant="tonal">
        <v-card-title> Profile Information </v-card-title>
        <v-card-text>
          <div v-if="user">
            <v-avatar :image="user.picture" size="100"> </v-avatar>
            <div class="text_wrapper">
              <span class="text_group">
                <v-text-field v-model="user.given_name" variant="outlined" label="Firstname" readonly> </v-text-field>
                <v-text-field v-model="user.family_name" variant="outlined" label="Surname" readonly> </v-text-field>
                <v-text-field v-model="user.name" variant="outlined" label="Full Name" readonly> </v-text-field>
              </span>

              <span class="text_group">
                <v-text-field v-model="user.email" variant="outlined" label="Email" readonly> </v-text-field>
                <v-text-field v-model="email_verified_text" variant="outlined" label="Email" readonly> </v-text-field>
              </span>

              <span class="text_group">
                <v-text-field v-model="dateString" variant="outlined" label="Last Updated" readonly> </v-text-field>
              </span>
            </div>
            <v-btn size="large" rounded="xl" prepend-icon="mdi-chevron-left" variant="tonal">
              <router-link :to="{ name: 'home' }" class="backLink">
                {{ $t('getBackButton') }}
              </router-link>
            </v-btn>
          </div>
          <div v-else>Loading profile...</div>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const user = ref(auth0.user);
const email_verified_text = ref(user.value.email_verified ? 'Yes' : 'No');
const dateString = ref(new Date(user.value.updated_at).toLocaleString());
</script>

<style lang="scss" scoped>
.profileSection {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  color: #333;
}

.profileWrapper {
  width: 100%;
  max-width: 750px;
  padding: 1rem;
  border-radius: 15px;
  color: #333;
  text-align: center;
}

.text_group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 30rem;
  padding: 0.5rem;
  gap: 1rem;
  color: black;
  width: 100%;
}

.text_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
}
</style>
