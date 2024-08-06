<template>
   <MenuBar />
   <router-view></router-view>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <div class="container">
    <h1>Provider Management</h1>

    <!-- Search Component -->
    <SearchComponent @updateQuery="updateSearchQuery" />

    <h2>Provider List</h2>
    <button class="btn btn-primary mb-3" @click="toggleForm">Add Provider</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sortProviders('ID')">
            ID <i :class="getSortIcon('ID')"></i>
          </th>
          <th @click="sortProviders('Name')">
            Name <i :class="getSortIcon('Name')"></i>
          </th>
          <th @click="sortProviders('Address')">
            Address <i :class="getSortIcon('Address')"></i>
          </th>
          <th @click="sortProviders('Phone')">
            Phone <i :class="getSortIcon('Phone')"></i>
          </th>
          <th @click="sortProviders('Service')">
            Service <i :class="getSortIcon('Service')"></i>
          </th>
          <th @click="sortProviders('Note')">
            Note <i :class="getSortIcon('Note')"></i>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="provider in sortedAndFilteredProviders" :key="provider.ID">
          <td>{{ provider.ID }}</td>
          <td>{{ provider.Name }}</td>
          <td>{{ provider.Address }}</td>
          <td>{{ provider.Phone }}</td>
          <td>{{ provider.Service }}</td>
          <td>{{ provider.Note }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editProvider(provider.ID)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteProvider(provider.ID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Conditionally render the Provider Form Component -->
    <ProviderForm v-if="showForm" ref="providerForm" @provider-saved="handleProviderSaved" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProviderForm from './ProviderForm.vue';
import SearchComponent from './SearchComponent.vue';
import MenuBar from './MenuBar.vue';

export default {
  components: {
    ProviderForm,
    SearchComponent,
    MenuBar
  },
  data() {
    return {
      showForm: false,
      searchQuery: '',
      sortColumn: 'ID',
      sortOrder: 'asc',
    };
  },
  computed: {
    ...mapState(['providers']),
    sortedAndFilteredProviders() {
      const filteredProviders = this.providers.filter(provider =>
        provider.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        provider.Address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        provider.Phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        provider.Service.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        provider.Note.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const sortedProviders = filteredProviders.sort((a, b) => {
        let result = 0;
        if (a[this.sortColumn] > b[this.sortColumn]) {
          result = 1;
        } else if (a[this.sortColumn] < b[this.sortColumn]) {
          result = -1;
        }
        return this.sortOrder === 'asc' ? result : -result;
      });

      return sortedProviders;
    },
  },
  methods: {
    ...mapActions(['deleteProvider']),
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.$nextTick(() => {
          if (this.$refs.providerForm) {
            this.$refs.providerForm.resetProviderForm();
          }
        });
      }
    },
    editProvider(id) {
      const provider = this.providers.find(pro => pro.ID === id);
      if (provider) {
        this.showForm = true;
        this.$nextTick(() => {
          if (this.$refs.providerForm) {
            this.$refs.providerForm.setProvider(provider);
          }
        });
      }
    },
    handleProviderSaved() {
      this.$nextTick(() => {
        if (this.$refs.providerForm) {
          this.$refs.providerForm.resetProviderForm();
        }
      });
      this.showForm = false;
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    sortProviders(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
    getSortIcon(key) {
      if (this.sortColumn !== key) return 'fas fa-sort';
      return this.sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 8px;
  text-align: left;
}
th {
  cursor: pointer;
}
.sort-icon {
  margin-left: 5px;
}
</style>
