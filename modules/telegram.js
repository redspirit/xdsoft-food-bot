const config = require('../configs');
const { Telegraf } = require('telegraf');
const userModel = require('../models/user_model');

const bot = new Telegraf(config.bot_token);

bot.command('quit', (ctx) => {
    // Explicit usage
    // ctx.telegram.leaveChat(ctx.message.chat.id);

    // Using context shortcut
    ctx.leaveChat();
});

bot.on('text', async (ctx) => {
    // Explicit usage
    // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

    console.log('ctx.message', ctx.message);

    if(ctx.message.text === '/start') {

        console.log('create user in db');

        let user = ctx.message.from;
        await userModel.createUser(user.id, user.username, user.first_name);

        ctx.reply(`Привет, ${user.first_name}! Теперь ты можешь пользоваться ботом, он поможет тебе делать заказы на еду в офис. Отправь мне ссылку на страницу с едой с сайта вкуссвил и я добавлю его в твой список озбранного. Добавлять можно сколько угодно страниц. Для подробностей можешь кликнуть на команду /help`);

    } else {
        ctx.reply(`Hello ${ctx.message.from.first_name}`);
    }

});

bot.on('callback_query', (ctx) => {
    // Explicit usage
    // ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

    // Using context shortcut
    ctx.answerCbQuery();
});

bot.on('inline_query', (ctx) => {
    const result = [];
    // Explicit usage
    // ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
