const request = require('request');

// let url = 'https://spb.vkusvill.ru/goods/bitochek-sochnyy-s-penne-61689.html';
let url = 'https://eda.yandex.ru';

const jar = request.jar();
jar.setCookie(request.cookie('PHPSESSID=7uyp372AubP5GgLR5e7pgeWbe4IuSfw3'), url);
jar.setCookie(request.cookie('BITRIX_SM_SALE_UID=208254120'), url);
jar.setCookie(request.cookie('BITRIX_SM_REGION_ID_3=3873'), url);
jar.setCookie(request.cookie('BITRIX_SM_REGION_DOMAIN_3=spb'), url);

const options = {
    method: 'GET',
    url: url,
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        referer: 'https://spb.vkusvill.ru/goods/gotovaya-eda/',
        cookie: 'ABvariantBX_test_kg_in_pce=A; BITRIX_SM_SALE_UID=208254120; SERVERID=bitrix02; uxs_uid=eb1394d0-24ab-11ed-99a2-1d9fd6cf3ae7; mgo_sb_migrations=1418474375998%3D1; mgo_sb_current=typ%3Dorganic%7C%2A%7Csrc%3Dyandex%7C%2A%7Cmdm%3Dorganic%7C%2A%7Ccmp%3D%28none%29%7C%2A%7Ccnt%3D%28none%29%7C%2A%7Ctrm%3D%28none%29%7C%2A%7Cmango%3D%28none%29; mgo_sb_first=typ%3Dorganic%7C%2A%7Csrc%3Dyandex%7C%2A%7Cmdm%3Dorganic%7C%2A%7Ccmp%3D%28none%29%7C%2A%7Ccnt%3D%28none%29%7C%2A%7Ctrm%3D%28none%29%7C%2A%7Cmango%3D%28none%29; mgo_uid=nUhJMQt71Ea9BqcYsUGW; WE_USE_COOKIE=Y; mgo_cnt=3; ABvariantBX_test_search_logos_input=B; HEADER_TOP_BN_SECT_ID=1475; HEADER_TOP_BN_ID=877111; _vv_card=[898396; mgo_sb_migrations=1418474375998%3D1; mgo_sb_current=typ%3Dorganic%7C%2A%7Csrc%3Dyandex%7C%2A%7Cmdm%3Dorganic%7C%2A%7Ccmp%3D%28none%29%7C%2A%7Ccnt%3D%28none%29%7C%2A%7Ctrm%3D%28none%29%7C%2A%7Cmango%3D%28none%29; mgo_sb_first=typ%3Dorganic%7C%2A%7Csrc%3Dyandex%7C%2A%7Cmdm%3Dorganic%7C%2A%7Ccmp%3D%28none%29%7C%2A%7Ccnt%3D%28none%29%7C%2A%7Ctrm%3D%28none%29%7C%2A%7Cmango%3D%28none%29; mgo_uid=gxkJFDN2sHWVTk6bWQRt; mgo_cnt=1; BITRIX_SM_REGION_ID_3=3873; BITRIX_SM_REGION_DOMAIN_3=spb; DeliverySelectFromPopup=Y; PHPSESSID=CzdrhmAF010UQ7ahdi3EZXX4MyYI2wLx',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'upgrade-insecure-requests': '1',
        'cache-control': 'max-age=0'
    },
    jar: jar
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
