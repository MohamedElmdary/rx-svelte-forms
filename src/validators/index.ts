import utils from "../utils";
import FormControl, { FCE } from "../modules/form_control";
import validator from "validator";
import type { IsFQDNOptions } from "validator/lib/isFQDN";
import { Options } from "validator/lib/isBoolean";
import { IsEmailOptions } from "validator/lib/isEmail";
import { IsURLOptions } from "validator/lib/isURL";

const str = utils.toString;

export function required(msg: string) {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (value === "" || value === undefined || value === null) {
            return { message: msg, required: true };
        }
    };
}

export function minLength(msg: string, min: number) {
    return ({ value }: FormControl<string>) => {
        if (str(value).length < min) {
            return { message: msg, minLength: min };
        }
    };
}

export function maxLength(msg: string, max: number) {
    return ({ value }: FormControl<string>) => {
        if (str(value).length > max) {
            return { message: msg, maxLength: max };
        }
    };
}

export function isEmail(msg: string, options?: IsEmailOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEmail(str(value), options)) {
            return { message: msg, isEmail: options || true };
        }
    };
}

export function isIn(msg: string, list: string[]) {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isIn(str(value), list)) {
            return { message: msg, isIn: list };
        }
    };
}

export function isInt(msg: string, options?: validator.IsIntOptions) {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isInt(str(value), options)) {
            return { message: msg, isInt: options || true };
        }
    };
}

export function min(msg: string, min: number) {
    return ({ value }: FormControl<number>) => {
        if (value < min) {
            return { message: msg, min };
        }
    };
}

export function max(msg: string, max: number) {
    return ({ value }: FormControl<number>) => {
        if (value > max) {
            return { message: msg, max };
        }
    };
}

export function requiredTrue(msg: string) {
    return ({ value }: FormControl<boolean>) => {
        if (value !== true) {
            return { message: msg, requiredTrue: true };
        }
    };
}

export function isAfter(msg: string, date?: string) {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isAfter(str(value), date)) {
            return { message: msg, isAfter: date || true };
        }
    };
}

export interface IsAlpha {
    locale?: validator.AlphaLocale;
    options?: validator.IsAlphaOptions;
}
export function isAlpha(msg: string, config: IsAlpha = {}) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isAlpha(str(value), config.locale, config.options)) {
            return { message: msg, isAlpha: config };
        }
    };
}

export interface IsAlphanumeric {
    locale?: validator.AlphanumericLocale;
    options?: validator.IsAlphanumericOptions;
}
export function isAlphanumeric(msg: string, config: IsAlphanumeric = {}) {
    const { locale, options } = config;
    return ({ value }: FormControl<string>) => {
        if (!validator.isAlphanumeric(str(value), locale, options)) {
            return { message: msg, isAlphanumeric: config };
        }
    };
}

export function isAscii(msg: string) {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isAscii(str(value))) {
            return { message: msg, isAscii: true };
        }
    };
}

export function isBIC(msg: string) {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isBIC(str(value))) {
            return { message: msg, isBIC: true };
        }
    };
}

export function isBase32(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase32(str(value))) {
            return { message: msg, isBase32: true };
        }
    };
}

export function isBase58(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase58(str(value))) {
            return { message: msg, isBase58: true };
        }
    };
}

export function isBase64(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase64(str(value))) {
            return { message: msg, isBase64: true };
        }
    };
}

export function isBoolean(msg: string, options?: Options) {
    return <T extends boolean | string>({ value }: FormControl<T>) => {
        if (!validator.isBoolean(str(value), options)) {
            return { message: msg, isBoolean: options || true };
        }
    };
}

export function isBefore(msg: string, date?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isBefore(str(value), date)) {
            return { message: msg, isBefore: date || true };
        }
    };
}

export function isBtcAddress(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isBtcAddress(str(value))) {
            return { message: msg, isBtcAddress: true };
        }
    };
}

export function isByteLength(
    msg: string,
    options?: validator.IsByteLengthOptions
) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isByteLength(str(value), options)) {
            return { message: msg, isByteLength: options || true };
        }
    };
}

export function isCreditCard(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isCreditCard(str(value))) {
            return { message: msg, isCreditCard: true };
        }
    };
}

export function isCurrency(msg: string, options?: validator.IsCurrencyOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isCurrency(str(value), options)) {
            return { message: msg, isCurrency: options || true };
        }
    };
}

export function isDataURI(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isDataURI(str(value))) {
            return { message: msg, isDataURI: true };
        }
    };
}

export function isDate(msg: string, options?: validator.IsDateOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDate(str(value), options)) {
            return { message: msg, isDate: options || true };
        }
    };
}

export function isDecimal(msg: string, options?: validator.IsDecimalOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDecimal(str(value), options)) {
            return { message: msg, isDecimal: options || true };
        }
    };
}

export function isDivisibleBy(msg: string, by: number) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDivisibleBy(str(value), by)) {
            return { message: msg, isDivisibleBy: by };
        }
    };
}

export function isEAN(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEAN(str(value))) {
            return { message: msg, isEAN: true };
        }
    };
}

export function isEmpty(msg: string, options?: validator.IsEmptyOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEmpty(str(value), options)) {
            return { message: msg, isEmpty: options || true };
        }
    };
}

export function isNotEmpty(msg: string, options?: validator.IsEmptyOptions) {
    return ({ value }: FormControl<string>) => {
        if (validator.isEmpty(str(value), options)) {
            return { message: msg, isNotEmpty: options || true };
        }
    };
}

export function isEthereumAddress(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEthereumAddress(str(value))) {
            return { message: msg, isEthereumAddress: true };
        }
    };
}

export function isFloat(msg: string, options?: validator.IsFloatOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isFloat(str(value), options)) {
            return { message: msg, isFloat: options || true };
        }
    };
}

export function isFullWidth(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isFullWidth(str(value))) {
            return { message: msg, isFullWidth: true };
        }
    };
}

export function isFQDN(msg: string, options?: IsFQDNOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isFQDN(value, options)) {
            return { message: msg, isFQDN: options || true };
        }
    };
}

export function isHSL(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHSL(str(value))) {
            return { message: msg, isHSL: true };
        }
    };
}

export function isHalfWidth(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHalfWidth(str(value))) {
            return { message: msg, isHalfWidth: true };
        }
    };
}

export function isHash(msg: string, algorithm: validator.HashAlgorithm) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHash(str(value), algorithm)) {
            return { message: msg, isHash: algorithm };
        }
    };
}

export function isHexColor(msg: string) {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isHexColor(str(value))) {
            return { message: msg, isHexColor: true };
        }
    };
}

export function isHexadecimal(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isHexadecimal(str(value))) {
            return { message: msg, isHexadecimal: true };
        }
    };
}

export function isIBAN(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isIBAN(str(value))) {
            return { message: msg, isIBAN: true };
        }
    };
}

export function isIP(msg: string, options?: validator.IPVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isIP(str(value), options)) {
            return { message: msg, isIP: options || true };
        }
    };
}

export function isIPRange(msg: string, options?: validator.IPVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isIPRange(str(value), options)) {
            return { message: msg, isIPRange: options || true };
        }
    };
}

export function isISBN(msg: string, options?: validator.ISBNVersion) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISBN(str(value), options)) {
            return { message: msg, isISBN: options || true };
        }
    };
}

export function isISIN(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISIN(str(value))) {
            return { message: msg, isISIN: true };
        }
    };
}

export function isISO31661Alpha2(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO31661Alpha2(str(value))) {
            return { message: msg, isISO31661Alpha2: true };
        }
    };
}

export function isISO31661Alpha3(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO31661Alpha3(str(value))) {
            return { message: msg, isISO31661Alpha3: true };
        }
    };
}

export function isISO4217(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO4217(str(value))) {
            return { message: msg, isISO4217: true };
        }
    };
}

export function isISO8601(msg: string, options?: validator.IsISO8601Options) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO8601(str(value), options)) {
            return { message: msg, isISO8601: options || true };
        }
    };
}

export function isISRC(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISRC(str(value))) {
            return { message: msg, isISRC: true };
        }
    };
}

export function isISSN(msg: string, options?: validator.IsISSNOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISSN(str(value), options)) {
            return { message: msg, isISSN: options || true };
        }
    };
}

export type IsIdentityCard = "any" | validator.IdentityCardLocale;
export function isIdentityCard(msg: string, options?: IsIdentityCard) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isIdentityCard(str(value), options)) {
            return { message: msg, isIdentityCard: options || true };
        }
    };
}

export function isJSON(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isJSON(str(value))) {
            return { message: msg, isJSON: true };
        }
    };
}

export function isJWT(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isJWT(str(value))) {
            return { message: msg, isJWT: true };
        }
    };
}

export function isLatLong(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLatLong(str(value))) {
            return { message: msg, isLatLong: true };
        }
    };
}

export function isLocale(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLocale(str(value))) {
            return { message: msg, isLocale: true };
        }
    };
}

export function isLowercase(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLowercase(str(value))) {
            return { message: msg, isLowercase: true };
        }
    };
}

export function isMACAddress(
    msg: string,
    options?: validator.IsMACAddressOptions
) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMACAddress(str(value), options)) {
            return { message: msg, isMACAddress: options || true };
        }
    };
}

export function isMD5(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMD5(str(value))) {
            return { message: msg, isMD5: true };
        }
    };
}

export function isMagnetURI(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMagnetURI(str(value))) {
            return { message: msg, isMagnetURI: true };
        }
    };
}

export function isMimeType(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMimeType(str(value))) {
            return { message: msg, isMimeType: true };
        }
    };
}

export interface IsMobilePhone {
    locale?:
        | "any"
        | validator.MobilePhoneLocale
        | validator.MobilePhoneLocale[];
    options?: validator.IsMobilePhoneOptions;
}
export function isMobilePhone(msg: string, config: IsMobilePhone = {}) {
    const { locale, options } = config;
    return ({ value }: FormControl<string>) => {
        if (!validator.isMobilePhone(str(value), locale, options)) {
            return { message: msg, isMobilePhone: config || true };
        }
    };
}

export function isMongoId(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMongoId(str(value))) {
            return { message: msg, isMongoId: true };
        }
    };
}

export function isMultibyte(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMultibyte(str(value))) {
            return { message: msg, isMultibyte: true };
        }
    };
}

export function isNumeric(msg: string, options?: validator.IsNumericOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isNumeric(str(value), options)) {
            return { message: msg, isNumeric: options || true };
        }
    };
}

export function isOctal(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isOctal(str(value))) {
            return { message: msg, isOctal: true };
        }
    };
}

export function isPassportNumber(msg: string, countryCode?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPassportNumber(str(value), countryCode)) {
            return { message: msg, isPassportNumber: countryCode || true };
        }
    };
}

export function isPort(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPort(str(value))) {
            return { message: msg, isPort: true };
        }
    };
}

export type IsPostalCode = "any" | validator.PostalCodeLocale;
export function isPostalCode(msg: string, locale: IsPostalCode) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPostalCode(str(value), locale)) {
            return { message: msg, isPostalCode: locale };
        }
    };
}

export function isRFC3339(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isRFC3339(str(value))) {
            return { message: msg, isRFC3339: true };
        }
    };
}

export function isRgbColor(msg: string, includePercentValues?: boolean) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isRgbColor(str(value), includePercentValues)) {
            return { message: msg, isRgbColor: includePercentValues || true };
        }
    };
}

export function isSemVer(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isSemVer(str(value))) {
            return { message: msg, isSemVer: true };
        }
    };
}

export function isSlug(msg: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isSlug(str(value))) {
            return { message: msg, isSlug: true };
        }
    };
}

export type IsStrongPassword = validator.StrongPasswordOptions & {
    returnScore?: false;
};
export function isStrongPassword(msg: string, options?: IsStrongPassword) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isStrongPassword(str(value), options)) {
            return { message: msg, isStrongPassword: options || true };
        }
    };
}

export function isSurrogatePair(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isSurrogatePair(str(value))) {
            return { message: msg, isSurrogatePair: true };
        }
    };
}

export function isTaxID(msg: string, locale?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isTaxID(str(value), locale)) {
            return { message: msg, isTaxID: locale || true };
        }
    };
}

export function isURL(msg: string, options?: IsURLOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isURL(str(value), options)) {
            return { message: msg, isURL: options || true };
        }
    };
}

export function isUUID(msg: string, version?: validator.UUIDVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isUUID(str(value), version)) {
            return { message: msg, isUUID: version || true };
        }
    };
}

export function isUppercase(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isUppercase(str(value))) {
            return { message: msg, isUppercase: true };
        }
    };
}

export function isVAT(msg: string, countryCode: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isVAT(str(value), countryCode)) {
            return { message: msg, isVAT: true };
        }
    };
}

export function isVariableWidth(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isVariableWidth(str(value))) {
            return { message: msg, isVariableWidth: true };
        }
    };
}

export function isWhitelisted(msg: string, chars: string | string[]) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isWhitelisted(str(value), chars)) {
            return { message: msg, isWhitelisted: chars };
        }
    };
}

export function isString(msg: string) {
    return ({ value }: FormControl<string>) => {
        if (typeof value !== "string") {
            return { message: msg, isString: true };
        }
    };
}

export interface RegexPattern {
    pattern: string | RegExp;
    flags?: string | undefined;
}
export function pattern(msg: string, config: RegexPattern) {
    const regex = new RegExp(config.pattern, config.flags);
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!regex.test(str(value))) {
            return { message: msg, pattern: str(regex) };
        }
    };
}
