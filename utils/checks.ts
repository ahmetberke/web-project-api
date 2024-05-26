export const CheckIsValidObjectId = (val : string) : boolean => {
  return val.match(/^[a-f\d]{24}$/) !== null
}