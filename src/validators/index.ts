import utils from "../utils";
import FormControl, { FCE } from "../modules/form_control";
import validator from "validator";
import type { IsFQDNOptions } from "validator/lib/isFQDN";
import { Options } from "validator/lib/isBoolean";
import { IsEmailOptions } from "validator/lib/isEmail";
import { IsURLOptions } from "validator/lib/isURL";

const str = utils.toString;

export function required() {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (value === "" || value === undefined || value === null) {
            return { required: true };
        }
    };
}

export function minLength(min: number) {
    return ({ value }: FormControl<string>) => {
        if (str(value).length < min) {
            return { minLength: min };
        }
    };
}

export function maxLength(max: number) {
    return ({ value }: FormControl<string>) => {
        if (str(value).length > max) {
            return { maxLength: max };
        }
    };
}

export function isEmail(options?: IsEmailOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEmail(str(value), options)) {
            return { isEmail: options || true };
        }
    };
}

export function isIn(list: string[]) {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isIn(str(value), list)) {
            return { isIn: list };
        }
    };
}

export function isInt(options?: validator.IsIntOptions) {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isInt(str(value), options)) {
            return { isInt: options || true };
        }
    };
}

export function min(min: number) {
    return ({ value }: FormControl<number>) => {
        if (value < min) {
            return { min };
        }
    };
}

export function max(max: number) {
    return ({ value }: FormControl<number>) => {
        if (value > max) {
            return { max };
        }
    };
}

export function requiredTrue() {
    return ({ value }: FormControl<boolean>) => {
        if (value !== true) {
            return { requiredTrue: true };
        }
    };
}

export function isAfter(date?: string) {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isAfter(str(value), date)) {
            return { isAfter: date || true };
        }
    };
}

export interface IsAlpha {
    locale?: validator.AlphaLocale;
    options?: validator.IsAlphaOptions;
}
export function isAlpha(config: IsAlpha = {}) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isAlpha(str(value), config.locale, config.options)) {
            return { isAlpha: config };
        }
    };
}

export interface IsAlphanumeric {
    locale?: validator.AlphanumericLocale;
    options?: validator.IsAlphanumericOptions;
}
export function isAlphanumeric(config: IsAlphanumeric = {}) {
    const { locale, options } = config;
    return ({ value }: FormControl<string>) => {
        if (!validator.isAlphanumeric(str(value), locale, options)) {
            return { isAlphanumeric: config };
        }
    };
}

export function isAscii() {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isAscii(str(value))) {
            return { isAscii: true };
        }
    };
}

export function isBIC() {
    return <T extends FCE>({ value }: FormControl<T>) => {
        if (!validator.isBIC(str(value))) {
            return { isBIC: true };
        }
    };
}

export function isBase32() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase32(str(value))) {
            return { isBase32: true };
        }
    };
}

export function isBase58() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase58(str(value))) {
            return { isBase58: true };
        }
    };
}

export function isBase64() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isBase64(str(value))) {
            return { isBase64: true };
        }
    };
}

export function isBoolean(options?: Options) {
    return <T extends boolean | string>({ value }: FormControl<T>) => {
        if (!validator.isBoolean(str(value), options)) {
            return { isBoolean: options || true };
        }
    };
}

export function isBefore(date?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isBefore(str(value), date)) {
            return { isBefore: date || true };
        }
    };
}

export function isBtcAddress() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isBtcAddress(str(value))) {
            return { isBtcAddress: true };
        }
    };
}

export function isByteLength(options?: validator.IsByteLengthOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isByteLength(str(value), options)) {
            return { isByteLength: options || true };
        }
    };
}

export function isCreditCard() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isCreditCard(str(value))) {
            return { isCreditCard: true };
        }
    };
}

export function isCurrency(options?: validator.IsCurrencyOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isCurrency(str(value), options)) {
            return { isCurrency: options || true };
        }
    };
}

export function isDataURI() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isDataURI(str(value))) {
            return { isDataURI: true };
        }
    };
}

export function isDate(options?: validator.IsDateOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDate(str(value), options)) {
            return { isDate: options || true };
        }
    };
}

export function isDecimal(options?: validator.IsDecimalOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDecimal(str(value), options)) {
            return { isDecimal: options || true };
        }
    };
}

export function isDivisibleBy(by: number) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isDivisibleBy(str(value), by)) {
            return { isDivisibleBy: by };
        }
    };
}

export function isEAN() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEAN(str(value))) {
            return { isEAN: true };
        }
    };
}

export function isEmpty(options?: validator.IsEmptyOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEmpty(str(value), options)) {
            return { isEmpty: options || true };
        }
    };
}

export function isNotEmpty(options?: validator.IsEmptyOptions) {
    return ({ value }: FormControl<string>) => {
        if (validator.isEmpty(str(value), options)) {
            return { isNotEmpty: options || true };
        }
    };
}

export function isEthereumAddress() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isEthereumAddress(str(value))) {
            return { isEthereumAddress: true };
        }
    };
}

export function isFloat(options?: validator.IsFloatOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isFloat(str(value), options)) {
            return { isFloat: options || true };
        }
    };
}

export function isFullWidth() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isFullWidth(str(value))) {
            return { isFullWidth: true };
        }
    };
}

export function isFQDN(options?: IsFQDNOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isFQDN(value, options)) {
            return { isFQDN: options || true };
        }
    };
}

export function isHSL() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHSL(str(value))) {
            return { isHSL: true };
        }
    };
}

export function isHalfWidth() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHalfWidth(str(value))) {
            return { isHalfWidth: true };
        }
    };
}

export function isHash(algorithm: validator.HashAlgorithm) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isHash(str(value), algorithm)) {
            return { isHash: algorithm };
        }
    };
}

export function isHexColor() {
    return <T extends number | string>({ value }: FormControl<T>) => {
        if (!validator.isHexColor(str(value))) {
            return { isHexColor: true };
        }
    };
}

export function isHexadecimal() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isHexadecimal(str(value))) {
            return { isHexadecimal: true };
        }
    };
}

export function isIBAN() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isIBAN(str(value))) {
            return { isIBAN: true };
        }
    };
}

export function isIP(options?: validator.IPVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isIP(str(value), options)) {
            return { isIP: options || true };
        }
    };
}

export function isIPRange(options?: validator.IPVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isIPRange(str(value), options)) {
            return { isIPRange: options || true };
        }
    };
}

export function isISBN(options?: validator.ISBNVersion) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISBN(str(value), options)) {
            return { isISBN: options || true };
        }
    };
}

export function isISIN() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISIN(str(value))) {
            return { isISIN: true };
        }
    };
}

export function isISO31661Alpha2() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO31661Alpha2(str(value))) {
            return { isISO31661Alpha2: true };
        }
    };
}

export function isISO31661Alpha3() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO31661Alpha3(str(value))) {
            return { isISO31661Alpha3: true };
        }
    };
}

export function isISO4217() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO4217(str(value))) {
            return { isISO4217: true };
        }
    };
}

export function isISO8601(options?: validator.IsISO8601Options) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISO8601(str(value), options)) {
            return { isISO8601: options || true };
        }
    };
}

export function isISRC() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISRC(str(value))) {
            return { isISRC: true };
        }
    };
}

export function isISSN(options?: validator.IsISSNOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isISSN(str(value), options)) {
            return { isISSN: options || true };
        }
    };
}

export type IsIdentityCard = "any" | validator.IdentityCardLocale;
export function isIdentityCard(options?: IsIdentityCard) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isIdentityCard(str(value), options)) {
            return { isIdentityCard: options || true };
        }
    };
}

export function isJSON() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isJSON(str(value))) {
            return { isJSON: true };
        }
    };
}

export function isJWT() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isJWT(str(value))) {
            return { isJWT: true };
        }
    };
}

export function isLatLong() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLatLong(str(value))) {
            return { isLatLong: true };
        }
    };
}

export function isLocale() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLocale(str(value))) {
            return { isLocale: true };
        }
    };
}

export function isLowercase() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isLowercase(str(value))) {
            return { isLowercase: true };
        }
    };
}

export function isMACAddress(options?: validator.IsMACAddressOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMACAddress(str(value), options)) {
            return { isMACAddress: options || true };
        }
    };
}

export function isMD5() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMD5(str(value))) {
            return { isMD5: true };
        }
    };
}

export function isMagnetURI() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMagnetURI(str(value))) {
            return { isMagnetURI: true };
        }
    };
}

export function isMimeType() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMimeType(str(value))) {
            return { isMimeType: true };
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
export function isMobilePhone(config: IsMobilePhone = {}) {
    const { locale, options } = config;
    return ({ value }: FormControl<string>) => {
        if (!validator.isMobilePhone(str(value), locale, options)) {
            return { isMobilePhone: config || true };
        }
    };
}

export function isMongoId() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMongoId(str(value))) {
            return { isMongoId: true };
        }
    };
}

export function isMultibyte() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isMultibyte(str(value))) {
            return { isMultibyte: true };
        }
    };
}

export function isNumeric(options?: validator.IsNumericOptions) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isNumeric(str(value), options)) {
            return { isNumeric: options || true };
        }
    };
}

export function isOctal() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isOctal(str(value))) {
            return { isOctal: true };
        }
    };
}

export function isPassportNumber(countryCode?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPassportNumber(str(value), countryCode)) {
            return { isPassportNumber: countryCode || true };
        }
    };
}

export function isPort() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPort(str(value))) {
            return { isPort: true };
        }
    };
}

export type IsPostalCode = "any" | validator.PostalCodeLocale;
export function isPostalCode(locale: IsPostalCode) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isPostalCode(str(value), locale)) {
            return { isPostalCode: locale };
        }
    };
}

export function isRFC3339() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isRFC3339(str(value))) {
            return { isRFC3339: true };
        }
    };
}

export function isRgbColor(includePercentValues?: boolean) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isRgbColor(str(value), includePercentValues)) {
            return { isRgbColor: includePercentValues || true };
        }
    };
}

export function isSemVer() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isSemVer(str(value))) {
            return { isSemVer: true };
        }
    };
}

export function isSlug() {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isSlug(str(value))) {
            return { isSlug: true };
        }
    };
}

export type IsStrongPassword = validator.StrongPasswordOptions & {
    returnScore?: false;
};
export function isStrongPassword(options?: IsStrongPassword) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isStrongPassword(str(value), options)) {
            return { isStrongPassword: options || true };
        }
    };
}

export function isSurrogatePair() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isSurrogatePair(str(value))) {
            return { isSurrogatePair: true };
        }
    };
}

export function isTaxID(locale?: string) {
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!validator.isTaxID(str(value), locale)) {
            return { isTaxID: locale || true };
        }
    };
}

export function isURL(options?: IsURLOptions) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isURL(str(value), options)) {
            return { isURL: options || true };
        }
    };
}

export function isUUID(version?: validator.UUIDVersion) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isUUID(str(value), version)) {
            return { isUUID: version || true };
        }
    };
}

export function isUppercase() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isUppercase(str(value))) {
            return { isUppercase: true };
        }
    };
}

export function isVAT(countryCode: string) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isVAT(str(value), countryCode)) {
            return { isVAT: true };
        }
    };
}

export function isVariableWidth() {
    return ({ value }: FormControl<string>) => {
        if (!validator.isVariableWidth(str(value))) {
            return { isVariableWidth: true };
        }
    };
}

export function isWhitelisted(chars: string | string[]) {
    return ({ value }: FormControl<string>) => {
        if (!validator.isWhitelisted(str(value), chars)) {
            return { isWhitelisted: chars };
        }
    };
}

export function isString() {
    return ({ value }: FormControl<string>) => {
        if (typeof value !== "string") {
            return { isString: true };
        }
    };
}

export interface RegexPattern {
    pattern: string | RegExp;
    flags?: string | undefined;
}
export function pattern(config: RegexPattern) {
    const regex = new RegExp(config.pattern, config.flags);
    return <T extends string | number>({ value }: FormControl<T>) => {
        if (!regex.test(str(value))) {
            return { pattern: str(regex) };
        }
    };
}
