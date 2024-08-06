import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/auth/LoginPage.vue'
import Signup from '../components/auth/SignUPP.vue'
import ProviderTable from '../components/InvPor/ProviderTable.vue'
import InvoiceTable from '../components/InvPor/InvoiceTable.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/Signup', component: Signup },
  { path: '/InvoiceTable', component: InvoiceTable },
  { path: '/ProviderTable', component: ProviderTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
