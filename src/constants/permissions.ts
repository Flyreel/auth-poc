export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const permissionsMap = {
  'flyreel:manage': {
    actions: [Action.Manage],
    subjects: ['Flyreel'],
  },
  'flyreel:read': {
    actions: [Action.Read],
    subjects: ['Flyreel'],
    conditions: [{ status: 'started', expiration: { $gt: new Date() } }],
    fields: ['status', 'botId'],
  },
  'flyreel:update': {
    actions: [Action.Update],
    subjects: ['Flyreel'],
    conditions: [],
    fields: ['status', 'botId'],
  },
  'flyreel:create': {
    actions: [Action.Create],
    subjects: ['Flyreel'],
    conditions: [],
    fields: [],
  },
  'flyreel:delete': {
    actions: [Action.Delete],
    subjects: ['Flyreel'],
    conditions: [],
    fields: [],
  },
};
