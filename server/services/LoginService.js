

const PubSub = require('@google-cloud/pubsub')

class LoginService {
  constructor () {
    const pubsub = PubSub()
    this.topic = pubsub.topic('USER_LOGGEDIN')
  }

  buildToken (uid, password) {
    const token = 'asd'
    const auth = {uid, token, exp: 123}
    this.publishLogin(auth)
    return auth
  }

  // async because I want the continuation to happen
  async publishLogin (auth) {
    return this.topic.publish({data: JSON.stringify(auth)})
  }
}

module.exports = new LoginService()
