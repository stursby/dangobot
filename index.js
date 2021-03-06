'use strict'

/**
 * Config
 */

require('dotenv').config({silent: true})
const axios = require('axios')
const _ = require('lodash')
const Botkit = require('botkit')
const controller = Botkit.slackbot()

const DANGO_API = 'http://emoji.getdango.com/api/emoji?q='


/**
 * Bot setup
 */

const bot = controller.spawn({
  token: process.env.SLACK_API_TOKEN
})

bot.startRTM((err, bot, payload) => {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})



/**
 * Listeners
 */

controller.on('direct_message, direct_mention, mention', (bot, message) => {
  let input = message.text
  if (input.length > 1) {
    let query = encodeURIComponent(input)
    let count = input.split(' ').length
    axios.get(`${DANGO_API}${query}`)
      .then((res) => {
        let reply = _.map(res.data.results, 'text').slice(0, count).join(' ')
        bot.reply(message, reply)
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    bot.reply(message, 'Hey! Send me some text to convert...')
  }
})
