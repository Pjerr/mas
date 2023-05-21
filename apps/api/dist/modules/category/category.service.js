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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../core/entities");
const postgresql_1 = require("@mikro-orm/postgresql");
let CategoryService = class CategoryService {
    constructor(em) {
        this.em = em;
    }
    async create(createCategoryDto) {
        const category = this.em.create(entities_1.Category, Object.assign(Object.assign({}, createCategoryDto), { parentId: createCategoryDto.parentId, children: createCategoryDto.childrenIds }), { persist: true });
        this.em.flush();
        return category;
    }
    findAll() {
        return this.em.find(entities_1.Category, {});
    }
    findOne(id) {
        return this.em.findOne(entities_1.Category, id);
    }
    update(id, updateCategoryDto) {
        return this.em.nativeUpdate(entities_1.Category, id, Object.assign(Object.assign({}, updateCategoryDto), { parentId: updateCategoryDto.parentId, children: updateCategoryDto.childrenIds }));
    }
    remove(id) {
        const category = this.em.findOneOrFail(entities_1.Category, id);
        return this.em.removeAndFlush(category);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map