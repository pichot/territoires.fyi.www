<template>
  <div>
    <CollectiviteTitle
      type="epci"
      :nom="epci.nom"
    />

    <div class="mt-16 font-body grid grid-cols-8 grid-rows-6 gap-8">
      <div class="p-4 col-span-4 row-span-4">
        <CollectiviteMap
        :highlightGeojson="epci.geojson"
        />
      </div>
      
      <div class="bg-black text-white p-4 col-span-2 row-span-2">
        <div class="uppercase font-hairline">Population</div>
        <div class="text-4xl font-semibold">{{epci.communes_aggregate.aggregate.sum.population | numeralFormat}}</div>
      </div>

      <div class="bg-gray-900 text-white p-4 col-span-2 row-span-2">
        <div class="uppercase font-hairline">Code EPCI</div>
        <div class="text-4xl font-mono">{{epci.code_epci}}</div>
      </div>

      <div class="bg-gray-800 text-white p-4 col-span-4 row-span-4">
        <div class="uppercase font-hairline mb-4">Communes</div>
        <ul>
          <li v-for="(c, i) in epci.communes" :key="i" class="text-xl leading-none my-2">
            <n-link :to="`/commune/${c.insee_com}/`" class="collectivite-link">{{c.nom}}</n-link>
          </li>
        </ul>
      </div>

      <div class="p-4 col-span-4 bg-gray-600 text-lg font-semibold text-white space-x-4">
        <a :href="`https://fr.wikipedia.org/wiki/${epci.nom}`" target="_blank" class="t">Wikipedia
          <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-request'
import CollectiviteTitle from '~/components/CollectiviteTitle.vue'

export default {  
  async asyncData({ params, $graphql }) {
    const variables = { code: params.code };
    const query = gql`query($code: String!) {
      epci: epcis_by_pk(code_epci: $code) {
        nom
        code_epci
        geojson: wkb_geometry
        departements: communes_aggregate(distinct_on: insee_dep) {
          nodes {
            departement {
              nom
              insee_dep
            }
          }
        }
        regions: communes_aggregate(distinct_on: insee_reg) {
          nodes {
            region {
              nom
              insee_reg
            }
          }
        }
        communes {
          nom
          insee_com
        }
        communes_aggregate {
          aggregate {
            sum {
              population
            }
          }
        }
      }
    }`;

    const epci = await $graphql.request(query, variables);

    return epci;
  },
  computed: {
    departements() {
      return this.epci.departements.nodes.map(d => { return { ...d.departement } })
    }
  },
  components: {
    CollectiviteTitle
  },

  data() {
    return {
      epci: {
        region: {},
        departement: {}
      }
    }
  },
  head() {
    return {
      title: this.$data.epci.nom
    }
  }
}
</script>
