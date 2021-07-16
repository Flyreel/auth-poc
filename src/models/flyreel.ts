export class Flyreel {
  constructor(
    private _id: string,
    private organizationId: string,
    private botId: string,
    private status: string,
    private expiration: Date, // private internalWorkflow: string, // private integrations: Record<string, any>, // private customFields: Record<string, any>,
  ) {}
}
