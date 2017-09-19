import path from 'path';
import fs from 'fs-extra';
import dotenv from 'dotenv';
import { resolveFromRoot } from './paths';

export default function loadEnv() {
  // First load anv env specific files
  const env = process.env.NODE_ENV || 'production';
  const envSpecificPath = resolveFromRoot(`./.env.${env}`);

  if (fs.existsSync(envSpecificPath)) {
    console.log(`Loading environment variables from ${envSpecificPath}`);
    dotenv.config({ path: envSpecificPath });
  }

  // Then load any generic .env "overides"
  const envPath = resolveFromRoot('./.env');
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment variables from ${envPath}`);
    dotenv.config({ path: envPath });
  }
}
