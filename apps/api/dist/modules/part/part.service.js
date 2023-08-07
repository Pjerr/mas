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
exports.PartService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
const option_config_service_1 = require("../attribute/option-config.service");
let PartService = class PartService {
    constructor(em, partRepository, attributeRepository, configService) {
        this.em = em;
        this.partRepository = partRepository;
        this.attributeRepository = attributeRepository;
        this.configService = configService;
    }
    existOptions(attributeConfigs) {
        if (attributeConfigs.length === 0 || attributeConfigs[0].length === 0)
            return [];
        return attributeConfigs;
    }
    async create(payload) {
        const part = this.partRepository.create(Object.assign(Object.assign({}, payload), { createdAt: new Date(), category: payload.categoryId, attributes: payload.attributeIds }));
        this.em.persist(part);
        const attributeConfigs = this.existOptions(payload.attributeConfigs);
        if (attributeConfigs.length > 0) {
            attributeConfigs.map((configs) => this.configService.create(part.id, configs));
        }
        await this.em.flush();
        const createdPart = await this.partRepository.findOne(part.id, {
            populate: ['attributes.group', 'attributes.options'],
        });
        return createdPart;
    }
    async createDraft() {
        const product = this.partRepository.create({
            name: 'Untitled product',
            attributes: [],
            properties: {},
            createdAt: null,
        });
        common_1.Logger.log('Created draft', JSON.stringify(product));
        return product;
    }
    async find(filters) {
        const parts = await this.partRepository.find(filters.query, filters.options);
        if (!parts)
            throw new common_1.NotFoundException('Parts not found');
        return parts;
    }
    async findOne(id) {
        const part = await this.partRepository.findOne(id, {
            populate: ['attributes', 'attributes.group', 'attributes.options'],
        });
        if (!part)
            throw new common_1.NotFoundException('Part not found');
        return part;
    }
    async update(id, payload) {
        var _a;
        const part = await this.partRepository.findOne(id);
        if (((_a = payload.attributeIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const attributes = payload.attributeIds.map((id) => this.attributeRepository.getReference(id));
            part.attributes.set(attributes);
        }
        const attributeConfigs = this.existOptions(payload.attributeConfigs);
        if (attributeConfigs.length > 0) {
            this.configService.removeMany(id);
            attributeConfigs.map((configs) => this.configService.create(part.id, configs));
        }
        await this.em.flush();
        await part.populate(['attributes.group', 'attributes.options']);
        return part;
    }
    async bulkUpdatePrice(ids, payloads) {
        const parts = await this.partRepository.find({ id: { $in: ids } });
        const updatedParts = [];
        parts.map((part, index) => {
            part.basePrice = payloads[index];
        });
        await this.em.flush();
        return updatedParts;
    }
    async remove(id) {
        const part = await this.findOne(id);
        await this.em.removeAndFlush(part);
    }
    async removeMany(ids) {
        const parts = await this.partRepository.find({ id: { $in: ids } });
        if (!parts)
            throw new common_1.NotFoundException('Parts not found');
        await this.em.removeAndFlush(parts);
    }
    async addCategory(id, categoryId) {
        const part = await this.findOne(id);
        const category = await this.em.findOne(entities_1.Category, categoryId);
        if (!category)
            throw new common_1.NotFoundException('Category does not exist');
        part.category = category.id;
        await this.em.persistAndFlush(part);
        return part;
    }
    async removeAttribute(id, attributeId) {
        const part = await this.partRepository.findOne(id, {
            populate: ['attributes'],
        });
        const attribute = this.attributeRepository.getReference(attributeId);
        part.attributes.remove(attribute);
        await this.em.persistAndFlush(part);
        return part;
    }
    async removeAttributes(id, attributeIds) {
        const part = await this.partRepository.findOneOrFail(id, {
            populate: ['attributes'],
        });
        const attributeRefs = attributeIds.map((attributeId) => this.attributeRepository.getReference(attributeId));
        part.attributes.remove(attributeRefs);
        this.em.persistAndFlush(part);
        return part;
    }
    async addAttribute(id, attributeId) {
        const part = await this.partRepository.findOneOrFail(id, {
            populate: ['attributes'],
        });
        const attributeRef = this.attributeRepository.getReference(attributeId);
        part.attributes.add(attributeRef);
        await this.em.persistAndFlush(part);
        return part;
    }
};
PartService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Part)),
    __param(2, (0, nestjs_1.InjectRepository)(entities_1.Attribute)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository,
        option_config_service_1.OptionConfigService])
], PartService);
exports.PartService = PartService;
//# sourceMappingURL=part.service.js.map