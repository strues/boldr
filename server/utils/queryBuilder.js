import _ from 'lodash';
import { QueryBuilder } from 'objection';

class BaseQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass);

    this._handleSoftDelete();
    this._handleScopes();
  }

  find(...args) {
    if (args.length === 1) {
      return this.findById(...args);
    }

    return this.where(...args);
  }

  save(fields) {
    const id = this.modelClass().idColumn;
    if (!(id in fields)) {
      return this.insert(fields);
    }

    const patchFields = _.assign({}, fields);
    delete patchFields[id];

    return this.patch(patchFields).where(id, fields[id]);
  }

  saveAndFetch(fields) {
    const id = this.modelClass().idColumn;
    if (!(id in fields)) {
      return this.insertAndFetch(fields);
    }

    const patchFields = _.assign({}, fields);
    delete patchFields[id];

    return this.patchAndFetchById(fields[id], patchFields);
  }

// See Here: https://softonsofa.com/tweaking-eloquent-relations-how-to-get-n-related-models-per-parent/
// Also: https://gist.github.com/juavidn/80a8b5cc755330120b690a82469fbfe2

  _handleScopes() {
    if (!this.modelClass().scopes) return;

    const defaultScope = this.modelClass().scopes.default;
    if (defaultScope) {
      this.onBuild((builder) => {
        if (!builder.context().withoutScope) {
          defaultScope(builder);
        }
      });
    }

    _.forEach(this.modelClass().scopes, (func, name) => {
      this[name] = func;
    });
  }

  withoutScope(withoutScope = true) {
    this.context().withoutScope = withoutScope;
    return this;
  }

  _handleSoftDelete() {
    if (!this.modelClass().softDelete) return;

    const softDeleteColumn = this.modelClass().softDeleteColumn;

    this.onBuild((builder) => {
      if (builder.context().onlyTrashed) {
        builder.whereNotNull(softDeleteColumn);
      } else if (!builder.context().withTrashed) {
        builder.whereNull(softDeleteColumn);
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
    return this.dontTouch().patch({ [this.modelClass().softDeleteColumn]: new Date() });
  }

  trash() {
    return this.softDelete();
  }

  forceDelete() {
    return super.delete();
  }

  restore() {
    return this.dontTouch().withTrashed().patch({ [this.modelClass().softDeleteColumn]: null });
  }

  touch() {
    return this.patch({
      updated_at: new Date(),
    });
  }

  dontTouch() {
    this.context().dontTouch = true;
    return this;
  }
}

export default BaseQueryBuilder;
