"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signXmlMetadata = exports.signXmlResponse = exports.assertRequired = void 0;
const xml_1 = require("./xml");
function assertRequired(value, error) {
    if (value === undefined || value === null || (typeof value === "string" && value.length === 0)) {
        throw new TypeError(error !== null && error !== void 0 ? error : "value does not exist");
    }
    else {
        return value;
    }
}
exports.assertRequired = assertRequired;
function signXmlResponse(samlMessage, options) {
    const responseXpath = '//*[local-name(.)="Response" and namespace-uri(.)="urn:oasis:names:tc:SAML:2.0:protocol"]';
    return xml_1.signXml(samlMessage, responseXpath, { reference: responseXpath, action: "append" }, options);
}
exports.signXmlResponse = signXmlResponse;
function signXmlMetadata(metadataXml, options) {
    const metadataXpath = '//*[local-name(.)="EntityDescriptor" and namespace-uri(.)="urn:oasis:names:tc:SAML:2.0:metadata"]';
    return xml_1.signXml(metadataXml, metadataXpath, { reference: metadataXpath, action: "prepend" }, options);
}
exports.signXmlMetadata = signXmlMetadata;
//# sourceMappingURL=utility.js.map