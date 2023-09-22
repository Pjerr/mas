"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const auth_exception_filter_1 = require("./modules/auth/auth-exception.filter");
const express_1 = require("supertokens-node/framework/express");
async function bootstrap() {
    const app = await core_2.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VMS Api')
        .setVersion('1.0')
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => {
            const entityName = controllerKey.replace('Controller', '');
            return `${methodKey}${entityName}`;
        },
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.get(core_1.MikroORM).getMigrator().up();
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: [
            'GET',
            'POST',
            'PATCH',
            'PUT',
            'DELETE',
            'OPTIONS',
            'content-type',
            ...supertokens_node_1.default.getAllCORSHeaders(),
        ],
        credentials: true,
    });
    app.use((0, express_1.middleware)());
    app.use((0, express_1.errorHandler)());
    app.useGlobalFilters(new auth_exception_filter_1.AuthExceptionFilter());
    app.enableShutdownHooks();
    await app.listen(4000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map