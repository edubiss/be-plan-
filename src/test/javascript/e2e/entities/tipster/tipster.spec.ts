import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipsterComponentsPage, TipsterDeleteDialog, TipsterUpdatePage } from './tipster.page-object';

const expect = chai.expect;

describe('Tipster e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipsterComponentsPage: TipsterComponentsPage;
  let tipsterUpdatePage: TipsterUpdatePage;
  let tipsterDeleteDialog: TipsterDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tipsters', async () => {
    await navBarPage.goToEntity('tipster');
    tipsterComponentsPage = new TipsterComponentsPage();
    await browser.wait(ec.visibilityOf(tipsterComponentsPage.title), 5000);
    expect(await tipsterComponentsPage.getTitle()).to.eq('Tipsters');
    await browser.wait(ec.or(ec.visibilityOf(tipsterComponentsPage.entities), ec.visibilityOf(tipsterComponentsPage.noResult)), 1000);
  });

  it('should load create Tipster page', async () => {
    await tipsterComponentsPage.clickOnCreateButton();
    tipsterUpdatePage = new TipsterUpdatePage();
    expect(await tipsterUpdatePage.getPageTitle()).to.eq('Create or edit a Tipster');
    await tipsterUpdatePage.cancel();
  });

  it('should create and save Tipsters', async () => {
    const nbButtonsBeforeCreate = await tipsterComponentsPage.countDeleteButtons();

    await tipsterComponentsPage.clickOnCreateButton();

    await promise.all([
      tipsterUpdatePage.setNomeInput('nome'),
      tipsterUpdatePage.setDesempenhoInput('5'),
      tipsterUpdatePage.setDesempenhoMesInput('5'),
      tipsterUpdatePage.setDesempenhoAnoInput('5'),
      tipsterUpdatePage.setDesempenhoTotalInput('5'),
      tipsterUpdatePage.setEsporteInput('esporte'),
      tipsterUpdatePage.setHorariosInput('horarios'),
      tipsterUpdatePage.setNrTipsDiaInput('5'),
      tipsterUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await tipsterUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');
    expect(await tipsterUpdatePage.getDesempenhoInput()).to.eq('5', 'Expected desempenho value to be equals to 5');
    expect(await tipsterUpdatePage.getDesempenhoMesInput()).to.eq('5', 'Expected desempenhoMes value to be equals to 5');
    expect(await tipsterUpdatePage.getDesempenhoAnoInput()).to.eq('5', 'Expected desempenhoAno value to be equals to 5');
    expect(await tipsterUpdatePage.getDesempenhoTotalInput()).to.eq('5', 'Expected desempenhoTotal value to be equals to 5');
    expect(await tipsterUpdatePage.getEsporteInput()).to.eq('esporte', 'Expected Esporte value to be equals to esporte');
    expect(await tipsterUpdatePage.getHorariosInput()).to.eq('horarios', 'Expected Horarios value to be equals to horarios');
    expect(await tipsterUpdatePage.getNrTipsDiaInput()).to.eq('5', 'Expected nrTipsDia value to be equals to 5');
    expect(await tipsterUpdatePage.getDataInput()).to.contain('2001-01-01T02:30', 'Expected data value to be equals to 2000-12-31');

    await tipsterUpdatePage.save();
    expect(await tipsterUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipsterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tipster', async () => {
    const nbButtonsBeforeDelete = await tipsterComponentsPage.countDeleteButtons();
    await tipsterComponentsPage.clickOnLastDeleteButton();

    tipsterDeleteDialog = new TipsterDeleteDialog();
    expect(await tipsterDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Tipster?');
    await tipsterDeleteDialog.clickOnConfirmButton();

    expect(await tipsterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
