import { DataSource } from 'typeorm'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import migrations from './migrations'
import { Applicant } from '../applicant/entities/applicant.entity'
import { Document } from '../document/entities/document.entity'

function strict(name: string): string | undefined {
  if (!process.env[name]) {
    console.error(`missing environment variable '${name}'`)
    process.exit(1)
  }
  return process.env[name]
}

const ENV_FILE = `.env`

if (!fs.existsSync(ENV_FILE)) {
  console.error(`Configuration error: ${ENV_FILE} not exists`)
  process.exit(1)
}

dotenv.config({ path: ENV_FILE })

export default new DataSource({
  type: strict('DATABASE_TYPE') as any,
  host: strict('DATABASE_HOST'),
  username: strict('DATABASE_USER'),
  password: strict('DATABASE_PASSWORD'),
  database: strict('DATABASE_DATABASE'),
  port: +strict('DATABASE_PORT')!,
  synchronize: false,
  entities: [Applicant, Document],
  migrations,
  migrationsRun: true,
  migrationsTableName: process.env.DATABASE_MIGRATIONS_TABLE_NAME,
})
