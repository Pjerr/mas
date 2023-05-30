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
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../core/entities");
const nestjs_1 = require("@mikro-orm/nestjs");
const property_key_1 = require("../../core/utils/property-key");
let AttributeService = class AttributeService {
    constructor(em, attributeRepository, groupRepository, carRepository) {
        this.em = em;
        this.attributeRepository = attributeRepository;
        this.groupRepository = groupRepository;
        this.carRepository = carRepository;
    }
    async create(payload) {
        const propertyKey = (0, property_key_1.generateProperyKey)(payload.displayName);
        const attribute = this.attributeRepository.create(Object.assign(Object.assign({}, payload), { propertyKey, group: payload.groupId }));
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async find(filters) {
        const options = ['group'];
        if (filters.options.populate)
            options.push(...filters.options.populate);
        const attributes = await this.attributeRepository.find(filters.query, Object.assign(Object.assign({}, filters.options), { populate: options }));
        if (!attributes)
            throw new common_1.NotFoundException('Attributes not found');
        return attributes;
    }
    findOne(id) {
        return this.attributeRepository.findOneOrFail(id);
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
        const cars = await this.carRepository.find({
            attributes: { id: { $eq: id } },
        });
        cars.map((car) => {
            const properties = car.properties;
            delete properties[attribute.displayName];
            car.assign(properties);
            this.em.persist(car);
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
        const group = await this.groupRepository.findOne(groupId);
        if (!group)
            throw new common_1.NotFoundException('Group does not exist');
        attribute.group = group;
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async findBy(productId) {
        const attributeQb = this.attributeRepository.createQueryBuilder();
        const response = await attributeQb
            .select(['displayName', 'id', 'propertyKey'])
            .where({ products: { id: { $eq: productId } } })
            .execute('all');
        return response;
    }
};
AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Attribute)),
    __param(2, (0, nestjs_1.InjectRepository)(entities_1.Group)),
    __param(3, (0, nestjs_1.InjectRepository)(entities_1.Part)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map