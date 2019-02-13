<template>
  <div class="autocomplete">
    <label :for="searchId">Search for a category</label>
    <input type="text"
      autocomplete="off"
      :name="searchId"
      :id="searchId"
      v-model="searchTerm"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"/>

    <AutocompleteResults
      :results="results"
      :counter="arrowCounter"/>

  </div>

</template>

<script>
import { uniqueId } from 'lodash';
import Queries from '@/services/Queries';
import AutocompleteResults from '@/components/AutocompleteResults';

export default {
  name: 'category-search',
  props: {
    id: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    categoryField: {
      type: String,
    },
    searchFields: {
      type: [String,Array],
      required: true,
    },
    // id of the search props
    searchId: {
      type: String,
      default: uniqueId('search_')
    },
    initSearch: {
      type: String,
      default: null,
    }
  },
  data() {
    return{
      searchTerm: null,
      query: null,
      results: [],
      arrowCounter: -1,
    }
  },

  components: {
    AutocompleteResults,
  },

  methods: {
    selectProduct(result) {
      console.log(result, 'selected');
    },
    onArrowDown(e) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp(e) {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter(e) {
      console.log(e);
    },
  },

  created() {
    this.query = new Queries(this.searchFields, this.categoryField, this.index, this.id)
    if (!this.searchTerm && this.initSearch) {
      this.searchTerm = this.initSearch;
    }
  },

  watch: {
    searchTerm(newTerm, oldTerm) {
      if (newTerm) {
        this.query.update(newTerm)
          .then(data => {
            this.results = data;
          })
      }
      console.log(oldTerm, newTerm);
    }
  }

}
</script>

<style>
  .bold {
    font-weight: bold;
  }

  .italics {
    font-style: italic;
  }

  .autocomplete {
    position: relative;
    width: 530px;
  }

</style>
