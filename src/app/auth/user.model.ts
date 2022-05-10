export class User {
  constructor(
    public email: string,
    public id: string,
    public token: string,
    private tokenExpirationData: Date
  ) {}

  get tokenValid() {
    if (!this.tokenExpirationData || new Date() > this.tokenExpirationData) {
      return null;
    }
    return this.token;
  }
}
