
import { Department } from "./Department.model";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    salary?: number;
    position?: string;
    country?: string;
    phoneNumber?: string;
    email?: string;
   
    department?: Department;
    departmentName?: string;
  }
  
  