import Dashboard from './components/dash';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1e1e1e;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const theme = {
  background: '#1e1e1e',
  color: '#ffffff'
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <h1>Dashboard</h1>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
