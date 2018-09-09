

const PubSub = require('@google-cloud/pubsub')
const uuidv4 = require('uuid/v4')

const pubsub = PubSub()
const topic = pubsub.topic('ANSWER_ADDED')


class SubmissionManager {
  constructor () {
    (() => {})()
  }

  submit (answers) {
    const id = uuidv4()

    // answers.
    // topic.publish(message)
  }
}

module.exports = new SubmissionManager()
