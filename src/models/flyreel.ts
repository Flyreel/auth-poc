export class Flyreel {
  _id: string;
  organizationId: string;
  botId: string;
  internalWorkflow: string;
  status: string;
  integrations: Record<string, any>;
  customFields: Record<string, any>;
}
