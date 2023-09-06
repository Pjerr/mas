"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_2.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MAS Api')
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
        ],
    });
    app.enableShutdownHooks();
    await app.listen(4000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map