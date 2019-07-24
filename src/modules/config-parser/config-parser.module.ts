import * as path from 'path';

export class ConfigParserModule {
    private config: any;

    constructor(config: string) {
        const file = require(path.join(__dirname, '../../../', config));
        this.config = file;
    }

    get(section: string, key?: string): string | number | any {
        if (key) {
            return this.config[section][key];
        }

        return this.config[section];
    }

    sections(): string[] {
        return Object.keys(this.config);
    }

    getConfig(): any {
        return this.config;
    }
}
