"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_car_dto_1 = require("./create-car.dto");
class UpdateCarDto extends (0, mapped_types_1.PartialType)(create_car_dto_1.CreateCarDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCarDto = UpdateCarDto;
//# sourceMappingURL=update-car.dto.js.map