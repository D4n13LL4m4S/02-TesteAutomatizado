import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://d4n13ll4m4s.github.io/02-TesteAutomatizado/'); // usa baseURL do config
  await page.waitForSelector('form#form-cadastro'); // espera o formulário
});

test('não deve aceitar notas maiores que 10', async ({ page }) => {
  await page.getByLabel('Nome do Aluno').fill('Teste');
  await page.getByLabel('Nota 1').fill('11'); // inválida
  await page.getByLabel('Nota 2').fill('5');
  await page.getByLabel('Nota 3').fill('6');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('As notas devem estar entre 0 e 10.')).toBeVisible();
});

test('deve filtrar aluno pelo nome', async ({ page }) => {
  await page.getByLabel('Nome do Aluno').fill('Ana');
  await page.getByLabel('Nota 1').fill('8');
  await page.getByLabel('Nota 2').fill('8');
  await page.getByLabel('Nota 3').fill('8');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await page.getByLabel('Nome do Aluno').fill('Carlos');
  await page.getByLabel('Nota 1').fill('6');
  await page.getByLabel('Nota 2').fill('6');
  await page.getByLabel('Nota 3').fill('6');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await page.getByPlaceholder('Buscar').fill('Ana');

  await expect(page.getByText('Ana')).toBeVisible();
  await expect(page.getByText('Carlos')).not.toBeVisible();
});

test('deve excluir aluno', async ({ page }) => {
  await page.getByLabel('Nome do Aluno').fill('Joao');
  await page.getByLabel('Nota 1').fill('7');
  await page.getByLabel('Nota 2').fill('7');
  await page.getByLabel('Nota 3').fill('7');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await page.getByRole('button', { name: 'Excluir' }).click();

  await expect(page.getByText('Joao')).not.toBeVisible();
});