import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <ToastContainer position="top-center" />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/addContact" Component={AddEdit}></Route>
            <Route path="/update/:id" Component={AddEdit}></Route>
            <Route path="/view/:id" Component={View}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
