<template>
  <ul v-show="hasResults" class="autocomplete-results">
      <li
      v-for="(result, i) in results"
      :key="i"
      class="autocomplete-result"
      :class="isActiveClass(i)"
      @click='selectProduct(result)'>

      <span class="bold"> {{result.name}} </span> in <span class="italics"> {{ result.path }}</span>
    }
    </li>

    </ul>
</template>

<script>
export default {
  name: 'autocomplete-results',
  props: {
    results: {
      type: Array,
      default: () => []
    },
    counter: {
      type: Number,
    }
  },
  computed: {
    hasResults() {
      return !!this.results.length;
    }
  },

  methods: {

    isActiveClass(index) {
      if (index === this.arrowCounter) {
        return 'is-active';
      }
      return '';
    },
  }
}
</script>

<style>

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
