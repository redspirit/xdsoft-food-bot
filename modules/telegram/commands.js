const Router = require('./router');
const userModel = require('../../models/user_model');
const router = new Router();

router.on('/start', async (ctx, arg, params) => {

    let user = ctx.message.from;

    const existingUser = await userModel.getByTelegram(user.id);
    if(existingUser) {
        await userModel.setIsClosed(existingUser.id, false);
        ctx.reply(`С возвращением, ${user.first_name}!`);
    } else {
        await userModel.createUser(user.id, user.username, user.first_name);
        ctx.reply(`Привет, ${user.first_name}! Я помогу тебе заказать еду в офис. Для подробностей /help`);
    }

});

router.on('/help', (ctx, arg, params) => {
    ctx.reply('Информационный текст помощи');
});


router.on('/hello', (ctx, arg, params) => {

    console.log('arg', arg);
    console.log('params', params);

    ctx.reply('hello from my router');
});



module.exports = router;