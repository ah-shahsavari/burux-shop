<template>
  <div>
    <h1>Product List</h1>
    <div v-if="products" class="my-4">
      <b-row align-h="center">
        <b-col sm="12">
          <b-table striped hover :items="products" :fields="fields">
            <template #cell(id)="product">
              <p>{{ product.item.id }}</p>
            </template>
            <template #cell(product_name)="product">
              <p>
                {{ product.item.attributes && product.item.attributes.name }}
              </p>
            </template>
            <template #cell(product_price)="product">
              <p>
                {{ product.item.attributes && product.item.attributes.price }}
              </p>
            </template>
            <template #cell(options)="product">
              <div>
                <b-button
                  v-if="cartIds.includes(product.item.id)"
                  variant="secondary"
                  @click="increament(product.item.id)"
                  ><BIconPlus />
                </b-button>

                <b-button
                  v-if="cartIds.includes(product.item.id)"
                  variant="danger"
                  class="delete-icon"
                  @click="deleteProduct(product.item.id)"
                  ><BIconTrash />
                  <b-badge variant="danger" class="delete-number-badge">{{
                    cart.getProductById(product.item.id) &&
                    cart.getProductById(product.item.id).count
                  }}</b-badge>
                </b-button>

                <b-button
                  v-else
                  variant="success"
                  @click="
                    addProducts({
                      id: product.item.id,
                      name:
                        product.item.attributes && product.item.attributes.name,
                      price:
                        product.item.attributes &&
                        product.item.attributes.price,
                      count: 1,
                    })
                  "
                >
                  <BIconCart />
                </b-button>

                <b-button
                  v-if="cartIds.includes(product.item.id)"
                  variant="secondary"
                  @click="decreament(product.item.id)"
                  ><BIconDash />
                </b-button>
              </div>
            </template>
          </b-table>
        </b-col>
        <b-col sm="12">
          <b-pagination
            v-model="page"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  useRoute,
  useRouter,
  defineComponent,
  watch,
} from '@nuxtjs/composition-api'
import axios from 'axios'
import { BIconCart, BIconTrash, BIconPlus, BIconDash } from 'bootstrap-vue'
import { ProductsModel } from '../types/Products'
import { useCartStore } from '../store/index'

export default defineComponent({
  components: { BIconCart, BIconTrash, BIconPlus, BIconDash },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const fields = ref(['id', 'product_name', 'product_price', 'options'])
    const products = ref<ProductsModel['data'] | null>(null)
    const page = ref<number>(Number(route.value.query.page) || 1)
    const rows = ref<number>(0)
    const perPage = ref<number>(0)

    const cart = useCartStore()
    // const fields
    const fetchData = async () => {
      const pageNumber = page.value
      try {
        const response = await axios.get(
          `https://demo.spreecommerce.org/api/v2/storefront/products?page=${pageNumber}`
        )
        products.value = response.data.data as ProductsModel['data']
        rows.value = response.data.meta.total_count
        perPage.value = Math.ceil(
          response.data.meta.total_count / response.data.meta.total_pages
        )
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    watch(page, (page) => {
      fetchData()
      router.replace({ query: { page: page.toString() } })
      scrollToTop()
    })

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
      fields,
      products,
      page,
      rows,
      perPage,
      cart,
    }
  },
  computed: {
    cartIds() {
      return this.cart.products.map((product) => product.id)
    },
  },
  methods: {
    addProducts(product: {
      id: string
      name: string
      price: string
      count: number
    }) {
      this.cart.addProducts([product])
    },
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
