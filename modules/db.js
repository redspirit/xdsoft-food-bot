const config = require('../configs').postgres;
const knex = require('knex');

module.exports = knex({
    client: 'pg',
    connection: config,
    pool: { min: config.min, max: config.max },
    debug: config.debug
});