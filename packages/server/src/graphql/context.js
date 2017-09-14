import uuid from 'uuid';
import ValidationError from '../errors/validationError';
import { getClient } from '../services/pubsub';
import models from '../models';
import dataloaders from './loaders/index';

class Context {
  constructor({ user = null }) {
    // Generate a new context id for the request.
    this.id = uuid.v4();

    // Load the current logged in user to `user`, otherwise this'll be null.
    if (user) {
      this.user = user;
    }
    this.ValidationError = ValidationError;
    this.models = models;
    // Create the loaders.
    this.loaders = dataloaders(this);

    // Bind the publish/subscribe to the context.
    this.pubsub = getClient();
  }
}
export default Context;
