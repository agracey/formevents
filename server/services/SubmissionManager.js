

const PubSub = require('@google-cloud/pubsub')
const uuidv4 = require('uuid/v4')

class SubmissionManager {
  constructor () {
    const pubsub = PubSub()
    this.publisher = pubsub.topic('ANSWER_ADDED').publisher()
  }

  async submit (formId, answers, language) {
    // Go ahead and make a random id for the submission
    const submissionId = uuidv4()

    answers.forEach((answer) => {
      this.publisher.publish(Buffer.from(JSON.stringify({formId, submissionId, answer, language})))
    })

    return {id: submissionId}
  }
}

module.exports = new SubmissionManager()
