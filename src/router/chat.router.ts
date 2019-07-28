import { Router, Request, Response, NextFunction } from 'express';
import BaseRouter from './base.router';
import { MysqlError, FieldInfo } from 'mysql';

export default class ChatRouter extends BaseRouter {
    extend(router: Router) {
        router.route('/chat').get((req: Request, res: Response, next: NextFunction) => {
            this.firebase.chat('bandung-01', 'testing cuy');

            this.database.query(
                'SELECT * FROM t_user',
                (err: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
                    if (err) {
                        res.status(500);
                        res.send(err.message);
                    } else {
                        res.send(JSON.stringify(results));
                    }
                }
            );
        });
    }
}
