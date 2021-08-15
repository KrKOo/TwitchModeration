import { Model } from 'objection';
import knex from 'database';

import { Identity } from 'models';

Model.knex(knex);

export class User extends Model {
  username!: string;
  email!: string;
  picture?: string;
  created_at?: number;
  last_login?: number;
  identity!: any;

  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      identity: {
        relation: Model.HasManyRelation,
        modelClass: Identity,
        join: {
          from: 'user.id',
          to: 'identity.id_user',
        },
      },
    };
  }
}
