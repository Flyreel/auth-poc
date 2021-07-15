import { Action } from '../modules/casl';

export const permissionsMap = {
  'flyreel:manage': {
    actions: [Action.Manage],
    subjects: ['Flyreel'],
  },
  'flyreel:read': {
    actions: [Action.Read],
    subjects: ['Flyreel'],
  },
  'flyreel:update': {
    actions: [Action.Update],
    subjects: ['Flyreel'],
    contitions: {},
    fields: [],
  },
  'flyreel:create': {
    actions: [Action.Create],
    subjects: ['Flyreel'],
    contitions: {},
    fields: [],
  },
  'flyreel:delete': {
    actions: [Action.Delete],
    subjects: ['Flyreel'],
    contitions: {},
    fields: [],
  },
};
