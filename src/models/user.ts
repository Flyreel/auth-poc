export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizations: UserOrganization[];
  isAdmin: boolean;
  carrier: string;
}

export class UserOrganization {
  _id: string;
  name: string;
  roles: OrganzationRole[];
}

export class OrganzationRole {
  _id: string;
  name: string;
  permissions: string[];
}
