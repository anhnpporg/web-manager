import { DateLocale } from "ng-zorro-antd/i18n";

export interface Customer {
    userId: number;
    fullname: string;
    phoneNumber: number;
    createdAt: string;
    isActive: boolean;
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
    avatar: string,
    createdAt: string,
    dateOfBirth: String,
    fullname: string,
    isActive: boolean,
    isMale: boolean,
    phoneNumber: string,
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

export interface Brand {
  id: string,
  name: string,
  isActive: boolean,
  createdAt: string,
  createdBy:{
    id: string,
    name: string
  }
}

export interface Shelf {
  id: string,
  name: string,
  isActive: boolean,
  createdAt: string,
  createdBy: {
    id: string,
    name: string
  },
  updatedAt: string,
  updatedBy: string
}

export interface Unit {
  id: string,
  name: string
}

export interface routeOfAdministration {
  id: string,
  name: string
}

export interface ActiveSubstance {
    id: string,
    name: string,
    isActive: boolean,
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    updatedBy: string
}

// export interface CreateMedicine {
//   drugRegistrationNumber: string,
//   name: string,
//   brandId: number,
//   shelfId: number,
//   minimumQuantity: number,
//   stockStrength: number,
//   stockStrengthUnitId: number,
//   routeOfAdministrationId: number,
//   isMedicine: boolean,
//   isConsignment: boolean,
//   activeSubstances: []
// }
