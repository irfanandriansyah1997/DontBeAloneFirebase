import { Router } from 'express';
import { RouterExtender } from '../modules/express/interfaces/express.interface';
import { MySQLModule } from '../modules/mysql/mysql.module';

abstract class BaseRouter implements RouterExtender {
    protected database: MySQLModule;

    constructor(database: MySQLModule) {
        this.database = database;
    }

    abstract extend(router: Router): void;
}

export default BaseRouter;
