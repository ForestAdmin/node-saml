"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalParams = void 0;
const getAdditionalParams = (params) => {
    const { relayState, globalAdditionalParams, operationAdditionalParams, overrideParams } = params;
    const additionalParams = {};
    if (typeof relayState === "string" && relayState.length > 0) {
        additionalParams.RelayState = relayState;
    }
    return Object.assign(additionalParams, globalAdditionalParams, operationAdditionalParams, overrideParams !== null && overrideParams !== void 0 ? overrideParams : {});
};
exports.getAdditionalParams = getAdditionalParams;
//# sourceMappingURL=common.js.map