<template>
  <div class="relative">
    <label class="block">
      <input
        class="text-2xl"
        v-model="query"
        placeholder="commune, epci, départment, région, code insee"
        @keydown="keyDown"
      >
    </label>
    <div 
      class="dropdown absolute pt-4 z-10 w-full bg-white border-b-4 border-r-4 border-l-4 border-gray-200"
      v-if="results.length > 0 && query.length > 0"
      @click="resetSearch"
      v-click-outside="resetSearch"
    >
      <n-link
        v-bind:class="[c == selected ? 'selected' : '']"
        @mouseover.native="selected = c"
        class="result text-2xl block"
        v-for="(c, i) in results"
        :key="i"
        :to="`/${c.type}/${c.id}/`"
      >
        {{c.nom}}
        <span v-if="c.type === 'departement'" class="rounded-full p-1 text-sm align-middle bg-gray-500 text-white text-center">{{c.id}}</span>
        <span :class="[c == selected ? 'text-gray-200' : 'text-gray-700']" class="text-sm">{{c.type}}</span>
        <div v-if="selected === c" class="float-right white">→</div>
      </n-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
label {
  @apply relative ;
}

label:before {
  content: "";
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 1.5rem;
  background: url("data:image/svg+xml,%3Csvg fill='none' stroke='%23a0aec0' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'%3E%3C/path%3E%3C/svg%3E") center / contain no-repeat
}

input {
  @apply w-full px-4 py-2 pl-12 border-4 border-gray-400;

  &:hover {
    @apply border-gray-500 outline-none;
  }

  &:focus {
    @apply border-gray-500 rounded-none outline-none;
  }
}

.dropdown {
  .result {
    @apply py-2 px-4;

    &.selected {
      @apply text-white bg-gray-700;
    }
  }
}
</style>

<script>
import ClickOutside from 'vue-click-outside'

function initialState() {
  return {
    query: '',
    results: [],
    selected: {}
  }
}

export default {
  data() {
    return initialState();
  },
  methods: {
    resetSearch() {
      Object.assign(this.$data, initialState());
    },
    keyDown(e) {
      if (e.keyCode === 13) {
        if (this.results.length === 0) { return; }
        
        this.$router.push(`/${this.selected.type}/${this.selected.id}`)
        this.resetSearch()
      } else if (e.keyCode === 38) {
        e.preventDefault()

        const index = this.results.findIndex(c => c === this.selected)

        if (index > 0) {
          this.selected = this.results[index - 1]
        }
      } else if (e.keyCode === 40) {
        e.preventDefault()
        
        const index = this.results.findIndex(c => c === this.selected)

        if (index + 1 < this.results.length) {
          this.selected = this.results[index + 1]
        }
      }
    }
  },
  watch: {
    async query() {
      const response = await this.$collectivites.search(this.query, {
        limit: 10
      })
      this.results = response.hits
      
      if (this.results.length > 0) {
        this.selected = this.results[0]
      } else {
        this.selected = null
      }
    }
  },
  directives: {
    ClickOutside
  }
}
</script>
