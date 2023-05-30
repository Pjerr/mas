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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../core/entities");
const nestjs_1 = require("@mikro-orm/nestjs");
let GroupService = class GroupService {
    constructor(em, groupRepository) {
        this.em = em;
        this.groupRepository = groupRepository;
    }
    async create(payload) {
        const group = this.groupRepository.create(Object.assign({}, payload));
        await this.em.persistAndFlush(group);
        return group;
    }
    async find(filters) {
        const groups = await this.groupRepository.find(filters.query, filters.options);
        if (!groups)
            throw new common_1.NotFoundException('Groups not found');
        return groups;
    }
    async findOne(id) {
        const group = await this.groupRepository.findOneOrFail(id);
        return group;
    }
    async update(id, payload) {
        const group = await this.findOne(id);
        group.assign(group);
        await this.em.persistAndFlush(group);
        return group;
    }
    async remove(id) {
        const group = await this.groupRepository.find(id, {
            populate: ['attributes', 'attributes.options'],
        });
        if (!group)
            throw new common_1.NotFoundException('Group does not exist');
        await this.em.removeAndFlush(group);
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectRepository)(entities_1.Group)),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        postgresql_1.EntityRepository])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map