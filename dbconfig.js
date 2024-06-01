import { config } from 'dotenv';
import { join } from 'path';

config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
} = process.env;

export const dbConfig = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  synchronize: true,

  
};


module.exports = config