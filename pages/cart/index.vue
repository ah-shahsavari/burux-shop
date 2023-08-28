<template>
  <b-row>
    <b-col sm="12" class="mt-3">
      <b-card>
        <b-card-body>
          <strong>cart:</strong>
          <b-row class="mt-3">
            <b-col
              v-for="item in cart.products"
              :key="item.id"
              sm="12"
              md="6"
              lg="4"
              class="mb-3"
            >
              <b-card>
                <h5>{{ item.id }}.{{ item.name }} ({{ item.count }})</h5>
                <hr />
                <div class="d-flex justify-content-between align-items-center">
                  <span>{{
                    (Number(item.price) * item.count).toFixed(2)
                  }}</span>

                  <div class="d-flex align-items-center justify-content-end">
                    <b-button variant="secondary" @click="increament(item.id)"
                      ><BIconPlus />
                    </b-button>

                    <b-button
                      variant="danger"
                      class="ml-1"
                      @click="deleteProduct(item.id)"
                      ><BIconTrash
                    /></b-button>

                    <b-button
                      variant="secondary"
                      class="ml-1"
                      @click="decreament(item.id)"
                      ><BIconDash />
                    </b-button>
                  </div>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BIconTrash, BIconPlus, BIconDash } from 'bootstrap-vue'
import { useCartStore } from '~/store'
export default defineComponent({
  components: { BIconTrash, BIconPlus, BIconDash },
  setup() {
    const cart = useCartStore()

    return { cart }
  },
  computed: {
    productCount() {
      return this.cart.products.length
    },
  },
  methods: {
    deleteProduct(id: string) {
      this.cart.deleteProducts(id)
    },
    increament(id: string) {
      this.cart.increament(id)
    },
    decreament(id: string) {
      this.cart.decreament(id)
    },
  },
})
</script>

<style scoped>
.detail-item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
}
</style>
