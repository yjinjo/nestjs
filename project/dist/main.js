"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const PORT = process.env.PORT;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map