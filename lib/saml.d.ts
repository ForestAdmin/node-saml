/// <reference types="node" />
import * as querystring from "querystring";
import { ParsedQs } from "qs";
import { CacheProvider, Profile, SamlOptions, SamlConfig } from "./types";
import { AuthenticateOptions, AuthorizeOptions } from "./passport-saml-types";
interface NameID {
    value: string | null;
    format: string | null;
}
declare class SAML {
    options: SamlOptions;
    cacheProvider: CacheProvider;
    constructor(ctorOptions: SamlConfig);
    initialize(ctorOptions: SamlConfig): SamlOptions;
    private getCallbackUrl;
    private signRequest;
    private generateAuthorizeRequestAsync;
    _generateLogoutRequest(user: Profile): Promise<string>;
    _generateLogoutResponse(logoutRequest: Profile, success: boolean): string;
    _requestToUrlAsync(request: string | null | undefined, response: string | null, operation: string, additionalParameters: querystring.ParsedUrlQuery): Promise<string>;
    _getAdditionalParams(relayState: string, operation: "authorize" | "logout", overrideParams?: querystring.ParsedUrlQuery): querystring.ParsedUrlQuery;
    getAuthorizeUrlAsync(RelayState: string, host: string | undefined, options: AuthorizeOptions): Promise<string>;
    getAuthorizeFormAsync(RelayState: string, host?: string): Promise<string>;
    getLogoutUrlAsync(user: Profile, RelayState: string, options: AuthenticateOptions & AuthorizeOptions): Promise<string>;
    getLogoutResponseUrl(samlLogoutRequest: Profile, RelayState: string, options: AuthenticateOptions & AuthorizeOptions, success: boolean, callback: (err: Error | null, url?: string) => void): void;
    private getLogoutResponseUrlAsync;
    private certsToCheck;
    validateSignature(fullXml: string, currentNode: Element, certs: string[]): boolean;
    validatePostResponseAsync(container: Record<string, string>): Promise<{
        profile: Profile | null;
        loggedOut: boolean;
    }>;
    private validateInResponseTo;
    validateRedirectAsync(container: ParsedQs, originalQuery: string): Promise<{
        profile: Profile | null;
        loggedOut: boolean;
    }>;
    private hasValidSignatureForRedirect;
    private validateSignatureForRedirect;
    private verifyLogoutRequest;
    private verifyLogoutResponse;
    private verifyIssuer;
    private processValidlySignedAssertionAsync;
    private checkTimestampsValidityError;
    private checkAudienceValidityError;
    validatePostRequestAsync(container: Record<string, string>): Promise<{
        profile: Profile;
        loggedOut: boolean;
    }>;
    _getNameIdAsync(self: SAML, doc: Node): Promise<NameID>;
    generateServiceProviderMetadata(decryptionCert: string | null, signingCert?: string | string[] | null): string;
    /**
     * Process max age assertion and use it if it is more restrictive than the NotOnOrAfter age
     * assertion received in the SAMLResponse.
     *
     * @param maxAssertionAgeMs Max time after IssueInstant that we will accept assertion, in Ms.
     * @param notOnOrAfter Expiration provided in response.
     * @param issueInstant Time when response was issued.
     * @returns {*} The expiration time to be used, in Ms.
     */
    private processMaxAgeAssertionTime;
}
export { SAML };
