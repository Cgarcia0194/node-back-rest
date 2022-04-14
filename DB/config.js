const {
    Sequelize
} = require("sequelize");

const db = 'node_curso';
const user = 'carlos';
const pss = '100%Lacrimosa';
const host = 'localhost';
const dialect = 'mysql';

const dbConnection = new Sequelize(db, user, pss, {
    host,
    dialect
    // logging: false
});

module.exports = {
    dbConnection
};