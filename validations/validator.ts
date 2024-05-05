export abstract class Validator {
  
    protected validateField(value : string, rule : RegExp) : boolean {
      return value.match(rule) !== null;
    }
  
  }