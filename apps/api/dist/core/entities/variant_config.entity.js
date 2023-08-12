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
exports.VariantConfig = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const option_config_entity_1 = require("./option-config.entity");
let VariantConfig = class VariantConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number }, attributeId: { required: true, type: () => String }, attributeName: { required: true, type: () => String }, optionValue: { required: true, type: () => String }, part: { required: true, type: () => String } };
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], VariantConfig.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], VariantConfig.prototype, "price", void 0);
__decorate([
    (0, core_1.Property)({ name: 'attribute_id' }),
    __metadata("design:type", String)
], VariantConfig.prototype, "attributeId", void 0);
__decorate([
    (0, core_1.Property)({ name: 'display_name' }),
    __metadata("design:type", String)
], VariantConfig.prototype, "attributeName", void 0);
__decorate([
    (0, core_1.Property)({ name: 'value' }),
    __metadata("design:type", String)
], VariantConfig.prototype, "optionValue", void 0);
__decorate([
    (0, core_1.Property)({ name: 'part_id' }),
    __metadata("design:type", String)
], VariantConfig.prototype, "part", void 0);
VariantConfig = __decorate([
    (0, core_1.Entity)({
        virtual: true,
        expression: (em, where) => {
            return em
                .createQueryBuilder(option_config_entity_1.OptionConfig, 'c')
                .select([
                'c.id',
                'c.price',
                'o.attribute_id',
                'o.value',
                'a.display_name',
                'c.part_id',
            ])
                .join('c.option', 'o')
                .join('o.attribute', 'a')
                .where(where);
        },
    })
], VariantConfig);
exports.VariantConfig = VariantConfig;
//# sourceMappingURL=variant_config.entity.js.map