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
exports.OptionConfigService = void 0;
const entities_1 = require("../../core/entities");
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
let OptionConfigService = class OptionConfigService {
    constructor(em, configRepository) {
        this.em = em;
        this.configRepository = configRepository;
    }
    async create(partId, configs) {
        const configVariant = configs.map((config) => this.configRepository.create(Object.assign(Object.assign({}, config), { part: partId, id: undefined })));
        await this.em.persistAndFlush(configVariant);
        return configVariant;
    }
    async findOne(id) {
        const option = await this.configRepository.findOne(id);
        if (!option)
            throw new common_1.NotFoundException('Option does not exist');
        return option;
    }
    async removeMany(partId) {
        const configs = await this.configRepository.find({
            part: { $eq: partId },
        });
        common_1.Logger.log('Configs', configs);
        await this.em.removeAndFlush(configs);
    }
};
OptionConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.OptionConfig)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        core_1.EntityRepository])
], OptionConfigService);
exports.OptionConfigService = OptionConfigService;
//# sourceMappingURL=option-config.service.js.map