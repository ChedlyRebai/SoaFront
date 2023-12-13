import { Department } from "./Department.model";
import { Image } from "./Image.model";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    salary?: number;
    position?: string;
    country?: string;
    phoneNumber?: string;
    email ?: string;
    image ?: Image;
    images?: Image[];
    department?: Department;
    departmentName?: string;
    imageStr?: string;
  }
  
  