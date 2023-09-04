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
exports.GroupSubscriber = void 0;
const entities_1 = require("../../core/entities");
const index_config_1 = require("./index.config");
const inject_meilisearch_decorator_1 = require("../meilisearch/inject-meilisearch.decorator");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const meilisearch_1 = __importDefault(require("meilisearch"));
let GroupSubscriber = class GroupSubscriber {
    constructor(em, meiliSearchClient) {
        this.em = em;
        this.meiliSearchClient = meiliSearchClient;
        em.getEventManager().registerSubscriber(this);
    }
    async initializeIndex() {
        this.index = await this.meiliSearchClient
            .index(index_config_1.index_key_group)
            .updateSettings(index_config_1.updateGroupSettings);
    }
    getSubscribedEntities() {
        return [entities_1.Group];
    }
    async afterCreate({ entity: group }) {
        group.populate(['attributes']);
        await this.meiliSearchClient
            .index(index_config_1.index_key_group)
            .addDocuments([(0, index_config_1.generateGroupDocument)(group)]);
    }
    async afterUpdate({ entity: group }) {
        const groupDocument = await this.em.findOne(entities_1.GroupDocument, {
            id: group.id,
        });
        await this.meiliSearchClient
            .index(index_config_1.index_key_group)
            .updateDocuments([groupDocument]);
    }
    async afterDelete(args) {
        await this.meiliSearchClient
            .index(index_config_1.index_key_group)
            .deleteDocument(args.entity.id);
    }
};
GroupSubscriber = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, inject_meilisearch_decorator_1.InjectMeiliSearch)()),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        meilisearch_1.default])
], GroupSubscriber);
exports.GroupSubscriber = GroupSubscriber;
//# sourceMappingURL=group.subscriber.js.map