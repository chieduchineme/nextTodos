// types/todoTypes.ts;
import { userType } from "./usertypes";

export interface todoVersionType {
  versionNumber: number;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface todoType {
  id: string;
  title: string;
  content: string;
  versions: todoVersionType[]; // Array of version objects
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: userType;
}
