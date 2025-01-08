import {generateApi} from "swagger-typescript-api";
import path from "node:path";

const PATH = path.resolve(process.cwd(), "./src/types");
const SWAGGERS = Object.entries({
    "https://airqua.uk/api/swagger/openapi.yml": "domain.ts",
});

(async () => {
    for (const [url, name] of SWAGGERS) {
        await generateApi({
            name,
            url,
            output: PATH,
            generateClient: false,
            generateUnionEnums: true,
            httpClientType: 'axios',
        })
    }
})();