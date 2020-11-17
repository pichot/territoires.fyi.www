<template>
  <div>
    <CollectiviteTitle
      class="my-12"
      type="commune"
      :nom="commune.nom"
      :region="commune.region"
      :departement="commune.departement"
    />

    <div class="mt-16 font-body grid grid-cols-8 grid-rows-4 gap-8">
      <div class="col-span-4 row-span-4">
        <CollectiviteMap
          :highlightCentroid="commune.geojson"
        />
      </div>
      
      <div class="bg-black text-white p-4 col-span-2 row-span-1">
        <div class="uppercase font-hairline">Population</div>
        <div class="text-4xl font-semibold">{{commune.population}}</div>
      </div>

      <div class="bg-gray-900 text-white p-4 col-span-2 row-span-1">
        <div class="uppercase font-hairline">Code INSEE</div>
        <div class="text-4xl font-mono">{{commune.insee_com}}</div>
      </div>

      <div class="col-span-4 col-start-5 row-span-1 text-lg font-body text-gray-800 ">
        <ul>
          <li>
            <a :href="`https://fr.wikipedia.org/wiki/${commune.nom}`" target="_blank">Wikipedia
              <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </li>
          <li>
            <a :href="`https://www.google.com/maps/place/${commune.nom}`" target="_blank">Google Maps
              <svg class="w-5 h-5 vertical-align inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </li>
          <li>
            <a :href="`https://www.cohesion-territoires.gouv.fr/${commune.nom}/${commune.insee_com}`" target="_blank">Ma Commune
              <svg class="w-5 h-5 vertical-align inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-request'
import CollectiviteTitle from '~/components/CollectiviteTitle.vue'
import CollectiviteMap from '~/components/CollectiviteMap.vue'

export default {
  async asyncData({ params, $graphql }) {
    const variables = { code: params.code };
    const query = gql`query($code: String!) {
      commune: communes_by_pk(insee_com: $code) {
        insee_com
        nom
        statut
        population
        geojson: wkb_geometry
        departement {
          nom
          insee_dep
        }
        epci {
          code_epci
          nom
        }
        region {
          insee_reg
          nom
        }
      }
    }`;

    const commune = await $graphql.request(query, variables);

    return commune;
  },
  components: {
    CollectiviteTitle,
    CollectiviteMap
  },
  
  data() {
    return {
      commune: {
        region: {},
        departement: {},
        epci: {}
      }
    }
  },
  head() {
    return {
      title: this.$data.commune.nom
    }
  }
}
</script>

<style lang="scss">
.epci-link {
  &:hover {
    @apply border-b-4 border-white;
  }
}
</style>
