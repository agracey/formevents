var express = require('express')
const AsyncRouter = require('express-async-router').AsyncRouter
const router = AsyncRouter()
const winston = require('winston')

const SubmissionManager = require('../services/SubmissionManager.js')

router.get('/callback', (req, res) => {
  winston.debug('Getting Locations', req.params, req.headers)
  // TODO: make depend on login
  return [{
    name: 'Test Location'
  }]
})

router.get('/locations', (req, res) => {
  winston.debug('Getting Locations', req.params, req.headers)
  // TODO: make depend on login
  return [{
    name: 'Test Location'
  }]
})

router.get('/forms', (req, res) => {
  return [{
    name: 'Test Form'
  }]
})

router.get('/form/:name', (req, res) => {
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

router.post('/answers', async (req, res) => {
  const submission = SubmissionManager.submit(req.body)

  return {status: submission.status, eventId: submission.id}
})


module.exports = router
