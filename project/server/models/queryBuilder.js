import { QueryBuilder } from 'objection';
import _debug from 'debug';

const debug = _debug('boldr:server:models:querybuilder');

class BaseQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass);

    this._handleSoftDelete();
  }

  find(...args) {
    if (args.length === 1) {
      return this.findById(...args);
    }

    return this.where(...args);
  }

  _handleSoftDelete() {
    const model = this.modelClass();
    if (!model.softDelete) {
      return;
    }

    const softDeleteColumn = `${model.tableName}.${model.softDeleteColumn}`;

    this.onBuild(builder => {
      if (!builder.isFindQuery() || builder.context().withTrashed) {
        return;
      }

      builder.wrapWhere();

      if (builder.context().onlyTrashed) {
        builder.where(q => q.whereNotNull(softDeleteColumn));
      } else {
        builder.where(q => q.whereNull(softDeleteColumn));
      }
    });
  }

  withTrashed(withTrashed = true) {
    this.context().withTrashed = withTrashed;
    return this;
  }

  onlyTrashed(onlyTrashed = true) {
    this.context().onlyTrashed = onlyTrashed;
    return this;
  }

  delete() {
    if (!this.modelClass().softDelete) {
      return super.delete();
    }

    return this.softDelete();
  }

  softDelete() {
    return this.dontTouch().patch({
      [this.modelClass().softDeleteColumn]: new Date().toISOString(),
    });
  }

  trash() {
    return this.softDelete();
  }

  forceDelete() {
    return super.delete();
  }

  restore() {
    return this.dontTouch()
      .withTrashed()
      .patch({
        [this.modelClass().softDeleteColumn]: null,
      });
  }

  touch() {
    return this.patch({
      updated_at: new Date().toISOString(),
    });
  }

  dontTouch() {
    this.context().dontTouch = true;
    return this;
  }
}

export default BaseQueryBuilder;
