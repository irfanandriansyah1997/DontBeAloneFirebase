import { ActivityTypeField } from './interfaces/model.interfaces';

export default class ActivityTypeModel {
    public model: ActivityTypeField;

    constructor(param: any) {
        const { detail, icon, id_activity_type, marker_icon, type } = param;

        this.model = {
            detail,
            icon,
            id_activity_type,
            marker_icon,
            type
        };
    }
}
