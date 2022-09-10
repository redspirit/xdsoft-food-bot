
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { SocksProxyAgent } = require('socks-proxy-agent');
// const $ = cheerio.load('<h2 class="title">Hello world</h2>');
// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

const { CookieJar, Cookie } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const CookieFileStore = require('tough-cookie-file-store').FileCookieStore
// const cookieJar = new CookieJar()
const jar = new CookieJar(new CookieFileStore('./cookie.json'));
const client = wrapper(axios.create({ jar }));


// const cookie = Cookie.parse('foo=bar; Domain=example.com; Path=/')
// cookieJar.setCookie(cookie, 'http://example.com', function (error, cookie) {
//     console.log(cookie)
// })


// http://free-proxy.cz/ru/proxylist/country/RU/socks/ping/all
let proxyHost = '46.23.155.18';
let proxyPort = '62638';
// const httpsAgent = new SocksProxyAgent(`socks4://${proxyHost}:${proxyPort}`);
const httpsAgent = new https.Agent({
    // cert: fs.readFileSync('client.crt'),
    // key: fs.readFileSync('client.key'),
    ca: fs.readFileSync('modules/ca-certs.pem'),
});

let headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    // cookie: '',
    // "cookie": "ABvariantBX_test_kg_in_pce=A; BITRIX_SM_SALE_UID=208254120; SERVERID=bitrix02; uxs_uid=eb1394d0-24ab-11ed-99a2-1d9fd6cf3ae7; mgo_sb_migrations=1418474375998%253D1; mgo_sb_current=typ%253Dorganic%257C%252A%257Csrc%253Dyandex%257C%252A%257Cmdm%253Dorganic%257C%252A%257Ccmp%253D%2528none%2529%257C%252A%257Ccnt%253D%2528none%2529%257C%252A%257Ctrm%253D%2528none%2529%257C%252A%257Cmango%253D%2528none%2529; mgo_sb_first=typ%253Dorganic%257C%252A%257Csrc%253Dyandex%257C%252A%257Cmdm%253Dorganic%257C%252A%257Ccmp%253D%2528none%2529%257C%252A%257Ccnt%253D%2528none%2529%257C%252A%257Ctrm%253D%2528none%2529%257C%252A%257Cmango%253D%2528none%2529; mgo_uid=nUhJMQt71Ea9BqcYsUGW; WE_USE_COOKIE=Y; ABvariantBX_test_search_logos_input=B; HEADER_TOP_BN_SECT_ID=1475; HEADER_TOP_BN_ID=877111; _vv_card=%5B898396; mgo_sb_migrations=1418474375998%253D1; mgo_sb_current=typ%253Dorganic%257C%252A%257Csrc%253Dyandex%257C%252A%257Cmdm%253Dorganic%257C%252A%257Ccmp%253D%2528none%2529%257C%252A%257Ccnt%253D%2528none%2529%257C%252A%257Ctrm%253D%2528none%2529%257C%252A%257Cmango%253D%2528none%2529; mgo_sb_first=typ%253Dorganic%257C%252A%257Csrc%253Dyandex%257C%252A%257Cmdm%253Dorganic%257C%252A%257Ccmp%253D%2528none%2529%257C%252A%257Ccnt%253D%2528none%2529%257C%252A%257Ctrm%253D%2528none%2529%257C%252A%257Cmango%253D%2528none%2529; mgo_uid=gxkJFDN2sHWVTk6bWQRt; mgo_cnt=1; BITRIX_SM_REGION_ID_3=3873; BITRIX_SM_REGION_DOMAIN_3=spb; DeliverySelectFromPopup=Y; mgo_cnt=2; PHPSESSID=03AFwOR0T6aUUMKJnyDGYMfRwPUtC6zd; mgo_sid=e2f3rhyhbf1100213qlu; mgo_sb_session=pgs%253D2%257C%252A%257Ccpg%253Dhttps%253A%252F%252Fspb.vkusvill.ru%252Fgoods%252Fbitochek-sochnyy-s-penne-61689.html",
    // "Referer": "https://spb.vkusvill.ru/goods/gotovaya-eda/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
};


// https://img.vkusvill.ru/pim/images/site_BigWebP/0ed219d4-e9be-40a8-a9ef-85a53db7dfff.webp?1656669249.1216


const getInfo = async (url) => {

    return client({
        method: 'GET',
        url: url,
        headers,
        httpsAgent,
        withCredentials: true
    }).then((result) => {

        const fetchedUrl = result.request.res.responseUrl;
        console.log('status', result.status);
        console.log('fetchedUrl', fetchedUrl);
        console.log('result', result.data);

    }).catch(err => {

        console.log('err', err.toString());

    });

}


module.exports = {
    getInfo
}
