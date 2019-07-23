import { ExpressHelper } from './src/modules/express/express.modules';

import * as morgan from 'morgan';
import * as path from 'path';

var cors = require('cors');
const port = process.env.PORT || 8080;

const server = new ExpressHelper()
    .withStaticPath(path.join(__dirname, 'static'), 2147483647000)
    .withMiddleware(morgan('dev'))

    .withMiddleware(cors());

function run(server: ExpressHelper): void {
    server.start(Number(port));
}

run(server);
