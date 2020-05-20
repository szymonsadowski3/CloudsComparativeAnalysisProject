const {
    Pool
} = require('pg');

const get = require('lodash/get');

process.env['PGUSER'] = 'postgres';
process.env['PGPASSWORD'] = 'admin';

function acknowledgeUser(username, idCallback) {
    const connectionString = 'postgresql://localhost:5432/postgres';
    const pool = new Pool({
        connectionString: connectionString,
    });

    const INSERT_QUERY = `INSERT INTO "user" (username, "avatarUrl") VALUES ($1, $2) RETURNING id;`;

    pool.query(INSERT_QUERY, [
        username,
        'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png'
    ],(err, res) => {
        console.log(err);
        console.dir(res);
        pool.end();
        idCallback(get(res, 'rows[0].id'));
    });
}

function getUserId(username, resultCallback) {
    const connectionString = 'postgresql://localhost:5432/postgres';
    const pool = new Pool({
        connectionString: connectionString,
    });

    const SELECT_QUERY = `SELECT * FROM "user" WHERE username = ($1);`;

    pool.query(SELECT_QUERY, [
        username
    ],(err, res) => {
        console.log(err);
        console.dir(res);
        const result = get(res, 'rows[0].id');

        resultCallback(result);
        pool.end();
    });
}

module.exports = {
    acknowledgeUser,
    getUserId,
};