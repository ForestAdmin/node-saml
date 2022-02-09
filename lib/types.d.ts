/// <reference types="node" />
export declare type SignatureAlgorithm = "sha1" | "sha256" | "sha512";
export interface SamlSigningOptions {
    privateKey: string | Buffer;
    signatureAlgorithm?: SignatureAlgorithm;
    xmlSignatureTransforms?: string[];
    digestAlgorithm?: string;
}
export declare const isValidSamlSigningOptions: (options: Partial<SamlSigningOptions>) => options is SamlSigningOptions;
export interface AudienceRestrictionXML {
    Audience?: XMLObject[];
}
export interface CacheItem {
    value: string;
    createdAt: number;
}
export interface CacheProvider {
    saveAsync(key: string, value: string): Promise<CacheItem | null>;
    getAsync(key: string): Promise<string | null>;
    removeAsync(key: string): Promise<string | null>;
}
export declare type XMLValue = string | number | boolean | null | XMLObject | XMLValue[];
export declare type XMLObject = {
    [key: string]: XMLValue;
};
export declare type XMLInput = XMLObject;
export declare type XMLOutput = Record<string, any>;
export interface AuthorizeRequestXML {
    "samlp:AuthnRequest": XMLInput;
}
export declare type CertCallback = (callback: (err: Error | null, cert?: string | string[]) => void) => void;
/**
 * These are SAML options that must be provided to construct a new SAML Strategy
 */
export interface MandatorySamlOptions {
    cert: string | string[] | CertCallback;
}
export interface SamlIDPListConfig {
    entries: SamlIDPEntryConfig[];
    getComplete?: string;
}
export interface SamlIDPEntryConfig {
    providerId: string;
    name?: string;
    loc?: string;
}
export interface LogoutRequestXML {
    "samlp:LogoutRequest": {
        "saml:NameID": XMLInput;
        [key: string]: XMLValue;
    };
}
export interface ServiceMetadataXML {
    EntityDescriptor: {
        [key: string]: XMLValue;
        SPSSODescriptor: XMLObject;
    };
}
export declare type RacComparision = "exact" | "minimum" | "maximum" | "better";
interface SamlScopingConfig {
    idpList?: SamlIDPListConfig[];
    proxyCount?: number;
    requesterId?: string[] | string;
}
export declare enum ValidateInResponseTo {
    never = "never",
    ifPresent = "ifPresent",
    always = "always"
}
/**
 * The options required to use a SAML strategy
 * These may be provided by means of defaults specified in the constructor
 */
export interface SamlOptions extends Partial<SamlSigningOptions>, MandatorySamlOptions {
    callbackUrl?: string;
    path: string;
    protocol?: string;
    host: string;
    entryPoint?: string;
    issuer: string;
    decryptionPvk?: string | Buffer;
    additionalParams: Record<string, string>;
    additionalAuthorizeParams: Record<string, string>;
    identifierFormat?: string | null;
    acceptedClockSkewMs: number;
    attributeConsumingServiceIndex?: string;
    disableRequestedAuthnContext: boolean;
    authnContext: string[];
    forceAuthn: boolean;
    skipRequestCompression: boolean;
    authnRequestBinding?: string;
    racComparison: RacComparision;
    providerName?: string;
    passive: boolean;
    idpIssuer?: string;
    audience?: string;
    scoping?: SamlScopingConfig;
    wantAssertionsSigned?: boolean;
    maxAssertionAgeMs: number;
    generateUniqueId: () => string;
    signMetadata?: boolean;
    validateInResponseTo: boolean | ValidateInResponseTo;
    requestIdExpirationPeriodMs: number;
    cacheProvider: CacheProvider;
    logoutUrl: string;
    additionalLogoutParams: Record<string, string>;
    logoutCallbackUrl?: string;
    disableRequestAcsUrl: boolean;
    samlAuthnRequestExtensions?: Record<string, unknown>;
    samlLogoutRequestExtensions?: Record<string, unknown>;
}
export interface StrategyOptions {
    name?: string;
    passReqToCallback?: boolean;
}
/**
 * These options are availble for configuring a SAML strategy
 */
export declare type SamlConfig = Partial<SamlOptions> & StrategyOptions & MandatorySamlOptions;
export interface Profile {
    issuer: string;
    sessionIndex?: string;
    nameID: string;
    nameIDFormat: string;
    nameQualifier?: string;
    spNameQualifier?: string;
    ID?: string;
    mail?: string;
    email?: string;
    ["urn:oid:0.9.2342.19200300.100.1.3"]?: string;
    getAssertionXml?(): string;
    getAssertion?(): Record<string, unknown>;
    getSamlResponseXml?(): string;
    [attributeName: string]: unknown;
}
export declare class ErrorWithXmlStatus extends Error {
    readonly xmlStatus: string;
    constructor(message: string, xmlStatus: string);
}
export {};
