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
    <ul v-show="hasResults" class="autocomplete-results">
      <li
      v-for="(result, i) in results"
      :key="i"
      class="autocomplete-result"
      :class="isActiveClass(i)"
      @click='selectProduct(result)'>
      <span class="bold">{{ result.name }}</span> in <span class="italics">{{ result.path }}</span>
    </li>
    </ul>
  </div>

</template>

<script>
import { uniqueId } from 'lodash';
import Queries from '@/services/Queries';

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
    isActiveClass(index) {
      if (index === this.arrowCounter) {
        return 'is-active';
      }
      return '';
    }
  },

  computed: {
    hasResults() {
      return !!this.results.length;
    }
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
        this.results = this.query.update(newTerm)
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

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 320px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
