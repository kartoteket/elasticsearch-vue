<template>
  <div>
    <ReactiveBase
    app="products"
    url="http://localhost:9200" >

  <DataSearch
    className="result-list-container"
    componentId="CategorySearch"
    :dataField="['name']"
    categoryField="path"

  />

      <div>
        {{searchresults}}
      </div>

    </ReactiveBase>
  </div>
</template>

<script>
// import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch-vue'

export default {
  name: 'search-component',
  data() {
    return {
      searchresults: null,
    }
  },
  // components: {
  //   ReactiveBase,
  //   DataSearch
  // }

}
</script>

<style>

</style>
