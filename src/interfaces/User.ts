import {IPermission} from "@/interfaces/roles";

export interface User {
    featureGated?: any;
    permissions?: IPermission[];
    webId: number;
    name: string;
    email: string;
    address: string;
    phoneNumber: string | number;
    password: string;
    rate: number
}

export interface TeamMember {
    name: string;
    email: string;
    role: string;
    active: boolean;
    phoneNumber: string;
    hours: string;
    password: string;
    newPassword: string;
}
