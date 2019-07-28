import * as admin from 'firebase-admin';

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

        // this.chat('event-01-bandung', 'message testing');
    }

    public getMessageValue(message: string): any {
        return {
            date: new Date().getTime(),
            message,
            user: {
                address: 'Jl. Mentor no 96, bandung',
                bio: 'Just a regular boiii',
                email: 'syauqiilham28@gmail.com',
                name: 'Syauqi Ilham',
                phoneNumber: '087750480421',
                photo:
                    'https://lh3.googleusercontent.com/a-/AAuE7mAhtyfMDhNvJ3G0rukgsw64qr-7KyKIqPsc0ClAsg',
                username: 'cukil69'
            }
        };
    }

    public chat(event: string, message: string): void {
        const child = this.ref.child(event);
        child.push().set(this.getMessageValue(message));
        this.sendNotification(message);
    }

    public sendNotification(message: string) {
        const res: any = {
            data: {
                user: 'cukil',
                message,
                date: new Date().getTime()
            },
            topic: 'topic-1'
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
