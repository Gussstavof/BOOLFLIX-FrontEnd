import {AbstractControl} from "@angular/forms";

export interface User {
  username?: AbstractControl<String>;
  email: AbstractControl<String>;
  password: AbstractControl<String>;
}
