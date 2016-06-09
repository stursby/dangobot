/**
 * Config
 */

require('dotenv').config()
const Botkit = require('botkit')
const controller = Botkit.slackbot()



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

controller.hears(['hello', 'hey', 'hi'], 'direct_message, direct_mention, mention', (bot, message) => {
  bot.reply(message, 'Hello, I’m dango.')
})
