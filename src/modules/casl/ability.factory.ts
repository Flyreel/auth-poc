import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, UserOrganization } from 'src/models/user';
import { permissionsMap } from '../../constants';

@Injectable()
export class CaslAbilityFactory {
  defineAbilitiesFor(user: User, organizationId: string) {
    const { can, build } = new AbilityBuilder(Ability);

    const userOrganizations = user.organizations.filter(
      (o) => o._id === organizationId,
    ) as UserOrganization[];

    if (userOrganizations?.length) {
      const permissionSet = new Set(
        userOrganizations.reduce((accu: string[], org: UserOrganization) => {
          org.roles.forEach((role) => {
            accu = accu.concat(role.permissions);
          });
          return accu;
        }, [] as string[]),
      );

      if (permissionSet.size) {
        permissionSet.forEach((p) => {
          const { actions, subjects, conditions, fields } = permissionsMap[p];

          if (actions?.length) {
            if (subjects?.length) {
              subjects.forEach((subject) => {
                if (fields?.length && conditions?.length) {
                  conditions.forEach((condition) => {
                    can(actions, subject, fields, condition);
                  });
                } else if (fields?.length) {
                  can(actions, subject, fields);
                } else if (conditions?.length) {
                  conditions.forEach((condition) => {
                    can(actions, subject, condition);
                  });
                } else {
                  can(actions, subject);
                }
              });
            }
          }
        });
      }
    }

    return build();
  }
}
