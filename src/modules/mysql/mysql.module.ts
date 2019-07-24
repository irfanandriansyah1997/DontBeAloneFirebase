import { Pool, createPool, MysqlError, PoolConnection, queryCallback } from 'mysql';

export class MySQLModule {
    private pool_connection: Pool;

    constructor(host: string, user: string, password: string, database: string) {
        this.pool_connection = createPool({
            connectionLimit: 100,
            host,
            user,
            password,
            database
        });
    }

    public getConnection(): this {
        this.pool_connection.getConnection((err: MysqlError, connection: PoolConnection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) connection.release();
        });

        return this;
    }

    public query(query: string, callback: queryCallback): void {
        this.pool_connection.query(query, callback);
    }
}
