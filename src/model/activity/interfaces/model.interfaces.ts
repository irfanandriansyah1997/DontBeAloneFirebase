export interface ActivityField {
    id_activity: number;
    activity_name?: string;
    activity_type: ActivityTypeField;
    [key: string]: any;
}

export interface ActivityTypeField {
    id_activity_type: number;
    type: string;
    detail: string;
    icon: string;
    marker_icon: string;
}
