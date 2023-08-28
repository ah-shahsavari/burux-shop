<template>
  <div>
    <Products />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Products from '~/components/Products.vue'

export default defineComponent({
  components: { Products },
  setup() {},
})
</script>
