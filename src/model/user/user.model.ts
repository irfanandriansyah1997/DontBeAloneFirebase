import { UserField } from './interfaces/model.interfaces';

export default class UserModel {
    public model: UserField;

    constructor(param: UserField) {
        const {
            username,
            email,
            name,
            password,
            photo,
            fb_id,
            tw_id,
            gp_id,
            phone_number,
            address,
            bio
        } = param;

        this.model = {
            username: username || '',
            email: email || '',
            name: name || '',
            password: password || '',
            photo: photo || '',
            fb_id: fb_id || '',
            tw_id: tw_id || '',
            gp_id: gp_id || '',
            phone_number: phone_number || '',
            address: address || '',
            bio: bio || ''
        };
    }

    public get field_username(): string {
        return this.model.username;
    }

    public set field_username(username: string) {
        this.model.username = username;
    }

    public get field_email(): string {
        return this.model.email;
    }

    public set field_email(email: string) {
        this.model.email = email;
    }

    public get field_name(): string {
        return this.model.name;
    }

    public set field_name(name: string) {
        this.model.name = name;
    }

    public get field_password(): string {
        return this.model.password;
    }

    public set field_password(password: string) {
        this.model.password = password;
    }

    public get field_photo(): string {
        return this.model.photo;
    }

    public set field_photo(photo: string) {
        this.model.photo = photo;
    }

    public get field_fb_id(): string {
        return this.model.fb_id;
    }

    public set field_fb_id(fb_id: string) {
        this.model.fb_id = fb_id;
    }

    public get field_tw_id(): string {
        return this.model.tw_id;
    }

    public set field_tw_id(tw_id: string) {
        this.model.tw_id = tw_id;
    }

    public get field_gp_id(): string {
        return this.model.gp_id;
    }

    public set field_gp_id(gp_id: string) {
        this.model.gp_id = gp_id;
    }

    public get field_phone_number(): string {
        return this.model.phone_number || '';
    }

    public set field_phone_number(phone_number: string) {
        this.model.phone_number = phone_number;
    }

    public get field_address(): string {
        return this.model.address;
    }

    public set field_address(address: string) {
        this.model.address = address;
    }

    public get field_bio(): string {
        return this.model.bio || '';
    }

    public set field_bio(bio: string) {
        this.model.bio = bio;
    }
}
