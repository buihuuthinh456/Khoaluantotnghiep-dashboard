import React from 'react';
import './App.css';
import Routers from './routers'
import styled from 'styled-components'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Header />
      <Container>
        <Routers />
      </Container>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}

export default App;

const Container = styled.div`
  padding-top: var(--header-height);
  padding-left: var(--sidebar-width);
`
