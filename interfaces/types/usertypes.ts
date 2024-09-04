// interfaces\types\usertypes.ts
import { todoType } from "./todoTypes";

export interface userType {
  id : string;
  name : string;
  email : string;
  hashedPassword : string;
  image : string;
  emailVerified : Date;
  todos : todoType[];
  createdAt : Date;
  updatedAt : Date;
}
  