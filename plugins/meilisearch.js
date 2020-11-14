import MeiliSearch from 'meilisearch'

export default ({ app }, inject) => {
  const client = new MeiliSearch({
    host: app.$config.searchUrl,
    apiKey: app.$config.searchKey,
  })
  
  const index = client.getIndex('collectivites')
  
  inject('collectivites', index)
}
