import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import APIResponse from './helpers/mockedDataAPI';
import App from './App';
import Table from './Components/Table';
import RequisitionProvider from './Context/RequisitionProvider';

const mockGlobalFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(APIResponse)
    }));
};

describe('1 - Testa a requisição à API e se a tabela está sendo preenchida.', () => {
  beforeAll(mockGlobalFetch);
  beforeEach(cleanup);

  it('Testa se a requisição para o endpoint /planets está acontecendo', () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se a tabela está sendo preenchida com os dados da API', () => {
    render(<RequisitionProvider>
      <Table />
    </RequisitionProvider>);

    const planetsNames = [];
    const planetsInfo = APIResponse.results;
    planetsInfo.forEach(({ name }) => planetsNames.push(name));

    planetsNames.forEach(async (planet) => {
      const planetName = await screen.findByText(planet);
      expect(planetName).toBeInTheDocument()
    });
  });

});

describe('2 - Testa o input de filtro por nome', () => {
  beforeAll(mockGlobalFetch);
  beforeEach(cleanup);

  it('Testa se o input para filtrar por nome é renderizado na tela', async () => {
    render(<App />);
    
    const inputName = await screen.findByTestId('name-filter');
    expect(inputName).toBeInTheDocument();
  });

  //it('Testa se a tabela é filtrada quando o usuário digita a letra "a" no input', async () => {
   /*  render(<App />);
    
    const inputName = await screen.findByTestId('name-filter');
    const planets = await screen.findAllByTestId('planet-name');
    console.log(planets);

    expect(inputName).toBeInTheDocument(); */
    /*userEvent.type(inputName, 'a');
    const planetWithoutLetterA = await screen.findByText('Hoth');
    const planetWithLetterA = await screen.findByText('Alderaan');

    await expect(planetWithoutLetterA).not.ToBeInTheDocument();
    expect(planetWithLetterA).toBeInTheDocument(); */
 // });

});
