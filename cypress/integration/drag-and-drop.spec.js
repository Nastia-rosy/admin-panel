describe('Drag and drop', () => {
  it('upload photo', () => {
    cy.visit('http://localhost:3000/')
    const fileName = 'cat.jpg';
    const fileNameError = 'react.svg';
      cy.get('[data-cy="dropzone"]').attachFile(fileNameError, { subjectType: 'drag-n-drop' })
      cy.get('[data-cy="dropzone"]').attachFile(fileName, { subjectType: 'drag-n-drop' })
  })
});
