import { Comment, Post, User } from "@prisma/client";
import { ValidationError } from "../errors/validation.error";
import { Validator } from "./validator";

const rules = { 
  content : {
    name : "content",
    rule : /^.{10,}$/,
    message : "Yorum en az 10 karakter olmalıdır"
  }
}

type fieldType = "content";

export class CommentValidator extends Validator {

  comment : Comment;
  fields : fieldType[];

  constructor(comment : Comment, fields : fieldType[] = ["content"]) {
    super();
    this.comment = comment;
    this.fields = fields
  }

  validate() {
    
    const failedFields : {name: string, message: string}[] = [];
    
    for (let field of this.fields) {
      if (!this.comment[field]) failedFields.push({
        name: rules[field].name,
        message: "Bu alan gerekli"
      })
      else if (!this.validateField(this.comment[field], rules[field].rule)) {
        failedFields.push({
          name: rules[field].name,
          message : rules[field].message 
        })
      }
    }

    if (failedFields.length != 0) throw new ValidationError("Yorum doğrulama hatası", failedFields);
  
  }


}