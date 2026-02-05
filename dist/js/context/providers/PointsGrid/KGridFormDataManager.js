"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PointsGridFormDataProvider_1 = __importDefault(require("./PointsGridFormDataProvider"));
class KGridFormDataManager extends PointsGridFormDataProvider_1.default {
    constructor() {
        super(...arguments);
        this.name = "kgrid";
        this.divisor = 1;
    }
    static createFromUnitContext(unitContext, externalContext) {
        const contextItem = this.findContextItem(unitContext, "kgrid");
        return new KGridFormDataManager(contextItem, externalContext);
    }
    applyCovergenceParameter(parameter) {
        const unitContext = parameter.unitContext.data;
        const data = this.getData();
        this.setData({
            ...data,
            ...unitContext,
        });
        this.setIsEdited(true);
    }
}
exports.default = KGridFormDataManager;
