export interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
}

export interface Profile {
    email?: string;
    family_name?: string;
    given_name?: string
    granted_scopes?: string
    hd?: string
    id?: string
    locale?: string
    name?: string
    picture?: string
    verified_email?: boolean
}

export interface ManagerInterface {
    email?: string;
    isAdmin?: boolean;
    user?: {
        id: number,
        fullname: string,
        createDate: string,
        updateDate: string,
        avatar: string,
        phoneNumber: string,
        genderId: number,
        dateOfBirth: string,
        isBan: boolean,
        banDate: string,
        gender: boolean,
    }
}

export interface StaffInterface {
    email: string,
    user: {
        id: number,
        fullname: string,
        createDate: string,
        updateDate: string,
        avatar: string,
        phoneNumber: string,
        genderId: number,
        dateOfBirth: string,
        isBan: boolean,
        banDate: string,
        gender: boolean,
    }
}