import { GestorEtiquetasPage } from './app.po';

describe('gestor-etiquetas App', function() {
  let page: GestorEtiquetasPage;

  beforeEach(() => {
    page = new GestorEtiquetasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
