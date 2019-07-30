import { ActivityField } from './interfaces/model.interfaces';
import ActivityTypeModel from './activity-type.model';

export default class ActivityModel {
    public model: ActivityField;

    constructor(param: ActivityField) {
        const { id_activity, activity_name, ...left_variable } = param;

        this.model = {
            id_activity: id_activity || 0,
            activity_name: activity_name || '',
            activity_type: new ActivityTypeModel(left_variable).model
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
