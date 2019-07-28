import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import BaseRouter from '../base.router';
import { MysqlError, FieldInfo } from 'mysql';
import { ChatFieldDatabase } from './interfaces/router.interface';
import UserModel from '../../model/user/user.model';
import { UserField } from '../../model/user/interfaces/model.interfaces';
import ActivityModel from '../../model/activity/activity.model';
import { ActivityField } from '../../model/activity/interfaces/model.interfaces';

export default class ChatRouter extends BaseRouter {
    extend(router: Router) {
        router.route('/chat').post((req: Request, res: Response, next: NextFunction) => {
            const { username, activity_id, message } = req.body;

            this.database.query(
                `SELECT u.*, t.*
                FROM appdb.t_user AS u
                INNER JOIN t_activity_user tu ON tu.username = u.username
                INNER JOIN t_activity t ON t.id_activity = tu.id_activity
                where u.username="${username}" and t.id_activity=${activity_id}`,
                (err: MysqlError | null, results: ChatFieldDatabase[], fields?: FieldInfo[]) => {
                    if (err) {
                        res.status(500);
                        res.send(err.message);
                    } else if (results.length > 0) {
                        const user = new UserModel(<UserField>results[0]);
                        const { room } = new ActivityModel(<ActivityField>results[0]);

                        this.firebase.chat(room, message, user.model);

                        if (res) {
                            res.send(
                                JSON.stringify({
                                    success: true,
                                    status: 200,
                                    message: 'Success'
                                })
                            );
                        }
                    }
                }
            );
        });

        router.route('/room').get(async (req: Request, res: Response, next: NextFunction) => {
            this.database.query(
                `SELECT t.*
                FROM appdb.t_activity AS t
                INNER JOIN t_activity_user tu ON tu.id_activity = t.id_activity
                INNER JOIN t_user u ON u.username = tu.username
                where u.username="hellyeah"`,
                (err: MysqlError | null, results: ChatFieldDatabase[], fields?: FieldInfo[]) => {
                    if (err) {
                        res.status(500);
                        res.send(err.message);
                    } else if (results.length > 0) {
                        results.map(async (item: ActivityField) => {
                            const { room } = new ActivityModel(<ActivityField>item);

                            let res = await axios.get(
                                `https://dont-be-alone-246305.firebaseio.com/database/${room}.json?limitToLast=1&orderBy="$key"`
                            );

                            console.log(room);
                            console.log(res.data);
                        });

                        if (res) {
                            res.send(
                                JSON.stringify({
                                    status: 200,
                                    message: 'Success'
                                })
                            );
                        }
                    }
                }
            );
        });
    }
}
