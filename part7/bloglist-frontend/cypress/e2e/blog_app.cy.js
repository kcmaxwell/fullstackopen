describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Kristopher Maxwell',
      username: 'kcmaxwell',
      password: 'password123',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);

    const secondUser = {
      name: 'Not Kristopher',
      username: 'notkcmaxwell',
      password: 'notpassword123',
    };
    cy.request('POST', 'http://localhost:3003/api/users', secondUser);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('Login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username-input').type('kcmaxwell');
      cy.get('#password-input').type('password123');
      cy.get('#login-button').click();

      cy.get('.success-message')
        .should('contain', 'Kristopher Maxwell logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username-input').type('kcmaxwell');
      cy.get('#password-input').type('wrongPassword');
      cy.get('#login-button').click();

      cy.get('.error-message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'kcmaxwell', password: 'password123' });
    });

    it('A blog can be created', () => {
      cy.contains('view').should('not.exist');

      cy.contains('Add new blog').click();

      cy.get('#title-input').type('New title');
      cy.get('#author-input').type('New author');
      cy.get('#url-input').type('New url');
      cy.get('#create-blog-button').click();

      cy.get('.success-message')
        .should('contain', 'New blog added: New title by New author')
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.contains('view').should('exist');
    });

    it('A blog can be liked', () => {
      const newBlog = {
        title: 'New title',
        author: 'New author',
        url: 'New url',
      };
      cy.createBlog(newBlog);

      cy.contains('view').click();

      cy.get('#likes').should('contain', '0');
      cy.get('.like-button').click();
      cy.get('#likes').should('contain', '1');
    });

    it('The user that created a blog can delete it', () => {
      const newBlog = {
        title: 'New title',
        author: 'New author',
        url: 'New url',
      };
      cy.createBlog(newBlog);

      cy.contains('view').click();

      cy.get('#delete-button').click();

      cy.contains('view').should('not.exist');
    });

    it('A user cannot delete another user\'s blog', () => {
      const newBlog = {
        title: 'New title',
        author: 'New author',
        url: 'New url',
      };
      cy.createBlog(newBlog);

      cy.logout();

      cy.login({ username: 'notkcmaxwell', password: 'notpassword123' });
      cy.contains('view').click();
      cy.get('#delete-button').click();

      cy.get('.error-message')
        .should('contain', 'Cannot delete another user\'s blog');
    });

    it('The blogs are ordered according to likes, most likes first', () => {
      const mostLikesBlog = {
        title: 'Most likes',
        author: 'Most liked',
        url: 'New url',
      };

      const secondMostLikesBlog = {
        title: 'Second most likes',
        author: 'Second most liked',
        url: 'New url',
      };

      const leastLikesBlog = {
        title: 'Least likes',
        author: 'Least liked',
        url: 'New url',
      };

      cy.createBlog(leastLikesBlog);
      cy.createBlog(secondMostLikesBlog);
      cy.createBlog(mostLikesBlog);

      cy.contains('Most likes').find('.show-button').click();
      cy.contains('Most likes').parent().find('.like-button').as('mostLikesButton');
      cy.get('@mostLikesButton').click();
      cy.get('@mostLikesButton').click();
      cy.get('@mostLikesButton').click();

      cy.contains('Second most likes').find('.show-button').click();
      cy.contains('Second most likes').parent().find('.like-button').as('secondMostLikesButton');
      cy.get('@secondMostLikesButton').click();
      cy.get('@secondMostLikesButton').click();

      cy.get('.blog-content').eq(0).should('contain', 'Most likes');
      cy.get('.blog-content').eq(1).should('contain', 'Second most likes');
      cy.get('.blog-content').eq(2).should('contain', 'Least likes');
    });
  });
});
