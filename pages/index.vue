<template>
  <div class="container">
    <div class="mt-16 font-body grid grid-cols-4 gap-8">
      <div class="p-4 bg-gray-600 text-white">
        <div class="uppercase font-hairline">Régions</div>
        <div class="text-4xl font-semibold">{{regions.aggregate.count}}</div>
      </div>

      <div class="p-4 bg-gray-700 text-white">
        <div class="uppercase font-hairline">Départements</div>
        <div class="text-4xl font-semibold">{{departements.aggregate.count}}</div>
      </div>

      <div class="p-4 bg-gray-800 text-white">
        <div class="uppercase font-hairline">EPCIs</div>
        <div class="text-4xl font-semibold">{{epcis.aggregate.count}}</div>
      </div>

      <div class="p-4 bg-gray-900 text-white">
        <div class="uppercase font-hairline">Communes</div>
        <div class="text-4xl font-semibold">{{communes.aggregate.count}}</div>
      </div>
    </div>

    <div class="my-16 border-4 p-4 border-gray-200">
      <p>
        <strong>17/11/2020</strong> - Lancement initial avec toutes les régions, départements, epcis, et communes de l'hexagone.
      </p>

      <p class="bg-yellow-200">⚠️ Cette application n'inclut pas actuellement les données des territoires français d'outre-mer.</p>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-request'

export default {
  async asyncData({ params, $graphql }) {
    const variables = { code: params.code };
    const query = gql`{
      communes: communes_aggregate {
        aggregate {
          count
        }
      }
      departements: departements_aggregate {
        aggregate {
          count
        }
      }
      epcis: epcis_aggregate {
        aggregate {
          count
        }
      }
      regions: regions_aggregate {
        aggregate {
          count
        }
      }
    }`;

    const data = await $graphql.request(query, variables);
    return data;
  },
  head() {
    return {
      titleTemplate: 'territoires.fyi'
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  @apply my-4;

  &:first-child {
    @apply mt-0;
  }

  &:last-child {
    @apply mb-0;
  }
}
</style>
