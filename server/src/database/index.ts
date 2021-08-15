import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';

const env = process.env.NODE_ENV || 'development';

const getKnex = () => {
  const config: Knex.Config = knexConfig[env as keyof object];
  if (!config) {
    throw Error(`Database connect error: invalid environment ${env}`);
  }
  const knexConn = Knex(config);
  // Bind all models to the knex instance
  Model.knex(knexConn);
  return knexConn;
};

export default getKnex();
