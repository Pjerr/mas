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
exports.OptionService = void 0;
const entities_1 = require("../../core/entities");
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
let OptionService = class OptionService {
    constructor(em, optionRepository, attributeRepository) {
        this.em = em;
        this.optionRepository = optionRepository;
        this.attributeRepository = attributeRepository;
    }
    async create(payload) {
        const option = this.optionRepository.create(Object.assign(Object.assign({}, payload), { attribute: payload.attributeId }));
        await this.em.persistAndFlush(option);
        return option;
    }
    async multipleCreate(payloads) {
        const options = payloads.map((payload) => {
            const option = this.optionRepository.create(Object.assign(Object.assign({}, payload), { attribute: payload.attributeId }));
            return option;
        });
        await this.em.persistAndFlush(options);
        return options;
    }
    async find(filters) {
        const options = await this.optionRepository.find(filters.query, filters.options);
        if (!options)
            throw new common_1.NotFoundException('Options do not exist');
        return options;
    }
    async findOne(id) {
        const option = await this.optionRepository.findOne(id);
        if (!option)
            throw new common_1.NotFoundException('Option does not exist');
        return option;
    }
    async update(id, payload) {
        const option = await this.findOne(id);
        option.assign(payload);
        await this.em.persistAndFlush(option);
        return option;
    }
    async remove(id) {
        const option = this.optionRepository.getReference(id);
        if (!option)
            throw new common_1.NotFoundException('Option does not exist');
        await this.em.removeAndFlush(option);
    }
    async removeMany(ids) {
        const optionRefs = ids.map((id) => this.optionRepository.getReference(id));
        await this.em.removeAndFlush(optionRefs);
    }
    async updateAttributeRelation(id, attributeId) {
        const option = await this.findOne(id);
        const attribute = await this.attributeRepository.findOne(attributeId);
        if (!attribute)
            throw new common_1.NotFoundException('Attribute does not exist');
        option.attribute = attribute.id;
        await this.em.persistAndFlush(option);
        return option;
    }
    async findPartOptions(request) {
        const options = await this.optionRepository.find({ attribute: { $eq: request.attributeId } }, {
            strategy: core_1.LoadStrategy.SELECT_IN,
            populate: ['configs'],
            populateWhere: {
                configs: {
                    variants: {
                        part: { id: { $eq: request.partId } },
                    },
                },
            },
        });
        return options;
    }
};
OptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.AttributeOption)),
    __param(2, (0, nestjs_1.InjectRepository)(entities_1.Attribute)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        core_1.EntityRepository,
        core_1.EntityRepository])
], OptionService);
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map