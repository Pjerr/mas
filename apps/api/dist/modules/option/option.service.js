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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const attribute_option_1 = __importDefault(require("../../core/entities/attribute-option"));
let OptionService = class OptionService {
    constructor(em) {
        this.em = em;
    }
    async create(createOptionDto) {
        const option = this.em.create(attribute_option_1.default, Object.assign({}, createOptionDto));
        await this.em.persistAndFlush(option);
        return option;
    }
    findAll() {
        return this.em.find(attribute_option_1.default, {});
    }
    findOne(id) {
        return this.em.findOneOrFail(attribute_option_1.default, id);
    }
    async update(id, updateOptionDto) {
        const option = await this.findOne(id);
        option.assign(updateOptionDto);
        await this.em.persistAndFlush(option);
        return option;
    }
    async remove(id) {
        const option = this.em.getReference(attribute_option_1.default, id);
        await this.em.removeAndFlush(option);
    }
};
OptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], OptionService);
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map