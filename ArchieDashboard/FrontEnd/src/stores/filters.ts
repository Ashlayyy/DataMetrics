import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
  id: 'filter',
  state: () => ({
    selectedDatabases: [''],
    selectedDates: ['']
  }),
  actions: {
    getSelectedDatabases() {
      return this.selectedDatabases;
    },
    getSelectedDates() {
      return this.selectedDates;
    },
    setSelectedDatabases(databases: string[]) {
      this.$state.selectedDatabases = [];
      this.$state.selectedDatabases = databases;
    },
    setSelectedDates(dates: string[]) {
      this.$state.selectedDates = [];
      this.$state.selectedDates = dates;
    },
    addSelectedDatabase(database: string) {
      this.$state.selectedDatabases.push(database);
    },
    resetDates() {
      this.$state.selectedDates = [];
    },
    resetDatabases() {
      this.$state.selectedDatabases = [];
    },
    resetFilters() {
      this.$state.selectedDatabases = [];
      this.$state.selectedDates = [];
    }
  }
});
