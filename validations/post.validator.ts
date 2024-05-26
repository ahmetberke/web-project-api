import { Post, User } from "@prisma/client";
import { ValidationError } from "../errors/validation.error";
import { Validator } from "./validator";

const rules = { 
  title : {
    name : "title",
    rule : /^.{10,}$/,
    message : "Başlık en az 10 karakter olmalıdır"
  },
  description : {
    name : "descriptipn",
    rule : /^.{40,}$/,
    message : "Açıklama an az 40 karakter olmalıdır"
  },
  content : {
    name : "content",
    rule : /^.{200,}$/,
    message : "İçerik metni en az 200 karakter olmalıdır"
  },
}

type fieldType = "title" | "description" | "content";

export class PostValidator extends Validator {

  post : Post;
  fields : fieldType[];

  constructor(post : Post, fields : fieldType[] = ["title", "description", "content"]) {
    super();
    this.post = post;
    this.fields = fields
  }

  validate() {
    
    const failedFields : {name: string, message: string}[] = [];
    
    for (let field of this.fields) {
      if (!this.post[field]) failedFields.push({
        name: rules[field].name,
        message: "Bu alan gerekli"
      })
      else if (!this.validateField(this.post[field], rules[field].rule)) {
        failedFields.push({
          name: rules[field].name,
          message : rules[field].message 
        })
      }
    }

    if (failedFields.length != 0) throw new ValidationError("Post doğrulama hatası", failedFields);
  
  }


}