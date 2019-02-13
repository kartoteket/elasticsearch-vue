<template>
  <div>
    <CategorySearch
      id="ProductSearch"
      index="products"
      searchId="productsearch"
      categoryField="path"
      :searchFields="['category_name', 'product', 'producer']"
      />

    <CategorySearch
      id="CategorySearch"
      index="categories"
      searchId="mainsearch"
      initSearch="mat"
      categoryField="path"
      :searchFields="['name', 'synonyms']"
      />

      <div>
        {{searchresults}}
      </div>

  </div>
</template>

<script>
import CategorySearch from '@/components/CategorySearch'


export default {
  name: 'search-component',
  data() {
    return {
      searchresults: null,
    }
  },
  components: {
    CategorySearch,

  }

}
</script>

<style>

</style>
