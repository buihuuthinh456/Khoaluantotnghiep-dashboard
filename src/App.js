import React, { useEffect } from "react";
import "./App.css";
// import Routers from './routers'
import { publicRoutes } from "./routers";
import styled from "styled-components";
// import Sidebar from './components/Sidebar';
import Sidebar from "./components_SASS/SideBar";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

import { getInfo } from "./features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import Layout from "./components_SASS/Layout";

import { BrowserRouter } from "react-router-dom";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, [accessToken]);

  return (
    // <div className="App">
    //   <Sidebar />
    //   <Header />
    //   <Container>
    //     <Routers />
    //   </Container>
    //   <ToastContainer
    //       position="top-right"
    //       autoClose={5000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //     />
    // </div>

    // <Router>
    //   <Routes>
    //     {publicRoutes.map((index, route) => {
    //       const Page = route.component;
    //       let DefaultLayout = Layout;
    //       return (
    //         <Route
    //           key={index}
    //           path={route.path}
    //           element={
    //             <DefaultLayout>
    //               <Page />
    //             </DefaultLayout>
    //           }
    //         />
    //       );
    //     })}
    //   </Routes>
    // </Router>
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </BrowserRouter>
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
    </>
  );
}

export default App;

const Container = styled.div`
  padding-top: var(--header-height);
  padding-left: var(--sidebar-width);
`;
