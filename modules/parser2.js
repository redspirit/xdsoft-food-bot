const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const cheerio = require('cheerio');

let page = null;

(async () => {
    const browser = await puppeteer.launch();
    console.log('launch');
    page = await browser.newPage();

    // const cookiesString = await fs.readFile('./modules/p-cookies.json');
    // if(cookiesString) {
    //     const c = JSON.parse(cookiesString.toString());
    //     await page.setCookie(...c);
    // }

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (['stylesheet', 'image', 'other'].includes(request.resourceType()))
            request.abort();
        else {
            // console.log('load', request.url(), request.resourceType());
            request.continue();
        }
    });

    await page.setJavaScriptEnabled(false);
    await page.setCacheEnabled(true);
    // await page.goto('https://spb.vkusvill.ru/goods/bitochek-sochnyy-s-penne-61689.html');
    // await page.goto('https://vk.com');
    //await page.screenshot({path: 'screen.png'});

    // const cookies = await page.cookies();
    // await fs.writeFile('modules/p-cookies.json', JSON.stringify(cookies, null, 2));

    // await getPage('https://spb.vkusvill.ru/goods/bitochek-sochnyy-s-penne-61689.html');

    // await browser.close();
})();

const getPage = async (url) => {

    console.log('url', url);

    await page.goto(url);
    let html = await page.content()

    await fs.writeFile('modules/sample.html', html);

    return parser(html);

};

const parser = (html) => {

    const $ = cheerio.load(html);
    let price = $('.Product__priceItem').find('[itemprop=price]').attr('content');
    let inStock = $('.ProductLkRest').text();
    let title = $('h1.Product__title').html();
    let image = $('.ProductGallery__image a img').attr('data-src');

    return {
        price: price ? parseInt(price) : null,
        title: title ? title.trim() : null,
        inStock,
        image
    };

}

// setTimeout(() => {
//
//     // getPage('https://webhook.site/f2b66c6d-5d35-4e75-a514-2ee5437dae36').then();
//     // getPage('https://spb.vkusvill.ru/goods/bitochek-sochnyy-s-penne-61689.html').then();
//     // getPage('https://vk.com').then();
//
// }, 2000);

module.exports = {
    getPage
}