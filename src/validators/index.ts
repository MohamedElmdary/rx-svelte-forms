import FormControl, {
    FCE,
    FormControlErrors,
    Validator,
} from "../modules/form_control";
import validator from "validator";
import type { IsFQDNOptions } from "validator/lib/isFQDN";
import { Options } from "validator/lib/isBoolean";
import { IsEmailOptions } from "validator/lib/isEmail";
import { IsURLOptions } from "validator/lib/isURL";

type V<T extends FCE = FCE, O = null> = O extends null
    ? () => Validator<T>
    : (config: O) => Validator<T>;

function createValidator<T extends FCE = FCE, O = null>(
    name: string,
    predicate: (value: T, options: O) => boolean,
    value?: any
): V<T, O> {
    return ((configs: any) => {
        return (ctrl: any) => {
            if (predicate(ctrl, configs)) {
                return {
                    [name]: value || configs,
                };
            }
        };
    }) as unknown as V<T, O>;
}

const c = createValidator;

const _required = (v: any) => v === "" || v === undefined || v === null;
export const required = c("required", _required, true);

const _minLength = (v: string, min: number) => v.length < min;
export const minLength = c<string, number>("minLength", _minLength);

const _maxLength = (v: string, max: number) => v.length > max;
export const maxLength = c<string, number>("maxLength", _maxLength);

// export const isEmail = (options?: IsEmailOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isEmail(ctrl.value, options)) {
//         return `${_if(ctrl.name)} is not a valid email address.`
//     }
// }

// export const isIn = (list: string[]) => <T>(ctrl: FormControl<T>) => {
//     if (!validator.isIn(ctrl.value + "", list)) {
//         return `${_if(ctrl.name)} is not valid.`
//     }
// }

// export const isInt = (options?: validator.IsIntOptions) => <T extends number | string>(ctrl: FormControl<T>) => {
//     if (!validator.isInt(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} must be valid integer.`
//     }
// }

// export const min = (min: number) => (ctrl: FormControl<number>) => {
//     if (ctrl.value < min) {
//         return `${_if(ctrl.name)} min value is ${min}.`
//     }
// }

// export const max = (max: number) => (ctrl: FormControl<number>) => {
//     if (ctrl.value < max) {
//         return `${_if(ctrl.name)} max value is ${max}.`
//     }
// }

// export const requiredTrue = () => (ctrl: FormControl<boolean>) => {
//     if (ctrl.value !== true) {
//         return `${_if(ctrl.name)} is required to be true.`
//     }
// }

// export const isAfter = (date?: string) => <T extends number | string>(ctrl: FormControl<T>) => {
//     if (!validator.isAfter(ctrl.value + "", date)) {
//         return `${_if(ctrl.name)} is not after ${date || Date.now()}.`
//     }
// }

// export type IsAlpha = { locale?: validator.AlphaLocale, options?: validator.IsAlphaOptions }
// export const isAlpha = (config: IsAlpha = {}) => (ctrl: FormControl<string>) => {
//     if (!validator.isAlpha(ctrl.value, config.locale, config.options)) {
//         return `${_if(ctrl.name)} is not alpha.`
//     }
// }

// export type IsAlphanumeric = { locale?: validator.AlphanumericLocale , options?: validator.IsAlphanumericOptions }
// export const isAlphanumeric = (config: IsAlphanumeric = {}) => (ctrl: FormControl<string>) => {
//     if (!validator.isAlphanumeric(ctrl.value, config.locale, config.options)) {
//         return `${_if(ctrl.name)} is not alphanumeric.`
//     }
// }

// export const isAscii = () => <T>(ctrl: FormControl<T>) => {
//     if (!validator.isAscii(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not valid ascii.`
//     }
// }

// export const isBIC = () => <T>(ctrl: FormControl<T>) => {
//     if (!validator.isBIC(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not valid BIC.`
//     }
// }

// export const isBase32 = () => (ctrl: FormControl<string>) => {
//     if (!validator.isBase32(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid Base32.`
//     }
// }

// export const isBase58 = () => (ctrl: FormControl<string>) => {
//     if (!validator.isBase58(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid Base58.`
//     }
// }

// export const isBase64 = () => (ctrl: FormControl<string>) => {
//     if (!validator.isBase64(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid Base64.`
//     }
// }

// export const isBoolean = (options?: Options) => <T extends boolean | string>(ctrl: FormControl<T>) => {
//     if (!validator.isBoolean(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid boolean.`
//     }
// }

// export const isBefore = (date?: string) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isBefore(ctrl.value + "", date)) {
//         return `${_if(ctrl.name)} is not before ${date || Date.now()}.`
//     }
// }

// export const isBtcAddress = () => <T extends string | number>(ctrl:FormControl<T>) => {
//     if (!validator.isBtcAddress(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid btc address.`
//     }
// }

// export const isByteLength = (options?: validator.IsByteLengthOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isByteLength(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not in (UTF-8 Bytes) range.`
//     }
// }

// export const isCreditCard = () => (ctrl: FormControl<string>) => {
//     if (!validator.isCreditCard(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid credit card.`
//     }
// }

// export const isCurrency = (options?: validator.IsCurrencyOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isCurrency(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid currency amount.`
//     }
// }

// export const isDataURI = () => (ctrl: FormControl<string>) => {
//     if (!validator.isDataURI(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid data uri.`
//     }
// }

// export const isDate = (options?: validator.IsDateOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isDate(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid date.`
//     }
// }

// export const isDecimal = (options?: validator.IsDecimalOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isDecimal(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a decimal.`
//     }
// }

// export const isDivisibleBy = (by: number) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isDivisibleBy(ctrl.value + "", by)) {
//         return `${ctrl.value} is not divisible by ${by}`
//     }
// }

// export const isEAN = () => (ctrl: FormControl<string>) => {
//     if (!validator.isEAN(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not EAN.`
//     }
// }

// export const isEmpty = (options?: validator.IsEmptyOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isEmpty(ctrl.value, options)) {
//         return `${_if(ctrl.name)} is not empty.`
//     }
// }

// export const isNotEmpty = (options?: validator.IsEmptyOptions) => (ctrl: FormControl<string>) => {
//     if (validator.isEmpty(ctrl.value, options)) {
//         return `${_if(ctrl.name)} is empty.`
//     }
// }

// export const isEthereumAddress = () => (ctrl: FormControl<string>) => {
//     if (!validator.isEthereumAddress(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid Ethereum address.`
//     }
// }

// export const isFloat = (options?: validator.IsFloatOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isFloat(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a float.`
//     }
// }

// export const isFullWidth = () => (ctrl: FormControl<string>) => {
//     if (!validator.isFullWidth(ctrl.value)) {
//         return `${_if(ctrl.name)} doesn't include any full width chars.`
//     }
// }

// export const isFQDN = (options?: IsFQDNOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isFQDN(ctrl.value, options)) {
//         return `${ctrl.value} is not a valid domain name.`
//     }
// }

// export const isHSL = () => (ctrl: FormControl<string>) => {
//     if (!validator.isHSL(ctrl.value)) {
//         return `${_if(ctrl.name)} is not HSL.`
//     }
// }

// export const isHalfWidth = () => (ctrl: FormControl<string>) => {
//     if (!validator.isHalfWidth(ctrl.value)) {
//         return `${_if(ctrl.name)} doesn't include any half width chars.`
//     }
// }

// export const isHash = (algorithm: validator.HashAlgorithm) => (ctrl: FormControl<string>) => {
//     if (!validator.isHash(ctrl.value, algorithm)) {
//         return `${_if(ctrl.name)} is not a ${algorithm} hash.`
//     }
// }

// export const isHexColor = () => <T extends number | string>(ctrl: FormControl<T>) => {
//     if (!validator.isHexColor(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a hex color.`
//     }
// }

// export const isHexadecimal = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isHexadecimal(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a Hexadecimal`
//     }
// }

// export const isIBAN = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isIBAN(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a IBAN.`
//     }
// }

// export const isIP = (options?: validator.IPVersion) => (ctrl: FormControl<string>) => {
//     if (!validator.isIP(ctrl.value, options)) {
//         return `${_if(ctrl.name)} is not a valid IP.`
//     }
// }

// export const isIPRange = (options?: validator.IPVersion) => (ctrl: FormControl<string>) => {
//     if (!validator.isIPRange(ctrl.value, options)) {
//         return `${_if(ctrl.name)} is not an IP range.`
//     }
// }

// export const isISBN = (options?: validator.ISBNVersion) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISBN(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid ISBN.`
//     }
// }

// export const isISIN = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISIN(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid ISIN.`
//     }
// }

// export const isISO31661Alpha2 = <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISO31661Alpha2(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not an ISO31661Alpha2.`
//     }
// }

// export const isISO31661Alpha3 = <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISO31661Alpha3(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not an ISO31661Alpha3.`
//     }
// }

// export const isISO4217 = <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISO4217(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not an ISO4217.`
//     }
// }

// export const isISO8601 = (options?: validator.IsISO8601Options) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISO8601(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not an ISO8601.`
//     }
// }

// export const isISRC = <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISRC(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not an ISRC.`
//     }
// }

// export const isISSN = (options?: validator.IsISSNOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isISSN(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not an ISSN.`
//     }
// }

// export type IsIdentityCard = "any" | validator.IdentityCardLocale;
// export const isIdentityCard = (options?: IsIdentityCard) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isIdentityCard(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid Identity Card.`
//     }
// }

// export const isJSON = () => (ctrl: FormControl<string>) => {
//     if (!validator.isJSON(ctrl.value)) {
//         return "The provided value is not a valid JSON."
//     }
// }

// export const isJWT = () => (ctrl: FormControl<string>) => {
//     if (!validator.isJWT(ctrl.value)) {
//         return "The provided value is not a valid JWT."
//     }
// }

// export const isLatLong = () => (ctrl: FormControl<string>) => {
//     if (!validator.isLatLong(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid (lat,lng or lat, lng).`
//     }
// }

// export const isLocale = () => (ctrl: FormControl<string>) => {
//     if (!validator.isLocale(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid locale.`
//     }
// }

// export const isLowercase = () => (ctrl:FormControl<string>) => {
//     if (!validator.isLowercase(ctrl.value)) {
//         return `${_if(ctrl.name)} is not lowercase.`
//     }
// }

// export const isMACAddress = (options?: validator.IsMACAddressOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isMACAddress(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid MAC address.`
//     }
// }

// export const isMD5 = () => (ctrl: FormControl<string>) => {
//     if (!validator.isMD5(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not a valid md5 hash.`
//     }
// }

// export const isMagnetURI = () => (ctrl: FormControl<string>) => {
//     if (!validator.isMagnetURI(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a magnet uri.`
//     }
// }

// export const isMimeType = () => (ctrl: FormControl<string>) => {
//     if (!validator.isMimeType(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a mime type.`
//     }
// }

// export type IsMobilePhone = { locale?: "any" | validator.MobilePhoneLocale | validator.MobilePhoneLocale[]; options?: validator.IsMobilePhoneOptions }
// export const isMobilePhone = (config: IsMobilePhone = {}) => (ctrl: FormControl<string>) => {
//     if (!validator.isMobilePhone(ctrl.value + "", config.locale, config.options)) {
//         return `${_if(ctrl.name)} is not valid phone number.`
//     }
// }

// export const isMongoId = () => (ctrl: FormControl<string>) => {
//     if (!validator.isMongoId(ctrl.value)) {
//         return `${_if(ctrl.name)} is not a valid mongo ID.`
//     }
// }

// export const isMultibyte = () => (ctrl: FormControl<string>) => {
//     if (!validator.isMultibyte(ctrl.value)) {
//         return `${_if(ctrl.name)} is not multibte.`
//     }
// }

// export const isNumeric = (options?: validator.IsNumericOptions) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isNumeric(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid numeric value.`
//     }
// }

// export const isOctal = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isOctal(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not octal.`
//     }
// }

// export const isPassportNumber = (countryCode?: string) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isPassportNumber(ctrl.value + "", countryCode)) {
//         return `${_if(ctrl.name)} is not a valid passport number.`
//     }
// }

// export const isPort = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isPort(ctrl.value + "")) {
//         return `${ctrl.value} is not valid port.`
//     }
// }

// export type IsPostalCode = "any" | validator.PostalCodeLocale
// export const isPostalCode = (locale: IsPostalCode) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isPostalCode(ctrl.value + "", locale)) {
//         return `${ctrl.value} is not a valid postal code.`
//     }
// }

// export const isRFC3339 = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isRFC3339(ctrl.value + "")) {
//         return `${ctrl.value} is not RFC3339.`
//     }
// }

// export const isRgbColor = (includePercentValues?: boolean) => (ctrl: FormControl<string>) => {
//     if (!validator.isRgbColor(ctrl.value, includePercentValues)) {
//         return `${ctrl.value} is not a valid RGB color.`
//     }
// }

// export const isSemVer = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isSemVer(ctrl.value + "")) {
//         return `${ctrl.value} is not a valid semantic versioning specification.`
//     }
// }

// export const isSlug = () => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isSlug(ctrl.value + "")) {
//         return `${ctrl.value} is not a valid slug.`
//     }
// }
// export type IsStrongPassword = (validator.StrongPasswordOptions & { returnScore?: false })
// export const isStrongPassword = (options?: IsStrongPassword) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isStrongPassword(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a strong password.`
//     }
// }

// export const isSurrogatePair = () => (ctrl: FormControl<string>) => {
//     if (!validator.isSurrogatePair(ctrl.value + "")) {
//         return `${_if(ctrl.name)} doesn't contain any surrogate pair.`
//     }
// }

// export const isTaxID = (locale?: string) => <T extends string | number>(ctrl: FormControl<T>) => {
//     if (!validator.isTaxID(ctrl.value + "", locale)) {
//         return `${_if(ctrl.name)} is not a valid tax ID.`
//     }
// }

// export const isURL = (options?: IsURLOptions) => (ctrl: FormControl<string>) => {
//     if (!validator.isURL(ctrl.value + "", options)) {
//         return `${_if(ctrl.name)} is not a valid URL.`
//     }
// }

// export const isUUID = (version?:validator.UUIDVersion) => (ctrl: FormControl<string>) => {
//     if (!validator.isUUID(ctrl.value + "", version)) {
//         return `${_if(ctrl.name)} is not a valid UUID.`
//     }
// }

// export const isUppercase = () => (ctrl: FormControl<string>) => {
//     if (!validator.isUppercase(ctrl.value + "")) {
//         return `${_if(ctrl.name)} is not uppercase.`
//     }
// }

// export const isVAT = (countryCode: string) => (ctrl: FormControl<string>) => {
//     if (!validator.isVAT(ctrl.value + "", countryCode)) {
//         return `${_if(ctrl.name)} is not a valid VAT number.`
//     }
// }

// export const isVariableWidth = () => (ctrl: FormControl<string>) => {
//     if (!validator.isVariableWidth(ctrl.value)) {
//         return `${_if(ctrl.name)} doesn't  contain full or half-width chars.`
//     }
// }

// export const isWhitelisted = (chars: string | string[]) => (ctrl: FormControl<string>) => {
//     if (!validator.isWhitelisted(ctrl.value + "", chars)) {
//         return `${ctrl.value} is not whitelisted.`
//     }
// }

// export const isString = () => (ctrl: FormControl<string>) => {
//     if (typeof ctrl.value !== "string") {
//         return `${_if(ctrl.name)} is not a string.`
//     }
// }
