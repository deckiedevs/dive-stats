require('dotenv').config();

const { Pool, types } = require('pg');

const pool = new Pool();

types.setTypeParser(1700, (val) => {
    return parseFloat(val);
});

types.setTypeParser(20, (val) => {
    return parseInt(val);
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    }
};