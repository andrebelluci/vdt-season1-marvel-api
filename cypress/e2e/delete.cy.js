describe('DELETE /characters/id', () => {
    context('quando tenho um personagem cadastrado', () => {
    const tochaHumana = {
      name: 'Jhonny Storm',
      alias: 'Tocha Humana',
      team: ['quarteto fantástico'],
      active: true,
    };

    before(() => {
      cy.postCharacter(tochaHumana).then((response) => {
        Cypress.env('characterId', response.body.character_id);
      });
    });

    it('deve remover o personagem pelo id', () => {
      const id = Cypress.env('characterId');
      cy.deleteCharacterById(id).then((response) => {
        expect(response.status).to.eql(204);
      });
    });

    after(() => {
      const id = Cypress.env('characterId');
      cy.getCharacterById(id).then((response) => {
        expect(response.status).to.eql(404);
      });
    });
  });

  context('quando um personagem não existe', () => {
    it('deve retornar 404 ao remover id não cadastrado', () => {
      //https://nddapp.com/object-id-generator.html?_gl=1*1f5y5fx*_ga*MTQ0NzcxNjk2NS4xNjY1MDg0MTkx*_ga_37GXT4VGQK*MTY2ODY5OTQ3MC4xOC4xLjE2Njg3MDEzMTUuMC4wLjA.
      const id = '637661e960552c294703f645';
      cy.deleteCharacterById(id).then((response) => {
        expect(response.status).to.eql(404);
      });
    });
  });
});
