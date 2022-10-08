export interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
}

export interface Profile {
    avatar: string
    createdAt: string
    dateOfBirth: String
    fullname: string
    isActive: boolean
    isMale: boolean
    phoneNumber: string
    userId: number
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
    avatar: string
    createdAt: string
    dateOfBirth: String
    fullname: string
    isActive: boolean
    isMale: boolean
    phoneNumber: string
    userId: number
}

export interface CreateStaffInterface {
    loginName: string,
    password: string,
    passwordConfirm: string,
    fullname: string,
    avatar: string,
    dob: Date
    phoneNumber: string,
    isMale: boolean
}