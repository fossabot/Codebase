"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: ['http://localhost:4200'],
        },
    });
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.listen(3000).then(() => {
        console.log('YEAH!! http://localhost:3000');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map