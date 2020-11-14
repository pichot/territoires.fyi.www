<template>
  <div>
    <CollectiviteTitle
      type="region"
      :nom="region.nom"
    />

    <div class="mt-16 font-body grid grid-cols-8 grid-rows-6 gap-8">
      <div class="col-span-4 row-span-4">
        <CollectiviteMap 
          :highlightGeojson="region.geojson"
        />
      </div>
      
      <div class="bg-black text-white p-4 col-span-2 row-span-2">
        <div class="uppercase font-hairline">Population</div>
        <div class="text-4xl font-semibold">{{region.communes.aggregate.sum.population | numeralFormat}}</div>
      </div>

      <div class="bg-gray-900 text-white p-4 col-span-2 row-span-2">
        <div class="uppercase font-hairline">Code Insee</div>
        <div class="text-4xl font-mono">{{region.insee_reg}}</div>
      </div>

      <div class="bg-gray-800 text-white p-4 col-span-4 row-span-4">
        <div class="uppercase font-hairline mb-4">Départements</div>
        <ul>
          <li v-for="(d, i) in region.departements" :key="i" class="text-xl leading-none my-2">
            <n-link :to="`/departement/${d.insee_dep}/`" class="collectivite-link">{{d.nom}}</n-link>
          </li>
        </ul>
      </div>

      <div class="p-4 col-span-4 bg-gray-600 text-lg font-semibold text-white space-x-4">
        <a :href="`https://fr.wikipedia.org/wiki/${region.nom}`" target="_blank" class="t">Wikipedia
          <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>

        <a :href="`https://www.google.com/maps/place/${region.nom}`" target="_blank" class="t">Google Maps
          <svg class="w-5 h-5 vertical-align inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collectivite-link {
  &:hover {
    @apply border-b-4 border-white;
  }
}
</style>

<script>
import { gql } from 'graphql-request'
import CollectiviteTitle from '~/components/CollectiviteTitle.vue'

export default {  
  async asyncData({ params, $graphql }) {
    const variables = { code: params.code };
    const query = gql`query($code: String!) {
      region: regions_by_pk(insee_reg: $code) {
        nom
        insee_reg
        geojson: wkb_geometry
        departements(order_by: {nom: asc}) {
          nom
          insee_dep
        }
        communes: communes_aggregate {
          aggregate {
            sum {
              population
            }
          }
        }
      }
    }`;

    const region = await $graphql.request(query, variables);

    return region;
  },
  components: {
    CollectiviteTitle
  },
  data() {
    return {
      region: {}
    }
  },
  head() {
    return {
      title: this.$data.region.nom
    }
  }
}
</script>
