<template>
  <div class="flex flex-col h-screen justify-between font-body">
    <div class="mb-auto">
      <div class="max-w-screen-lg mx-auto">
        <header class="mb-12 mt-8">
          <n-link to="/" class="font-display logo text-2xl leading-none">territoires.fyi</n-link>
        </header>

        <SearchBox class="my-8" />
        
        <Nuxt />
      </div>
    </div>

    <footer class="mt-32 bg-gray-100">
      <div class="max-w-screen-lg mx-auto text-gray-500 text-sm">
        <div class="py-16">
          Un projet de <a href="https://pichot.us">Jonathan Pichot</a> | <a href="https://github.com/pichot/territoires.fyi">Github</a> | <a href="https://twitter.com/_pichot">Twitter</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox.vue'

export default {
  components: {
    SearchBox
  }
}
</script>

<style lang="scss" scoped>
header {
  a:hover {
    @apply border-b-4 border-gray-800;
  }
}

footer {
  a {
    @apply font-bold leading-none;

    &:hover {
      @apply border-b-4 border-gray-500;
    }
  }
}
</style>
