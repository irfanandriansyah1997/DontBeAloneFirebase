import { ActivityField } from './interfaces/model.interfaces';

export default class ActivityModel {
    public model: ActivityField;

    constructor(param: ActivityField) {
        const { id_activity } = param;

        this.model = {
            id_activity: id_activity || 0
        };
    }

    public get field_id_activity(): number {
        return this.model.id_activity;
    }

    public set field_id_activity(id_activity: number) {
        this.model.id_activity = id_activity;
    }

    public get room(): string {
        const { model } = this;

        return `database-${model.id_activity}`;
    }
}
