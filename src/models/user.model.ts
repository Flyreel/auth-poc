import { Role } from './role.model';

export class User {
  // ...other properties
  id: string;
  roles: Role[];
  isAdmin: boolean;
  carrier: string;
}
