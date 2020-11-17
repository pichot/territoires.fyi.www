<template>
  <div>
    <CollectiviteTitle
      type="departement"
      :nom="departement.nom"
      :id="departement.insee_dep"
      :region="departement.region"
    />

    <div class="mt-16 font-body grid grid-cols-8 grid-rows-4 gap-8">
      <div class="p-4 col-span-4 row-span-4">
        <CollectiviteMap
          :highlightGeojson="departement.geojson"
        />
      </div>
      
      <div class="bg-black text-white p-4 col-span-2 row-span-1">
        <div class="uppercase font-hairline">Population</div>
        <div class="text-4xl font-semibold">{{departement.communes_aggregate.aggregate.sum.population}}</div>
      </div>

      <div class="bg-gray-900 text-white p-4 col-span-2 row-span-1">
        <div class="uppercase font-hairline">Code Insee</div>
        <div class="text-4xl font-mono">{{departement.insee_dep}}</div>
      </div>

      <!-- <div class="bg-gray-800 text-white p-4 col-span-4 row-span-2">
        <div class="uppercase font-hairline mb-4">Communes</div>
        <ul>
          <li v-for="(c, i) in departement.communes" :key="i" class="text-xl leading-none inline-block mr-2">
            <n-link :to="`/commune/${c.insee_com}/`" class="collectivite-link">{{c.nom}}</n-link>
          </li>
        </ul>
      </div> -->

      <div class="col-span-2 col-start-5 row-span-1 text-lg font-body text-gray-800 ">
        <ul>
          <li>
            <a :href="`https://fr.wikipedia.org/wiki/${departement.nom}`" target="_blank">Wikipedia
              <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </li>
          <li>
            <a :href="`https://www.google.com/maps/place/${departement.nom}`" target="_blank">Google Maps
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

export default {    
  async asyncData({ params, $graphql }) {
    const variables = { code: params.code };
    const query = gql`query($code: String!) {
      departement: departements_by_pk(insee_dep: $code) {
        nom
        insee_dep
        geojson: wkb_geometry
        region {
          nom
          insee_reg
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

    const departement = await $graphql.request(query, variables);

    return departement;
  },
  components: {
    CollectiviteTitle
  },
  head() {
    return {
      title: this.$data.departement.nom
    }
  }
}
</script>
