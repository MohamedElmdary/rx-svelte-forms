import { FormControl } from "../modules"
import validator from "validator"
import type { IsFQDNOptions } from "validator/lib/isFQDN"
import { Options } from "validator/lib/isBoolean"
import { IsEmailOptions } from "validator/lib/isEmail"

function createValidator<T>(fn: (ctrl: FormControl<T>) => string | undefined): () => (ctrl: FormControl<T>) => string | null;
function createValidator<T, Q, O = false>(fn: (ctrl: FormControl<T>, config: Q) => string | undefined):
    (O extends true ?
        ((config?: Q) => (ctrl: FormControl<T>) => string | null) :
        ((config: Q) => (ctrl: FormControl<T>) => string | null));
function createValidator(fn: any) {
    return (config?: unknown) => {
        return (ctrl: unknown) => {
            return fn(ctrl, config) || null
        }
    }
}

function _if(name: string | null, v = "value"): string {
    return name || v
}

export const required = createValidator(({ value, name }) => {
    if (value === "" || value === undefined || value === null) {
        return `${_if(name)} is required.`
    }
})

export const minLength = createValidator<string, number>((ctrl, len) => {
    if (ctrl.value.length < len) {
        return `${_if(ctrl.name)} minLength is ${len}.`
    }
})

export const maxLength = createValidator<string, number>((ctrl, len) => {
    if (ctrl.value.length > len) {
        return `${_if(ctrl.name)} maxLength is ${len}.`
    }
})

export const min = createValidator<number, number>((ctrl, val) => {
    if (ctrl.value < val) {
        return `${_if(ctrl.name)} min value is ${val}.`
    }
})

export const max = createValidator<number, number>((ctrl, val) => {
    if (ctrl.value > val) {
        return `${_if(ctrl.name)} max value is ${val}.`
    }
})

export const isAfter = createValidator<unknown, string, true>((ctrl, date) => {
    if (!validator.isAfter(ctrl.value + "", date)) {
        return `${_if(ctrl.name)} is not after ${date || Date.now()}.`
    }
})

export type IsAlpha = { locale?: validator.AlphaLocale, options?: validator.IsAlphaOptions }
export const isAlpha = createValidator<string, IsAlpha, true>((ctrl, config = {}) => {
    if (!validator.isAlpha(ctrl.value, config.locale, config.options)) {
        return `${_if(ctrl.name)} is not alpha.`
    }
})

export type IsAlphanumeric = { locale?: validator.AlphanumericLocale , options?: validator.IsAlphanumericOptions }
export const isAlphanumeric = createValidator<string, IsAlphanumeric, true>((ctrl, config = {}) => {
    if (!validator.isAlphanumeric(ctrl.value, config.locale, config.options)) {
        return `${_if(ctrl.name)} is not alphanumeric.`
    }
})

export const isAscii = createValidator((ctrl) => {
    if (!validator.isAscii(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not valid ascii.`
    }
})

export const isBIC = createValidator((ctrl) => {
    if (!validator.isBIC(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not valid BIC.`
    }
})

export const isBase32 = createValidator<string>((ctrl) => {
    if (!validator.isBase32(ctrl.value)) {
        return `${_if(ctrl.name)} is not a valid Base32.`
    }
})

export const isBase58 = createValidator<string>((ctrl) => {
    if (!validator.isBase58(ctrl.value)) {
        return `${_if(ctrl.name)} is not a valid Base58.`
    }
})

export const isBase64 = createValidator<string>((ctrl) => {
    if (!validator.isBase64(ctrl.value)) {
        return `${_if(ctrl.name)} is not a valid Base64.`
    }
})

export const isBoolean = createValidator<unknown, Options, true>((ctrl, options) => {
    if (!validator.isBoolean("", options)) {
        return `${_if(ctrl.name)} is not a valid boolean.`
    }
})

export const isBefore = createValidator<unknown, string, true>((ctrl, date) => {
    if (!validator.isBefore(ctrl.value + "", date)) {
        return `${_if(ctrl.name)} is not before ${date || Date.now()}.`
    }
})

export const isBtcAddress = createValidator((ctrl) => {
    if (!validator.isBtcAddress(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a valid btc address.`
    }
})

export const isByteLength = createValidator<unknown, validator.IsByteLengthOptions, true>((ctrl, options) => {
    if (!validator.isByteLength(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not in (UTF-8 Bytes) range.`
    }
})

export const isCreditCard = createValidator((ctrl) => {
    if (!validator.isCreditCard(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a valid credit card.`
    }
})

export const isCurrency = createValidator<unknown, validator.IsCurrencyOptions, true>((ctrl, options) => {
    if (!validator.isCurrency(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a valid currency amount.`
    }
})

export const isDataURI = createValidator((ctrl) => {
    if (!validator.isDataURI(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a valid data uri.`
    }
})

export const isDate = createValidator<unknown, validator.IsDateOptions, true>((ctrl, options) => {
    if (!validator.isDate(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a valid date.`
    }
})

export const isDecimal = createValidator<unknown, validator.IsDecimalOptions, true>((ctrl, options) => {
    if (!validator.isDecimal(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a decimal.`
    }
})

export const isDivisibleBy = createValidator<unknown, number>((ctrl, num) => {
    if (!validator.isDivisibleBy(ctrl.value + "", num)) {
        return `${ctrl.value} is not divisible by ${num}`
    }
})

export const isEAN = createValidator((ctrl) => {
    if (!validator.isEAN(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not EAN.`
    }
})

export const isEmail = createValidator<string, IsEmailOptions, true>((ctrl, options) => {
    if (!validator.isEmail(ctrl.value, options)) {
        return `${_if(ctrl.name)} is not a valid email address.`
    }
})

export const isEmpty = createValidator<string, validator.IsEmptyOptions, true>((ctrl, options) => {
    if (!validator.isEmpty(ctrl.value, options)) {
        return `${_if(ctrl.name)} is not empty.`
    }
})

export const isNotEmpty = createValidator<string, validator.IsEmptyOptions, true>((ctrl, options) => {
    if (validator.isEmpty(ctrl.value, options)) {
        return `${_if(ctrl.name)} is empty.`
    }
})

export const isEthereumAddress = createValidator<string>((ctrl) => {
    if (!validator.isEthereumAddress(ctrl.value)) {
        return `${_if(ctrl.name)} is not a valid Ethereum address.`
    }
})

export const isFloat = createValidator<unknown, validator.IsFloatOptions, true>((ctrl, options) => {
    if (!validator.isFloat(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a float.`
    }
})

export const isFullWidth = createValidator<string>((ctrl) => {
    if (!validator.isFullWidth(ctrl.value)) {
        return `${_if(ctrl.name)} doesn't include any full width chars.`
    }
})

export const isFQDN = createValidator<string, IsFQDNOptions, true>((ctrl, options) => {
    if (!validator.isFQDN(ctrl.value, options)) {
        return `${ctrl.value} is not a valid domain name.`
    }
})

export const isHSL = createValidator<string>((ctrl) => {
    if (!validator.isHSL(ctrl.value)) {
        return `${_if(ctrl.name)} is not HSL.`
    }
})

export const isHalfWidth = createValidator<string>((ctrl) => {
    if (!validator.isHalfWidth(ctrl.value)) {
        return `${_if(ctrl.name)} doesn't include any half width chars.`
    }
})

export const isHash = createValidator<string, validator.HashAlgorithm>((ctrl, algorithm) => {
    if (!validator.isHash(ctrl.value, algorithm)) {
        return `${_if(ctrl.name)} is not a ${algorithm} hash.`
    }
})

export const isHexColor = createValidator((ctrl) => {
    if (!validator.isHexColor(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a hex color.`
    }
})

export const isHexadecimal = createValidator((ctrl) => {
    if (!validator.isHexadecimal(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a Hexadecimal`
    }
})

export const isIBAN = createValidator((ctrl) => {
    if (!validator.isIBAN(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a IBAN.`
    }
})

export const isIP = createValidator<string, validator.IPVersion, true>((ctrl, options) => {
    if (!validator.isIP(ctrl.value, options)) {
        return `${_if(ctrl.name)} is not a valid IP.`
    }
})

export const isIPRange = createValidator<string, validator.IPVersion, true>((ctrl, options) => {
    if (!validator.isIPRange(ctrl.value, options)) {
        return `${_if(ctrl.name)} is not an IP range.`
    }
})

export const isISBN = createValidator<unknown, validator.ISBNVersion, true>((ctrl, options) => {
    if (!validator.isISBN(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a valid ISBN.`
    }
})

export const isISIN = createValidator((ctrl) => {
    if (!validator.isISIN(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a valid ISIN.`
    }
})

export const isISO31661Alpha2 = createValidator((ctrl) => {
    if (!validator.isISO31661Alpha2(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not an ISO31661Alpha2.`
    }
})

export const isISO31661Alpha3 = createValidator((ctrl) => {
    if (!validator.isISO31661Alpha3(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not an ISO31661Alpha3.`
    }
})

export const isISO4217 = createValidator((ctrl) => {
    if (!validator.isISO4217(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not an ISO4217.`
    }
})

export const isISO8601 = createValidator<unknown, validator.IsISO8601Options, true>((ctrl, options) => {
    if (!validator.isISO8601(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not an ISO8601.`
    }
})

export const isISRC = createValidator((ctrl) => {
    if (!validator.isISRC(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not an ISRC.`
    }
})

export const isISSN = createValidator<unknown, validator.IsISSNOptions, true>((ctrl, options) => {
    if (!validator.isISSN(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not an ISSN.`
    }
})

export const isIdentityCard = createValidator<unknown, "any" | validator.IdentityCardLocale, true>((ctrl, options) => {
    if (!validator.isIdentityCard(ctrl.value + "", options)) {
        return `${_if(ctrl.name)} is not a valid Identity Card.`
    }
})

export const isIn = createValidator<unknown, string[]>((ctrl, list) => {
    if (!validator.isIn(ctrl.value + "", list)) {
        return `${_if(ctrl.name)} is not valid.`
    }
})

export const isInt = createValidator<number, validator.IsIntOptions, true>((ctrl, options) => {
    if (!validator.isInt(ctrl.value.toString(), options)) {
        return `${_if(ctrl.name)} must be valid integer.`
    }
})

export const isJSON = createValidator<string>((ctrl) => {
    if (!validator.isJSON(ctrl.value)) {
        return "The provided value is not a valid JSON."
    }
})

export const isJWT = createValidator<string>((ctrl) => {
    if (!validator.isJWT(ctrl.value)) {
        return "The provided value is not a valid JWT."
    }
})

export const isLatLong = createValidator<string>((ctrl) => {
    if (!validator.isLatLong(ctrl.value)) {
        return `${_if(ctrl.name)} is not a valid (lat,lng or lat, lng).`
    }
})

export const isLocale = createValidator((ctrl) => {
    if (!validator.isLocale(ctrl.value + "")) {
        return `${_if(ctrl.name)} is not a valid locale.`
    }
})
