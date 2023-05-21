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
exports.AttributeService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../core/entities");
let AttributeService = class AttributeService {
    constructor(em) {
        this.em = em;
    }
    async create(createAttributeDto) {
        const attribute = this.em.create(entities_1.Attribute, Object.assign(Object.assign({}, createAttributeDto), { group: createAttributeDto.groupId }));
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    findAll() {
        return this.em.find(entities_1.Attribute, {});
    }
    findOne(id) {
        return this.em.findOneOrFail(entities_1.Attribute, id);
    }
    async update(id, updateAttributeDto) {
        const attribute = await this.findOne(id);
        attribute.assign(attribute);
        await this.em.persistAndFlush(attribute);
        return attribute;
    }
    async remove(id) {
        const attribute = this.em.getReference(entities_1.Attribute, id);
        await this.em.remove(attribute).flush();
    }
};
AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map