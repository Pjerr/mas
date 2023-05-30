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
exports.ManufacturerService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../core/entities");
const nestjs_1 = require("@mikro-orm/nestjs");
let ManufacturerService = class ManufacturerService {
    constructor(em, manufacturerRepository) {
        this.em = em;
        this.manufacturerRepository = manufacturerRepository;
    }
    async create(payload) {
        const manufacturer = this.em.create(entities_1.Manufacturer, Object.assign({}, payload));
        await this.em.persistAndFlush(manufacturer);
        return manufacturer;
    }
    async find(filters) {
        const manufacturers = await this.manufacturerRepository.find(filters.query, filters.options);
        if (!manufacturers)
            throw new common_1.NotFoundException('Manufacturers not found');
        return manufacturers;
    }
    findOne(id) {
        return this.manufacturerRepository.findOneOrFail(id);
    }
    async update(id, payload) {
        const manufacturer = await this.findOne(id);
        manufacturer.assign(payload);
        await this.em.persistAndFlush(manufacturer);
        return manufacturer;
    }
    async remove(id) {
        const manufacturer = this.em.getReference(entities_1.Manufacturer, id);
        await this.em.removeAndFlush(manufacturer);
    }
};
ManufacturerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Manufacturer)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository])
], ManufacturerService);
exports.ManufacturerService = ManufacturerService;
//# sourceMappingURL=manufacturer.service.js.map