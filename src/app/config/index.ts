import dotenv from 'dotenv';
import path from 'path';

//dotenv.config({ path: path.join(process.cwd(), '.env') });
const envPath = path.join(process.cwd(), '.env');
dotenv.config({ path: envPath });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
