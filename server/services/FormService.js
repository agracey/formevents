const Datastore = require('@google-cloud/datastore')
const datastore = new Datastore({
  projectId: 'agraceytestforms'
})


class FormService {
  constructor () {
    (() => {})()
  }

  async getAllForms () {
    const query = datastore
      .createQuery('forms', 'forms')
      // .select([ 'title', 'description'])

    const formList = await datastore.runQuery(query)
    return formList[0]
  }

  async getFormSpec (formId) {
    const query = datastore.createQuery('forms', 'forms')
      .filter('title', '=', formId)

    const formList = await datastore.runQuery(query)

    const pages = JSON.parse(JSON.parse(formList[0][0].pagesJson))

    return Object.assign({}, formList[0][0], {pages, pagesJson: null})
  }
}

module.exports = new FormService()
