import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import * as pgPromise from "pg-promise";
import "dotenv/config";
import { ConfigModule } from "@nestjs/config";

const pgp = pgPromise();

const configApp = {
    connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:VhHEA42yfOTG@ep-holy-dew-a2zdmjkm.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    ssl: {
        rejectUnauthorized: false,
    },
}

const dbApp = pgp(configApp);

describe("AppService", () => {
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [AppService, {
                provide: 'DATABASE_CONNECTION',
                useValue: dbApp,
            }],
        }).compile();

        appService = app.get<AppService>(AppService);
    });

    describe("get greeting", () => {
        it("should return the data", async () => {
            expect(await appService.getGreet()).toEqual({id: 1, greet: "molo"});
        });
    });
});