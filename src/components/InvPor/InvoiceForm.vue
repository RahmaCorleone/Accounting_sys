<template>
  <form @submit.prevent="handleSubmitInvoice" class="needs-validation" novalidate>
    <h2>{{ selectedInvoice ? 'Edit' : 'Add' }} Invoice</h2>
    <div class="mb-3">
      <label for="invoiceID" class="form-label">ID (Auto-generated):</label>
      <input id="invoiceID" v-model="invoice.ID" type="text" class="form-control" disabled placeholder="Auto-generated ID" />
    </div>
    <div class="mb-3">
      <label for="invoiceDateTime" class="form-label">DateTime:</label>
      <input id="invoiceDateTime" v-model="invoice.DateTime" type="datetime-local" class="form-control" required />
      <div v-if="dateTimeError" class="text-danger">{{ dateTimeError }}</div>
    </div>
    <div class="mb-3">
      <label for="invoiceProviderName" class="form-label">Provider Name:</label>
      <ProviderSelector @provider-selected="updateProviderName"/>
      <div v-if="providerNameError" class="text-danger">{{ providerNameError }}</div>
    </div>
    <div class="mb-3">
      <label for="invoiceAddress" class="form-label">Address:</label>
      <input id="invoiceAddress" v-model="invoice.Address" type="text" class="form-control" required />
      <div v-if="addressError" class="text-danger">{{ addressError }}</div>
    </div>
    <div class="mb-3">
      <label for="invoiceDeliveredBy" class="form-label">Delivered By:</label>
      <input id="invoiceDeliveredBy" v-model="invoice.DeliveredBy" type="text" class="form-control" required />
      <div v-if="deliveredByError" class="text-danger">{{ deliveredByError }}</div>
    </div>
    <div class="mb-3">
      <label for="invoiceTotal" class="form-label">Total:</label>
      <input id="invoiceTotal" v-model="invoice.Total" type="number" class="form-control" readonly />
    </div>
    <div class="mb-3">
      <label for="invoicePaid" class="form-label">Paid:</label>
      <input id="invoicePaid" v-model.number="invoice.Paid" type="number" class="form-control" @input="updateRemaining" required />
      <div v-if="paidError" class="text-danger">{{ paidError }}</div>
    </div>
    <div class="mb-3">
      <label for="invoiceRemaining" class="form-label">Remaining:</label>
      <input id="invoiceRemaining" v-model="invoice.Remaining" type="number" class="form-control" readonly />
    </div>
    <button type="submit" class="btn btn-primary">{{ selectedInvoice ? 'Update' : 'Save' }} Invoice</button>
    <button type="button" class="btn btn-secondary" @click="closeForm">Cancel</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';
import ProviderSelector from './ProviderSelector.vue';

export default {
  components: {
    ProviderSelector,
  },
  props: {
    selectedInvoice: Object,
  },
  data() {
    return {
      invoice: {
        ID: '',
        DateTime: '',
        ProviderName: '',
        Address: '',
        Total: 0,
        Paid: 0,
        Remaining: 0,
        DeliveredBy: '',
      },
      dateTimeError: '',
      providerNameError: '',
      addressError: '',
      deliveredByError: '',
      paidError: ''
    };
  },
  watch: {
    selectedInvoice: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.invoice = { ...newVal };
        } else {
          this.invoice.ID = ''; // Empty ID for new invoices
        }
      },
    },
  },
  methods: {
    ...mapMutations(['ADD_INVOICE', 'UPDATE_INVOICE']),
    handleSubmitInvoice() {
      if (this.validateForm()) {
        if (this.selectedInvoice) {
          this.UPDATE_INVOICE(this.invoice);
        } else {
          this.ADD_INVOICE(this.invoice);
        }
        this.resetInvoiceForm();
        this.$emit('formSubmitted');
      }
    },
    updateRemaining() {
      this.invoice.Remaining = this.invoice.Total - this.invoice.Paid;
    },
    updateProviderName(providerName) {
      this.invoice.ProviderName = providerName;
    },
    validateForm() {
      this.clearErrors();

      if (!this.invoice.DateTime) {
        this.dateTimeError = 'DateTime is required';
      }

      if (!this.invoice.ProviderName) {
        this.providerNameError = 'Provider Name is required';
      }

      if (!this.invoice.Address) {
        this.addressError = 'Address is required';
      }

      if (!this.invoice.DeliveredBy) {
        this.deliveredByError = 'Delivered By is required';
      }

      if (this.invoice.Paid === null || this.invoice.Paid === undefined) {
        this.paidError = 'Paid amount is required';
      } else if (this.invoice.Paid < 0) {
        this.paidError = 'Paid amount cannot be negative';
      }

      return !this.dateTimeError && !this.providerNameError && !this.addressError && !this.deliveredByError && !this.paidError;
    },
    clearErrors() {
      this.dateTimeError = '';
      this.providerNameError = '';
      this.addressError = '';
      this.deliveredByError = '';
      this.paidError = '';
    },
    resetInvoiceForm() {
      this.invoice = {
        ID: '', // Ensure ID is empty for new invoices
        DateTime: '',
        ProviderName: '',
        Address: '',
        Total: 0,
        Paid: 0,
        Remaining: 0,
        DeliveredBy: '',
      };
      this.clearErrors();
    },
    closeForm() {
      this.resetInvoiceForm();
      this.$emit('closeForm');
    },
  },
};
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
