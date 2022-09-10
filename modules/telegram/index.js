const config = require('../../configs');
const { Telegraf } = require('telegraf');
const commands = require('./commands');

const bot = new Telegraf(config.bot_token);

bot.use(commands.middleware.bind(commands));

bot.command('quit', (ctx) => {
    ctx.leaveChat();
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
