export class User {
  username: string
  email: string
  password: string

  constructor(form: any) {
    this.username = form.username;
    this.email = form.email;
    this.password = form.password;
  }
}
