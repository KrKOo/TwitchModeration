import { Model } from 'objection';
import knex from 'database';

import { User } from 'models';

Model.knex(knex);

export class Identity extends Model {
  id_user!: number;
  provider!: number;
  access_token!: string;
  refresh_token!: string;
  expires_at!: number;

  static get tableName() {
    return 'identity';
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user.id',
          to: 'identity.id_user',
        },
      },
    };
  }
}
