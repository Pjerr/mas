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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
let CategoryService = class CategoryService {
    constructor(em, categoryRepository) {
        this.em = em;
        this.categoryRepository = categoryRepository;
    }
    async create(payload) {
        const category = this.categoryRepository.create(Object.assign(Object.assign({}, payload), { parentId: payload.parentId, children: payload.childrenIds }));
        await this.em.persistAndFlush(category);
        return category;
    }
    async find(filters) {
        const categories = await this.categoryRepository.find(filters.query, filters.options);
        if (!categories)
            throw new common_1.NotFoundException('Categories not found');
        categories.forEach((category) => category.children.populated(false));
        return categories;
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOneOrFail(id);
        return category;
    }
    async update(id, payload) {
        const category = await this.findOne(id);
        category.assign(payload);
        await this.em.persistAndFlush(category);
        return category;
    }
    async remove(id) {
        const category = await this.categoryRepository.findOneOrFail(id, {
            populate: ['children'],
        });
        await this.em.removeAndFlush(category);
    }
    async updateRelation(id, payload) {
        const child = await this.categoryRepository.findOneOrFail(id);
        if (!payload.childrenIds.length || !payload.parentId) {
            throw new common_1.BadRequestException('ChildrenIds or ParentId missing from payload');
        }
        if (payload.parentId && id === payload.parentId) {
            throw new common_1.BadRequestException('Parend and children id are equal');
        }
        const parentId = this.categoryRepository.getReference(payload.parentId).id;
        child.parentId = parentId;
        await this.em.persistAndFlush(child);
        return child;
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Category)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        core_1.EntityRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map