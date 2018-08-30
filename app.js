const TeleBot = require('telebot');
var zalgo = require('to-zalgo')
console.log(process.env.TELEGRAM);
const bot = new TeleBot({
    token: process.env.TELEGRAM
});

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));

bot.on('inlineQuery', msg => {

    let query = msg.query;
    let evil = zalgo(query)
    console.log(`inline query: ${ query }`);

    const answers = bot.answerList(msg.id, {
        cacheTime: 60
    });
    answers.addArticle({
        id: 'query',
        title: query,
        description: evil,
        message_text: evil
    });
    
    return bot.answerQuery(answers);

});

bot.start();
