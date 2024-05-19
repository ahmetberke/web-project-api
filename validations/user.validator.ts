import { User } from "@prisma/client";
import { ValidationError } from "../errors/validation.error";
import { Validator } from "./validator";

const rules = { 
  email : {
    name : "email",
    rule : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message : "Lütfen geçerli bir e-posta giriniz."
  },
  username : {
    name : "username",
    rule : /^.{5,16}$/,
    message : "Kullanıcı adı 5 ile 16 karakter arasında olmalıdır."
  },
  password : {
    name : "password",
    rule : /^.{10,}$/,
    message : "Şifre en az 10 karakter olmalıdır"
  },
  fullname : {
    name : "fullname",
    rule : /^.{6,}$/,
    message : "Tam adınız en az 6 karakter olmalıdır"
  }
}

type fieldType = "email" | "username" | "password" | "fullname";

export class UserValidator extends Validator {

  user : User;
  fields : fieldType[];

  constructor(user : User, fields : fieldType[] = ["email", "username", "password", "fullname"]) {
    super();
    this.user = user;
    this.fields = fields
  }

  validate() {
    
    const failedFields : {name: string, message: string}[] = [];
    
    for (let field of this.fields) {
      if (!this.user[field]) failedFields.push({
        name: rules[field].name,
        message: "Bu alan gerekli"
      })
      else if (!this.validateField(this.user[field], rules[field].rule)) {
        failedFields.push({
          name: rules[field].name,
          message : rules[field].message 
        })
      }
    }

    if (failedFields.length != 0) throw new ValidationError("user validation error", failedFields);
  
  }


}