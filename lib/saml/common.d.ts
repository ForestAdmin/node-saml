/// <reference types="node" />
/// <reference types="mocha" />
import { ParsedUrlQuery } from "querystring";
export declare const getAdditionalParams: (params: {
    relayState: string;
    globalAdditionalParams: NodeJS.Dict<string>;
    operationAdditionalParams: NodeJS.Dict<string>;
    overrideParams?: ParsedUrlQuery;
}) => ParsedUrlQuery;
