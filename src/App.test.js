import { render, screen, waitFor } from '@testing-library/react'
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from './Pages/Home';
import Pokemon from './Pages/Pokemon';
import userEvent from '@testing-library/user-event';

const routerHash = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/*", element: <Pokemon /> },
    ],
  },
]);

describe('Testes do Navbar', () => {
   test('Deve renderizar os Botões de tipo', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={routerHash} />
      </Provider>
    );
    const dark = screen.getByText('Dark');
    expect(dark).toBeInTheDocument();
  }); 
   
   test('Deve renderizar o input de pesquisa', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={routerHash} />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search Pokemon for Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });
  
  test('Deve digitar no input de pesquisa', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={routerHash} />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search Pokemon for Name');
    userEvent.type(input, 'char');
    expect(input).toHaveValue('char');
  }); 

 /*   test('Deve chamar a função ao clicar no botão', () => {
    const função = jest.fn(() => console.log('Função Chamada'));
    render(<button onClick={função}>teste</button>);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(função).toHaveBeenCalled();
  });  */
});