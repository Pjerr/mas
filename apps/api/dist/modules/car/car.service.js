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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const entities_1 = require("../../core/entities");
let CarService = class CarService {
    constructor(em) {
        this.em = em;
    }
    async create(createCarDto) {
        const car = this.em.create(entities_1.Car, Object.assign(Object.assign({}, createCarDto), { attributes: createCarDto.attributeIds }));
        await this.em.persistAndFlush(car);
        return car;
    }
    findAll() {
        return this.em.find(entities_1.Car, {});
    }
    findOne(id) {
        return this.em.findOneOrFail(entities_1.Car, id);
    }
    async update(id, updateCarDto) {
        const car = await this.findOne(id);
        car.assign(updateCarDto);
        await this.em.persistAndFlush(car);
        return car;
    }
    async remove(id) {
        const car = this.em.getReference(entities_1.Car, id);
        await this.em.remove(car).flush();
    }
};
CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map