var express = require('express')
const AsyncRouter = require('express-async-router').AsyncRouter
const router = AsyncRouter()
const winston = require('winston')

const SubmissionService = require('../services/SubmissionManager.js')
const LoginService = require('../services/LoginService.js')
const FormService = require('../services/FormService.js')


// for oauth when I actually get it hooked up
router.get('/callback', (req, res) => {
  winston.debug('Getting Token', req.params, req.headers)
  // TODO: make depend on login
  return [{
    name: 'Test Location'
  }]
})

router.get('/formList', (req, res) => {
  return FormService.getAllForms()
})

router.get('/form/:name', async (req, res) => {
  return FormService.getFormSpec(req.params.name)
})


router.use(express.json())


// for login while I'm hooking up oauth and while in dev
router.post('/login', (req, res) => {
  winston.debug('Getting Password Login' + JSON.stringify(req.body))

  const token = LoginService.buildToken(req.body.username, req.body.password)
  return token
})

router.post('/answers', async (req, res) => {
  const submission = await SubmissionService.submit(
    req.body.formId,
    req.body.answers,
    req.body.language || 'en-US')

  return {submissionId: submission.id}
})

module.exports = router
