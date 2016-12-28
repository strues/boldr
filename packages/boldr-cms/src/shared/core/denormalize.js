import _ from 'lodash'

function getArticleFieldToEntity() {
  return  [ {
    field: 'user',
    entity: 'author'
  }, {
    field: 'tags',
    entity: 'tags'
  }]
}

function denormalizeEntity(entityIds = [], entityObj = {}) {
  let rtn
  entityObj = entityObj || {}
  if (Array.isArray(entityIds)) {
    rtn = []
    _.forEach(entityIds, (id) => {
      if (entityObj.hasOwnProperty(id)) {
        rtn.push(entityObj[id])
      }
    })
  } else {
    rtn = entityObj[entityIds]
  }
  return rtn
}

export function denormalizeArticles(slugs = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { posts } = entities
  const fieldToEntity = getArticleFieldToEntity()
  slugs = Array.isArray(slugs) ? slugs : [ slugs ]
  slugs.forEach((slug) => {
    if (posts.hasOwnProperty(slug)) {
      let post = _.merge({}, posts[slug])
      _.forEach(fieldToEntity, (ele) => {
        post[ele.field] = denormalizeEntity(post[ele.field], entities[ele.entity])
      })
      denormalizedArticles.push(post)
    }
  })
  return denormalizedArticles
}

export function shallowDenormalizeArticles(slugs = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { posts } = entities
  slugs = Array.isArray(slugs) ? slugs : [ slugs ]
  slugs.forEach((slug) => {
    if (posts.hasOwnProperty(slug)) {
      let post = _.merge({}, articles[slug])
      denormalizedArticles.push(post)
    }
  })
  return denormalizedArticles
}
