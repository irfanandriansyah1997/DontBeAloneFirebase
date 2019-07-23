import { ExpressHelper } from './src/modules/express/express.modules';

import * as morgan from 'morgan';
import * as path from 'path';

var cors = require('cors');
const port = process.env.PORT || 8080;

const server = new ExpressHelper()
    .withStaticPath(path.join(__dirname, 'static'), 2147483647000)
    .withMiddleware(morgan('dev'))

    .withMiddleware(cors());

/**
 * Set mysql from docker
 */
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: 'mysql',
//     user: 'user',
//     password: 'rahasia123',
//     database: 'appdb'
// });

// con.connect(function(err: any) {
//     if (err) {
//         console.log(err);
//     }
// });

// con.query('SELECT * FROM t_user', function(
//     error: any,
//     rows: any,
//     _: any
// ) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(rows);
//     }
// });

function run(server: ExpressHelper): void {
    server.start(Number(port));
}

run(server);
