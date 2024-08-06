import { createStore } from 'vuex';

const store = createStore({
  state: {
    invoices: [
      {
        ID: 1,
        DateTime: '2024-07-01 12:00:00',
        ProviderName: 'Provider A',
        Address: '123 Main St',
        Total: 100,
        Paid: 50,
        Remaining: 50,
        DeliveredBy: 'Delivery Person A',
      },
      {
        ID: 2,
        DateTime: '2024-07-02 13:00:00',
        ProviderName: 'Provider B',
        Address: '456 Elm St',
        Total: 200,
        Paid: 200,
        Remaining: 0,
        DeliveredBy: 'Delivery Person B',
      },
    ], // This will store all invoices
    providers: [
       {
        ID: '12345',
        Name: 'John Doe',
        Address: '123 Main St',
        Phone: '123-456-7890',
        Service: 'General Practitioner',
        Note: 'Available on weekends',
      },
    ],
    
    lastInvoiceID: 0,
    selectedProviderName: null,
    
  },
  mutations: {
    SET_SELECTED_PROVIDER_NAME(state, providerName) {
      state.selectedProviderName = providerName;
    },
    
    ADD_INVOICE(state, invoice) {
      state.invoices.push(invoice);
    },
    UPDATE_INVOICE(state, updatedInvoice) {
      const index = state.invoices.findIndex(invoice => invoice.ID === updatedInvoice.ID);
      if (index !== -1) {
        state.invoices.splice(index, 1, updatedInvoice);
      }
    },
    DELETE_INVOICE(state, invoiceID) {
      state.invoices = state.invoices.filter(invoice => invoice.ID !== invoiceID);
    },
    ADD_PROVIDER(state, provider) {
      state.providers.push(provider);
    },
    UPDATE_PROVIDER(state, updatedProvider) {
      const index = state.providers.findIndex(p => p.id === updatedProvider.id);
      if (index !== -1) {
        state.providers[index] = updatedProvider;
      }
    },
    DELETE_PROVIDER(state, providerID) {
      state.providers = state.providers.filter(provider => provider.ID !== providerID);
    },

    
   
  },
  actions: {
    
    addInvoice({ commit }, invoice) {
      commit('ADD_INVOICE', invoice);
    },
    updateInvoice({ commit }, invoice) {
      commit('UPDATE_INVOICE', invoice);
    },
    deleteInvoice({ commit }, invoiceID) {
      commit('DELETE_INVOICE', invoiceID);
    },
    addProvider({ commit }, provider) {
      commit('ADD_PROVIDER', provider);
    },
    updateProvider({ commit }, provider) {
      commit('UPDATE_PROVIDER', provider);
    },
    deleteProvider({ commit }, providerID) {
      commit('DELETE_PROVIDER', providerID);
    },
    selectProviderName({ commit }, providerName) {
      commit('SET_SELECTED_PROVIDER_NAME', providerName);
    },
  },
  getters: {
    selectedProviderName: state => state.selectedProviderName,
    
    
    
    
  },
});

export default store;
