import { Employee } from "./Employee.model";

export interface Department {
    id: number;
    name: string;
    location: string;
    description: string;
    employees?: Employee[];
  }
  