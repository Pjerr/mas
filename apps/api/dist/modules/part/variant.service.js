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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantService = void 0;
const entities_1 = require("../../core/entities");
const option_config_service_1 = require("../attribute/option-config.service");
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
let VariantService = class VariantService {
    constructor(em, configService, repository) {
        this.em = em;
        this.configService = configService;
        this.repository = repository;
    }
    cartesianPart(data) {
        return data.reduce(function (previous, current) {
            return previous
                .map((x) => current.map((y) => x.concat([y])))
                .reduce((previous, current) => previous.concat(current), []);
        }, [[]]);
    }
    generateVariants(partId, attributeConfigs) {
        if (attributeConfigs.length === 0)
            return [];
        const optionConfigs = attributeConfigs.map((configs) => this.configService.create(partId, configs));
        const configVariants = this.cartesianPart(optionConfigs);
        common_1.Logger.log('config-combinations', configVariants);
        const variants = configVariants.map((optionsConfigs) => this.repository.create({
            part: partId,
            optionsConfigs,
        }));
        return variants;
    }
};
VariantService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_1.InjectRepository)(entities_1.Variant)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        option_config_service_1.OptionConfigService,
        core_1.EntityRepository])
], VariantService);
exports.VariantService = VariantService;
//# sourceMappingURL=variant.service.js.map