const _ = require('underscore');
const yaml = require('js-yaml');
const fs   = require('fs');

_.templateSettings = {
    interpolate: /\$(.+?)\$/g
};

let config = null;
let addFile = process.env.ENV || 'prod';

try {

    let commonStr = fs.readFileSync(`${__dirname}/common.yml`, 'utf8');
    let addStr = fs.readFileSync(`${__dirname}/${addFile}.yml`, 'utf8');

    const commonConf = yaml.load(_.template(commonStr)(process.env));
    const addConf = yaml.load(_.template(addStr)(process.env));
    config = {...commonConf, ...addConf};

    console.log('Use config:', addFile);
} catch (e) {
    console.log(e);
}

module.exports = config;