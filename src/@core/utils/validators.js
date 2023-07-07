import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'

// 👉 Required Validator
export const requiredValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '不能为空'
  
  return !!String(value).trim().length || '不能为空'
}
export const requirednumberoremaliValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '请输入手机号或电子邮箱'
  
  return !!String(value).trim().length || '请输入手机号或电子邮箱'
}
export const requiredemailValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '电子邮箱不能为空'
  
  return !!String(value).trim().length || '电子邮箱不能为空'
}
export const requiredenumberValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '手机号不能为空'
  
  return !!String(value).trim().length || '手机号不能为空'
}
export const requiredepasswordValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '密码不能为空'
  
  return !!String(value).trim().length || '密码不能为空'
}

export const requiredecodeValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '验证码不能为空'
  
  return !!String(value).trim().length || '验证码不能为空'
}

export const requirederuleValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '请勾选同意'
  
  return !!String(value).trim().length || '请勾选同意'
}

export const requirederulesValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '图形码不能为空'
  
  return !!String(value).trim().length || '图形码不能为空'
}
// 👉 Email Validator
export const emailValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || '请输入正确的电子邮箱'
  
  return re.test(String(value)) || '请输入正确的电子邮箱'
}

// 👉 Password Validator
export const passwordValidator = password => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  const validPassword = regExp.test(password)
  
  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
        '密码必须至少包含一个大写、小写、特殊字符和数字，最少 8 个字符')
}
//手机号
export const numberValidator = value => {
  if (isEmpty(value))
  return true
const re = /^1[3|4|5|7|8|9][0-9]{9}$/;
if (Array.isArray(value))
  return value.every(val => re.test(String(val))) ||   '请输入正确的手机号'

return re.test(String(value)) ||   '请输入正确的手机号'
  
      
}

export const numberoremaliValidator = value => {
  if (isEmpty(value))
  return true
const re = /^1[3|4|5|7|8|9][0-9]{9}$/;
const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if (Array.isArray(value))
  return value.every(val => res.test(String(val))) || value.every(val => re.test(String(val))) ||   '请输入正确的手机号或电子邮箱'

return re.test(String(value)) || res.test(String(value)) ||  '请输入正确的手机号或电子邮箱'
  
      
}
// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) => value === target || 'The Confirm Password field confirmation does not match'

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)
  
  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Enter number between ${min} and ${max}`
}

// 👉 Integer Validator
export const integerValidator = value => {
  if (isEmpty(value))
    return true
  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'This field must be an integer'
  
  return /^-?[0-9]+$/.test(String(value)) || 'This field must be an integer'
}

// 👉 Regex Validator
export const regexValidator = (value, regex) => {
  if (isEmpty(value))
    return true
  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)
  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))
  
  return regeX.test(String(value)) || 'The Regex field format is invalid'
}

// 👉 Alpha Validator
export const alphaValidator = value => {
  if (isEmpty(value))
    return true
  
  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

// 👉 URL Validator
export const urlValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  
  return re.test(String(value)) || 'URL is invalid'
}

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value))
    return true
  
  return String(value).length === length || `The Min Character field must be at least ${length} characters`
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = value => {
  if (isEmpty(value))
    return true
  const valueAsString = String(value)
  
  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character are not valid'
}
