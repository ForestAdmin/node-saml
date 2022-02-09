"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCertPEMHeaderAndFooter = exports.generateUniqueId = exports.certToPEM = exports.keyToPEM = void 0;
const crypto = require("crypto");
const utility_1 = require("./utility");
const keyToPEM = (key) => {
    key = utility_1.assertRequired(key, "key is required");
    if (typeof key !== "string")
        return key;
    if (key.split(/\r?\n/).length !== 1)
        return key;
    const matchedKey = key.match(/.{1,64}/g);
    if (matchedKey) {
        const wrappedKey = [
            "-----BEGIN PRIVATE KEY-----",
            ...matchedKey,
            "-----END PRIVATE KEY-----",
            "",
        ].join("\n");
        return wrappedKey;
    }
    throw new Error("Invalid key");
};
exports.keyToPEM = keyToPEM;
const certToPEM = (cert) => {
    cert = cert.match(/.{1,64}/g).join("\n");
    if (cert.indexOf("-BEGIN CERTIFICATE-") === -1)
        cert = "-----BEGIN CERTIFICATE-----\n" + cert;
    if (cert.indexOf("-END CERTIFICATE-") === -1)
        cert = cert + "\n-----END CERTIFICATE-----\n";
    return cert;
};
exports.certToPEM = certToPEM;
const generateUniqueId = () => {
    return "_" + crypto.randomBytes(10).toString("hex");
};
exports.generateUniqueId = generateUniqueId;
const removeCertPEMHeaderAndFooter = (certificate) => {
    certificate = certificate.replace(/-+BEGIN CERTIFICATE-+\r?\n?/, "");
    certificate = certificate.replace(/-+END CERTIFICATE-+\r?\n?/, "");
    certificate = certificate.replace(/\r\n/g, "\n");
    return certificate;
};
exports.removeCertPEMHeaderAndFooter = removeCertPEMHeaderAndFooter;
//# sourceMappingURL=crypto.js.map