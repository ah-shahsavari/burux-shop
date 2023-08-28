<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="/">Burux</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button variant="dark" class="cart-icon" to="/cart">
            <BIconCart/>
             <b-badge pill variant="light" class="cart-number-badge">{{ cart.products.length }}</b-badge>
          </b-button>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { BIconCart } from 'bootstrap-vue';
import { useCartStore } from '~/store'

export default defineComponent({
  components:{BIconCart},
  setup() {
    const cart = useCartStore()

    return{cart}
  },
})
</script>

<style scoped>
.cart-icon{
  position: relative;
}
.cart-number-badge{
  position: absolute;
  right: -8px;
  top: -5px;
  display: block;
  z-index: 14;

}
</style>