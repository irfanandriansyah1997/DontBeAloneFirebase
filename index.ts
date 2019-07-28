import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { ExpressModule } from './src/modules/express/express.modules';
import { ConfigParserModule } from './src/modules/config-parser/config-parser.module';

import ChatRouter from './src/router/chat/chat.router';
import { MySQLModule } from './src/modules/mysql/mysql.module';
import { FirebaseAdminModule } from './src/modules/firebase-admin/firebase-admin.modules';

var cors = require('cors');

class App {
    config: ConfigParserModule = new ConfigParserModule('./config.json');
    express: any = {};

    constructor() {
        const { options } = this;

        this.express = {
            ...options
        };
    }

    get options(): any {
        return {
            port: this.config.get('main', 'port') || 8080,
            host: this.config.get('main', 'host')
        };
    }

    public run(): void {
        const { port } = this.express;
        const database: MySQLModule = new MySQLModule(
            this.config.get('database', 'host'),
            this.config.get('database', 'user'),
            this.config.get('database', 'password'),
            this.config.get('database', 'database')
        );
        const firebase: FirebaseAdminModule = new FirebaseAdminModule();

        new ExpressModule()
            .withStaticPath(path.join(__dirname, 'static'), 2147483647000)
            .withMiddleware(morgan('dev'))
            .withMiddleware(cors())
            .withMiddleware(bodyParser.json())
            .withMiddleware(
                bodyParser.urlencoded({
                    extended: true
                })
            )
            .extendRouter(new ChatRouter(database, firebase))
            .start(port);
    }
}

new App().run();
