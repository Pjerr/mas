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
let PartService = class PartService {
    constructor(em, partRepository, attributeRepository, categoryRepository) {
        this.em = em;
        this.partRepository = partRepository;
        this.attributeRepository = attributeRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(payload) {
        const part = this.partRepository.create(Object.assign(Object.assign({}, payload), { attributes: payload.attributeIds, manufacturer: payload.manufacturerId }));
        await this.em.persistAndFlush(part);
        const createdPart = await this.partRepository.findOne({
            id: part.id,
        }, { populate: ['attributes.group'] });
        return createdPart;
    }
    async find(filters) {
        const parts = await this.partRepository.find(filters.query, filters.options);
        if (!parts)
            throw new common_1.NotFoundException('Parts not found');
        return parts;
    }
    async findOne(id) {
        const part = await this.partRepository.findOne(id, {
            populate: ['attributes', 'attributes.group'],
        });
        if (!part)
            throw new common_1.NotFoundException('Part not found');
        return part;
    }
    async update(id, payload) {
        const part = await this.partRepository.findOne(id, {
            populate: ['attributes', 'attributes.group'],
        });
        if (!part)
            throw new common_1.NotFoundException('Part not found');
        if (payload.attributeIds) {
            const attributeRefs = payload.attributeIds.map((attributeId) => this.attributeRepository.getReference(attributeId));
            part.attributes.set(attributeRefs);
        }
        part.assign(payload);
        await this.em.persistAndFlush(part);
        const updatedPart = await this.partRepository.findOne(id, {
            populate: ['attributes', 'attributes.group'],
        });
        return updatedPart;
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
        const category = await this.categoryRepository.findOneOrFail(categoryId);
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
    __param(3, (0, nestjs_1.InjectRepository)(entities_1.Category)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository])
], PartService);
exports.PartService = PartService;
//# sourceMappingURL=part.service.js.map