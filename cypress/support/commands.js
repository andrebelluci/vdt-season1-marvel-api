// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', function () {
  cy.api({
    method: 'POST',
    url: '/sessions',
    body: {
      email: 'andrebelluci@gmail.com',
      password: 'qa-cademy',
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eql(200);
    Cypress.env('id', response.body.user._id);
    Cypress.env('token', response.body.token);
  });
});

Cypress.Commands.add('back2ThePast', function () {
  cy.api({
    method: 'DELETE',
    url: '/back2thepast/' + Cypress.env('id'),
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eql(200);
  });
});

//POST requisição que testa o cadastro de personagem
Cypress.Commands.add('postCharacter', function (payload) {
  cy.api({
    method: 'POST',
    url: '/characters',
    body: payload,
    headers: {
      Authorization: Cypress.env('token'),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

//GET requisição que testa a obetenção de personagens
Cypress.Commands.add('getCharacters', function () {
  cy.api({
    method: 'GET',
    url: '/characters',
    headers: {
      Authorization: Cypress.env('token'),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

//GET requisição que testa a obetenção de personagem por ID
Cypress.Commands.add('getCharacterById', function (character_id) {
    cy.api({
      method: 'GET',
      url: `/characters/${character_id}`,
      headers: {
        Authorization: Cypress.env('token'),
      },
      failOnStatusCode: false,
    }).then((response) => {
      return response;
    });
  });

//GET requisição que testa a obetenção de personagem por nome
Cypress.Commands.add('searchCharacters', function (characterName) {
  cy.api({
    method: 'GET',
    url: '/characters',
    qs: { name: characterName },
    headers: {
      Authorization: Cypress.env('token'),
    },    
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add('populateCharacters', function (characters) {
  characters.forEach((character) => {
    cy.postCharacter(character).then(function (response) {
      expect(response.status).to.eql(201);
      expect(response.body.character_id.length).to.eql(24);
    });
  });
});

//DELETE requisição que remove personagem por ID
Cypress.Commands.add('deleteCharacterById', function (character_id) {
    cy.api({
      method: 'DELETE',
      url: `/characters/${character_id}`,
      headers: {
        Authorization: Cypress.env('token'),
      },
      failOnStatusCode: false,
    }).then((response) => {
      return response;
    });
  });