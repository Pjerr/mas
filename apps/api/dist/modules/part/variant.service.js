"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantService = void 0;
const entities_1 = require("../../core/entities");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const variant_config_entity_1 = require("../../core/entities/variant_config.entity");
let VariantService = class VariantService {
    constructor(em) {
        this.em = em;
    }
    cartesianPart(data) {
        return data.reduce(function (previous, current) {
            return previous
                .map((x) => current.map((y) => x.concat([y])))
                .reduce((previous, current) => previous.concat(current), []);
        }, [[]]);
    }
    async find(id) {
        const part = await this.em.findOne(entities_1.Part, { id });
        if (!part)
            throw new common_1.NotFoundException('Part does not exist');
        const response = await this.em.find(variant_config_entity_1.VariantConfig, {
            part: id,
        });
        const configs = {};
        response.forEach((config) => {
            if (!configs[config.attributeId]) {
                configs[config.attributeId] = [];
            }
            configs[config.attributeId].push({
                attributeName: config.attributeName,
                id: config.id,
                price: config.price,
                optionValue: config.optionValue,
            });
        });
        const configVariants = this.cartesianPart(Object.values(configs));
        return {
            configs: configVariants,
            basePrice: part.basePrice,
            part: id,
        };
    }
};
VariantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], VariantService);
exports.VariantService = VariantService;
//# sourceMappingURL=variant.service.js.map