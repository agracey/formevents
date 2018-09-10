var express = require('express')
const AsyncRouter = require('express-async-router').AsyncRouter
const router = AsyncRouter()
const winston = require('winston')

const SubmissionService = require('../services/SubmissionManager.js')
const LoginService = require('../services/LoginService.js')


// for oauth when I actually get it hooked up
router.get('/callback', (req, res) => {
  winston.debug('Getting Token', req.params, req.headers)
  // TODO: make depend on login
  return [{
    name: 'Test Location'
  }]
})

router.get('/formList', (req, res) => {
  return [{
    name: 'Test Form',
    description: 'A Test Form'
  }]
})

router.get('/form/:name', async (req, res) => {
  console.log('')
  return {
    title: 'Test Form',
    comments: 'Some comments here',
    pages: [
      {
        sections: [{
          title: 'Section One',
          comments: 'hello',
          questions: [{
            title: 'Question One',
            type: 'range',
            min: 1,
            max: 5
          }]
        }]
      }
    ]
  }
})


router.use(express.json())


// for login while I'm hooking up oauth and while in dev
router.post('/login', (req, res) => {
  winston.debug('Getting Password Login' + JSON.stringify(req.body))

  const token = LoginService.buildToken(req.body.username, req.body.password)
  return token
})

router.post('/answers', async (req, res) => {
  const submission = SubmissionService.submit(req.body.formTitle, req.body.answers)

  return {submissionId: submission.id}
})

module.exports = router
