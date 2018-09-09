

const PubSub = require('@google-cloud/pubsub')
const uuidv4 = require('uuid/v4')


class SubmissionManager {
  constructor () {
    const pubsub = PubSub()
    this.topic = pubsub.topic('ANSWER_ADDED')
  }

  submit (answers) {
    const formId = uuidv4()

    console.log('form Submitted', answers, formId)

    // answers.
    // topic.publish(message)
  }
}

module.exports = new SubmissionManager()
