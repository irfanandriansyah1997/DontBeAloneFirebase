import * as express from 'express';
import { Response } from 'express';
import * as http from 'http';
import { Application, RequestHandler } from 'express';
import { RouterExtender } from './interfaces/express.interface';

export class ExpressHelper {
    public app: Application;
    public server: http.Server;
    public requestHandlerMiddlewares: RequestHandler[];
    private routerExtenders: RouterExtender[];

    constructor() {
        this.app = express();
        this.server = new http.Server(this.app);
        this.routerExtenders = [];
        this.requestHandlerMiddlewares = [];
    }

    public withMiddleware(middleware: RequestHandler): this {
        this.requestHandlerMiddlewares.push(middleware);
        return this;
    }

    private implementMiddlewares(): void {
        this.requestHandlerMiddlewares.forEach(
            (middleware: RequestHandler) => {
                this.app.use(middleware);
            }
        );
    }

    public withStaticPath(path: string, maxAge: number): this {
        this.withMiddleware(
            express.static(path, {
                maxAge,
                setHeaders(res: Response) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                }
            })
        );

        return this;
    }

    private getRoutes(): void {
        let router = express.Router();
        this.routerExtenders.forEach((re) => re.extend(router));
        this.app.use('/', router);
    }

    public extendRouter(route: RouterExtender): this {
        this.routerExtenders.push(route);
        return this;
    }

    public start(port: number) {
        this.implementMiddlewares();
        this.getRoutes();

        if (port) {
            this.server.listen(port, () => {
                console.info(
                    `\n==> 💻  Open http://0.0.0.0:${port} in a browser to view the app.`
                );
            });
        } else {
            console.error(
                '==>     ERROR: No PORT environment variable has been specified'
            );
        }
    }
}
