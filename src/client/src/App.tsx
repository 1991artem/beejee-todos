import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import Header from './modules/header';
import { store } from './redux/store';
import AppRouter from './router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
