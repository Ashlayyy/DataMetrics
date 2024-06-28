import { ref } from 'vue';

export const update = ref(0);
export const updateFilter = () => {
  update.value++;
};
