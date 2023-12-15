import {AbstractControl} from "@angular/forms";

export interface UserModel {
  username?: AbstractControl<String>;
  email: AbstractControl<String>;
  password: AbstractControl<String>;
}
