<template>
  <header class="header">
    <div class="filterSection" v-if="route.fullPath !== '/profile' && route.fullPath !== '/settings'">
      <div class="filterWrapper menu-activator" @click="open = !open">
        <v-btn :icon="open === true ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="xsmal"></v-btn>
        <span>{{ selectedDates[0] ? selectedDates[0] : $t('buttonTekst.filterText') }}</span>
        <span
          ><b>{{ !selectedDates[0] ? '' : '-' }}</b></span
        >
        <span>{{ selectedDates[0] ? selectedDates[selectedDates.length - 1] : '' }}</span>
      </div>
    </div>
    <section class="header_wrap">
      <div class="title">
        <div class="header_title">
          {{ $t('headerTitle') }}
        </div>
      </div>
      <div class="header_rightSide">
        <v-avatar size="50" id="profile_menu_opener" class="profile_picture" :image="user?.picture"></v-avatar>
      </div>
    </section>
  </header>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const open = ref(false);
const user = ref(auth0.user);
const route = ref(useRoute());

const props = defineProps({
  updateChevron: {
    type: Number,
    required: true
  },
  selectedDates: {
    type: null as any,
    required: false
  }
});

watch(
  () => props.updateChevron,
  () => {
    toggleButton();
  }
);

const toggleButton = () => {
  open.value = !open.value;
};
</script>

<style lang="scss" scoped>
@use '../../assets/sass/abstracts/variables.scss';

.title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header {
  width: 100%;
  display: flex;
  background: #1f2937;
  height: 5rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;

  &_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: map-get(variables.$padding, 'globalPadding');
  }

  &_title {
    font-weight: 500;
    color: #eee;
    font-size: 1rem;
  }

  &_rightSide {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &_icon {
      border-radius: 100%;
      height: 3rem;
      aspect-ratio: 1/1;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.profile_picture {
  color: white;
  transition: 0.3s all ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

.filter {
  &Section {
    position: absolute;
    color: white;
  }

  &Wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}

.menu-activator {
  &:hover {
    cursor: pointer;
  }
}
</style>
