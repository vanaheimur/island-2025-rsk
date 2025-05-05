import * as schema from './db/schema'

import { InferSelectModel } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>

export type Potatoes = InferSelectModel<typeof schema.potatoes>
