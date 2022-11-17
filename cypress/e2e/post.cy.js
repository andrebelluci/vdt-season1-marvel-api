describe('POST /characters', () => {
  context('quando um personagem não existe', () => {
    it('deve cadastrar um personagem', () => {
      const character = {
        name: 'Wanda Maximoff',
        alias: 'Feiticeira Escarlate',
        team: ['vingadores'],
        active: true,
      };

      cy.postCharacter(character).then(function (response) {
        expect(response.status).to.eql(201);
        expect(response.body.character_id.length).to.eql(24);
      });
    });
  });

  context('quando um personagem já existe', () => {
    const character = {
      name: 'Pietro Maximoff',
      alias: 'Mercurio',
      team: ['vingadores da costa oeste', 'irmandade de mutantes'],
      active: true,
    };

    before(() => {
      cy.postCharacter(character).then((response) => {
        expect(response.status).to.eql(201);
      });
    });

    it('não deve cadastrar duplicado', () => {
      cy.postCharacter(character).then((response) => {
        expect(response.status).to.eql(400);
        expect(response.body.error).to.eql('Duplicate character');
      });
    });
  });

  context(
    'Validar os campos obrigatórios para o cadastro do personagem',
    () => {
      it('Validar a obrigatoriedade do nome', () => {
        const character = {
          alias: 'Viúva Negra',
          team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
          active: true,
        };

        cy.postCharacter(character).then(async (response) => {
          expect(response.status).to.eql(400);
          expect(response.body.validation.body.message).to.eql(
            '"name" is required'
          );
        });
      });

      it('Validar a obrigatoriedade do alias', () => {
        const character = {
          name: 'Natasha Romanoff',
          team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
          active: true,
        };

        cy.postCharacter(character).then(async (response) => {
          expect(response.status).to.eql(400);
          expect(response.body.validation.body.message).to.eql(
            '"alias" is required'
          );
        });
      });

      it('Validar a obrigatoriedade do team', () => {
        const character = {
          name: 'Natasha Romanoff',
          alias: 'Viúva Negra',
          active: true,
        };

        cy.postCharacter(character).then(async (response) => {
          expect(response.status).to.eql(400);
          expect(response.body.validation.body.message).to.eql(
            '"team" is required'
          );
        });
      });

      it('Validar a obrigatoriedade do active', () => {
        const character = {
          name: 'Natasha Romanoff',
          alias: 'Viúva Negra',
          team: ['Avengers', 'S.H.I.E.L.D.', 'Vigilantes'],
        };

        cy.postCharacter(character).then(async (response) => {
          expect(response.status).to.eql(400);
          expect(response.body.validation.body.message).to.eql(
            '"active" is required'
          );
        });
      });
    }
  );
});
