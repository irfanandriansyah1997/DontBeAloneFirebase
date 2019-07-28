import * as admin from 'firebase-admin';
import { UserField } from '../../model/user/interfaces/model.interfaces';

const secret = require('./secret/dont-be-alone.secret.json');

export class FirebaseAdminModule {
    private conf: admin.app.App;

    private database: admin.database.Database;

    private ref: admin.database.Reference;

    constructor() {
        this.conf = admin.initializeApp({
            credential: admin.credential.cert(secret),
            databaseURL: 'https://dont-be-alone-246305.firebaseio.com'
        });
        this.database = this.conf.database();
        this.ref = this.database.ref('database');
    }

    public getMessageValue(message: string, user: UserField): any {
        return {
            date: new Date().getTime(),
            message,
            user
        };
    }

    public chat(event: string, message: string, user: UserField): void {
        const child = this.ref.child(event);
        child.push().set(this.getMessageValue(message, user));
        this.sendNotification(message, event, user.username);
    }

    public sendNotification(message: string, topic: string, username: string) {
        const res: any = {
            data: {
                username,
                message,
                date: `${new Date().getTime()}`
            },
            topic
        };

        this.conf
            .messaging()
            .send(res)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    }
}
