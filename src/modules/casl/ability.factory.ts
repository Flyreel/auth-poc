import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Flyreel } from 'src/models/flyreel';
import { User, UserOrganization } from 'src/models/user';
import { permissionsMap } from '../../constants';

type Subjects = InferSubjects<typeof Flyreel | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  async createForUser(user: User, organizationId: string) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    const userOrganizations = user.organizations.filter(
      (o) => o._id === organizationId,
    ) as UserOrganization[];

    if (userOrganizations?.length) {
      const allPermissions = new Set(
        userOrganizations.reduce((accu: string[], org: UserOrganization) => {
          org.roles.forEach((role) => {
            accu.concat(role.permissions);
          });

          return accu;
        }, [] as string[]),
      );

      if (allPermissions.size) {
        allPermissions.forEach((p) => {
          const { actions, subjects, conditions, fields } = permissionsMap[p];
          if (actions?.length) {
            actions.forEach((action) => {
              if (subjects?.length) {
                subjects.forEach((subject) => {
                  if (fields?.length && conditions?.length) {
                    conditions.forEach((condition) => {
                      can(action, subject, fields, condition);
                    });
                  } else if (fields?.length) {
                    can(action, subject, fields);
                  } else if (conditions?.length) {
                    conditions.forEach((condition) => {
                      can(action, subject, condition);
                    });
                  }
                });
              }
            });
          }
        });
      }
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
