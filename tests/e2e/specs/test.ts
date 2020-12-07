import { Server } from 'miragejs';
import { makeServer } from '../../../src/server';

describe('Test', () => {
  let server: Server

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  })

  afterEach(() => {
    server.shutdown();
  })

  it('Visits the app root url and checks first header content', () => {
    cy.visit('/');
    cy.contains('h1', 'TodosApp');
  });

  it('Visits the app root and adds new todo', () => {
    cy.visit('/');
    cy.get('form input').type('New todo item{enter}');
    cy.get('#todosContainer .todoBlock').first().contains('New todo item');
  });
})
