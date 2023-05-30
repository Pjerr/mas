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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const attribute_option_1 = __importDefault(require("../../core/entities/attribute-option"));
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
let OptionService = class OptionService {
    constructor(em, optionRepository, attributeRepository) {
        this.em = em;
        this.optionRepository = optionRepository;
        this.attributeRepository = attributeRepository;
    }
    async create(payload) {
        const option = this.optionRepository.create(Object.assign({}, payload));
        await this.em.persistAndFlush(option);
        return option;
    }
    async multipleCreate(payloads) {
        const options = payloads.map((payload) => this.optionRepository.create(Object.assign({}, payload)));
        return options;
    }
    async find(filters) {
        const options = await this.optionRepository.find(filters.query, filters.options);
        if (!options)
            throw new common_1.NotFoundException('Options not found');
        return options;
    }
    findOne(id) {
        const option = this.optionRepository.findOneOrFail(id);
        return option;
    }
    async update(id, payload) {
        const option = await this.findOne(id);
        option.assign(payload);
        await this.em.persistAndFlush(option);
        return option;
    }
    async remove(id) {
        const option = this.attributeRepository.getReference(id);
        if (!option)
            throw new common_1.NotFoundException('Option not found');
        await this.em.removeAndFlush(option);
    }
    async removeMany(ids) {
        const optionRefs = ids.map((id) => this.optionRepository.getReference(id));
        await this.em.removeAndFlush(optionRefs);
    }
    async updateAttributeRelation(id, attribtueId) {
        const option = await this.findOne(id);
        const attribtue = await this.attributeRepository.findOne(attribtueId);
        if (!attribtue)
            throw new common_1.NotFoundException('Attribute not found');
        option.attributeId = attribtue.id;
        await this.em.persistAndFlush(option);
        return option;
    }
};
OptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(attribute_option_1.default)),
    __param(2, (0, nestjs_1.InjectRepository)(entities_1.Attribute)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository])
], OptionService);
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map