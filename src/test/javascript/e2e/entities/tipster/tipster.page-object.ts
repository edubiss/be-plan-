import { element, by, ElementFinder } from 'protractor';

export class TipsterComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipster div table .btn-danger'));
  title = element.all(by.css('jhi-tipster div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class TipsterUpdatePage {
  pageTitle = element(by.id('jhi-tipster-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  desempenhoInput = element(by.id('field_desempenho'));
  desempenhoMesInput = element(by.id('field_desempenhoMes'));
  desempenhoAnoInput = element(by.id('field_desempenhoAno'));
  desempenhoTotalInput = element(by.id('field_desempenhoTotal'));
  esporteInput = element(by.id('field_esporte'));
  horariosInput = element(by.id('field_horarios'));
  nrTipsDiaInput = element(by.id('field_nrTipsDia'));
  dataInput = element(by.id('field_data'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setDesempenhoInput(desempenho: string): Promise<void> {
    await this.desempenhoInput.sendKeys(desempenho);
  }

  async getDesempenhoInput(): Promise<string> {
    return await this.desempenhoInput.getAttribute('value');
  }

  async setDesempenhoMesInput(desempenhoMes: string): Promise<void> {
    await this.desempenhoMesInput.sendKeys(desempenhoMes);
  }

  async getDesempenhoMesInput(): Promise<string> {
    return await this.desempenhoMesInput.getAttribute('value');
  }

  async setDesempenhoAnoInput(desempenhoAno: string): Promise<void> {
    await this.desempenhoAnoInput.sendKeys(desempenhoAno);
  }

  async getDesempenhoAnoInput(): Promise<string> {
    return await this.desempenhoAnoInput.getAttribute('value');
  }

  async setDesempenhoTotalInput(desempenhoTotal: string): Promise<void> {
    await this.desempenhoTotalInput.sendKeys(desempenhoTotal);
  }

  async getDesempenhoTotalInput(): Promise<string> {
    return await this.desempenhoTotalInput.getAttribute('value');
  }

  async setEsporteInput(esporte: string): Promise<void> {
    await this.esporteInput.sendKeys(esporte);
  }

  async getEsporteInput(): Promise<string> {
    return await this.esporteInput.getAttribute('value');
  }

  async setHorariosInput(horarios: string): Promise<void> {
    await this.horariosInput.sendKeys(horarios);
  }

  async getHorariosInput(): Promise<string> {
    return await this.horariosInput.getAttribute('value');
  }

  async setNrTipsDiaInput(nrTipsDia: string): Promise<void> {
    await this.nrTipsDiaInput.sendKeys(nrTipsDia);
  }

  async getNrTipsDiaInput(): Promise<string> {
    return await this.nrTipsDiaInput.getAttribute('value');
  }

  async setDataInput(data: string): Promise<void> {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput(): Promise<string> {
    return await this.dataInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TipsterDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipster-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipster'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
