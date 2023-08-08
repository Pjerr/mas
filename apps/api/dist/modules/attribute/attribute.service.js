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
exports.AttributeService = void 0;
const entities_1 = require("../../core/entities");
const property_key_1 = require("../../core/utils/property-key");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
let AttributeService = class AttributeService {
    constructor(em, attributeRepository) {
        this.em = em;
        this.attributeRepository = attributeRepository;
    }
    async create(payload) {
        const propertyKey = (0, property_key_1.generatePropertyKey)(payload.displayName);
        const attribute = this.attributeRepository.create(Object.assign(Object.assign({}, payload), { propertyKey, group: payload.groupId }));
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async findOne(id) {
        const attribute = await this.attributeRepository.findOne(id);
        if (!attribute)
            throw new common_1.NotFoundException('Attribute does not exist');
        return attribute;
    }
    async find(filters) {
        const options = ['group'];
        if (filters.options.populate) {
            options.push(...filters.options.populate);
        }
        const attributes = await this.attributeRepository.find(filters.query, Object.assign(Object.assign({}, filters.options), { populate: options }));
        if (!attributes)
            throw new common_1.NotFoundException('Attributes do not exist');
        return attributes;
    }
    async update(id, payload) {
        const attribute = await this.attributeRepository.findOne(id, {
            populate: ['options', 'group'],
        });
        attribute.assign(payload);
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async remove(id) {
        const attribute = await this.attributeRepository.findOne(id, {
            populate: ['options'],
        });
        const parts = await this.em.find(entities_1.Part, {
            attributes: { id: { $eq: id } },
        });
        parts.forEach((part) => {
            const properties = part.properties;
            delete properties[attribute.propertyKey];
            part.assign(properties);
        });
        await this.em.removeAndFlush(attribute);
    }
    async removeMany(ids) {
        ids.forEach((id) => {
            this.remove(id);
        });
        await this.em.flush();
    }
    async updateGroup(id, groupId) {
        const attribute = await this.findOne(id);
        const group = await this.em.findOne(entities_1.Group, groupId);
        if (!group)
            throw new common_1.NotFoundException('Group does not exist');
        attribute.group = group;
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async findBy(partId) {
        const attributeQb = this.attributeRepository.createQueryBuilder();
        const response = await attributeQb
            .select(['displayName', 'id', 'propertyKey'])
            .where({ products: { id: { $eq: partId } } })
            .execute('all');
        return response;
    }
};
AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Attribute)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map