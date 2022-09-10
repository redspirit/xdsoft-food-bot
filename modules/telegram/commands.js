const Router = require('./router');
const axios = require('axios');
const sharp = require('sharp');
const parser2 = require('../../modules/parser2');
const userModel = require('../../models/user_model');
const router = new Router();
// const Extra = require('telegraf/extra');

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


router.on('/page', async (ctx, arg, params) => {

    let props = await parser2.getPage(arg);
    console.log(props);

    ctx.replyWithPhoto(
        {url: props.image},
        {caption: `*${props.title}* \nЦена: ${props.price} руб\nДоступно: ${props.inStock || 'неизвестно'}`}
    )

});

router.on('/test', async (ctx, arg, params) => {

});


module.exports = router;