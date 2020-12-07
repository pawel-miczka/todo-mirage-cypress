import { createServer, Model } from 'miragejs';
import { Todo } from './types/Todo';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      todo: Model,
    },

    routes() {
      this.urlPrefix = 'http://localhost:3000';
      this.namespace = 'api';

      this.post('/todo', (schema, request) => {
        const todo: Todo = JSON.parse(request.requestBody);

        return todo;
      })
    },
  })

  return server
}