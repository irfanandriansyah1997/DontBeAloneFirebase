import { Router } from 'express';
import { RouterExtender } from '../modules/express/interfaces/express.interface';
import { MySQLModule } from '../modules/mysql/mysql.module';
import { FirebaseAdminModule } from '../modules/firebase-admin/firebase-admin.modules';

abstract class BaseRouter implements RouterExtender {
    protected database: MySQLModule;

    protected firebase: FirebaseAdminModule;

    constructor(database: MySQLModule, firebase: FirebaseAdminModule) {
        this.database = database;
        this.firebase = firebase;
    }

    abstract extend(router: Router): void;
}

export default BaseRouter;
