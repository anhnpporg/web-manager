import { DateLocale } from "ng-zorro-antd/i18n";

export interface Customer {
    userId: number;
    fullName: string;
    phoneNumber: number;
    createdAt: string;
    isActive: boolean;
}

export interface InfoCustomer {
  items:[{
    id: number
    fullName: string
    totalPoint: number
    phoneNumber: number
    createdAt: string
    createBy: string
    isActive: boolean
    updatedAt: string
    updatedBy: string
  }],
  pageSize:number
  totalRecords: number
  pageCount: number
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

export interface Medicine {
  id: number,
  drugRegistrationNumber: string,
  barcode: string,
  name: string,
  brand:{
    id: number,
    name: string
  },
  shelf:{
    id: number,
    name: string
  },
  routeOfAdministration:{
    id: number,
    name: string
  },
  mininumInventory: number,//mức tồn kho tối thiểu
  isUseDose: boolean,// bán theo liều
  isManagedInBatches: boolean, // quản lý theo lô, hạn sử dụng
  isActive: boolean,
  createdAt: string,
  createdBy: {
    id: number,
    name: string
  },
  updatedAt: string,
  updatedBy: string,
  activeSubstances:[],
  productUnits: []
}

export interface CreateMedicine {
  drugRegistrationNumber: string,//số đăng kí
  name: string,// tên thuốc
  brandId: number,// mã nhà sản xuất
  shelfId: number,// mã kệ thuốc
  minimumQuantity: number,//mức tồn kho tối thiểu
  routeOfAdministrationId: number, // đường dùng
  isUseDose: boolean,// bán theo liều
  isManagedInBatches: boolean, // quản lý theo lô, hạn sử dụng
  activeSubstances:[], // hoạt chất
  unit: string, // đơn vị cơ sở
  price: number, // giá bán
  isPackingSpecification: boolean,// hiển thị quy cách đóng gói
  isDoseBasedOnBodyWeightUnit: boolean,// đơn vị liều dùng
  productUnits:{
    unit: string,
    conversionValue: number,// giá trị quy đổi
    price: number,
    isPackingSpecification: boolean,
    isDoseBasedOnBodyWeightUnit: boolean,
  }
}

export interface Supplier{
  id: string
  name: string
  isActive: boolean
  createdAt: string
  createBy: {
    id: string
    name: string
  }
  updatedAt: string
  updatedBy: string
}

export interface GoodReceiptNote{
  id: string
  goodsReceiptNoteType:{
    id: string
    name: string
  }
  batch:{
    id: string
    barcode: string
    manufacturingDate: string
    expiryDate: string
  }
  invoiceId: string
  supplier: {
    id: string
    name: string
  }
  quantity: number
  unit: string
  totalPrice: number
  convertedQuantity: number
  baseUnitPrice: number
  createdAt: string
  createdBy: {
    id: string
    name: string
  }
  note:[]
}
