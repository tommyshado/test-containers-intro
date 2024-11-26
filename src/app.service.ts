import { Injectable, Inject } from '@nestjs/common';
import pgPromise from 'pg-promise';

@Injectable()
export class AppService {
  constructor(@Inject('DATABASE_CONNECTION') private db: pgPromise.IDatabase<any>) {};
  async getGreet() {
    const result = await this.db.oneOrNone("select * from greet");
    return result;
  }
}
