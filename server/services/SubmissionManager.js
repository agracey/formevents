

const PubSub = require('@google-cloud/pubsub')
const uuidv4 = require('uuid/v4')


class SubmissionManager {
  constructor () {
    const pubsub = PubSub()
    this.topic = pubsub.topic('ANSWER_ADDED')
  }

  submit (formId, answers) {
    const submissionId = uuidv4()

    console.log('form Submitted', answers, submissionId)

    answers.forEach((answer) => {
      this.topic.publish({formId, submissionId, answer})
    })
    return {id: submissionId}
  }
}

module.exports = new SubmissionManager()
