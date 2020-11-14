<template>
  <div class="font-display">
    <h2 v-if="type !== 'region' && type !== 'epci'" class="text-lg">
      <nuxt-link :to="`/region/${region.insee_reg}`">{{region.nom}}</nuxt-link>

      <span v-if="departement">
        / <nuxt-link :to="`/departement/${departement.insee_dep}`">{{departement.nom}}</nuxt-link> 
      </span>
    </h2>
    
    <h1 class="text-6xl font-semibold leading-tight">{{nom}}
      <span v-if="type === 'departement'" class="departement-circle text-3xl rounded-full inline-block p-2 bg-gray-500 align-middle text-white relative">
        <span class="id">{{id}}</span>
      </span>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    nom: String,
    id: String,
    region: Object,
    departement: Object,
    commune: Object
  }
}
</script>

<style lang="scss" scoped>
.departement-circle {
  width: 3.25rem; 
  height: 3.25rem;
}

.id {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}

a {
  @apply leading-none;

  &:hover {
    @apply border-b-4 border-black;
  }
}
</style>
