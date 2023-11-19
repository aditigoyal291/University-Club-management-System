import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import Login from "./pages/login";
import Users from "./pages/Users";
import Club from "./pages/Club";
import Events from "./pages/Events";
import Members from "./pages/Members";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/addContact" Component={AddEdit}></Route>
            <Route path="/signup" Component={AddEdit}></Route>
            <Route path="/users" Component={Users}></Route>
            <Route path="/update/:id" Component={AddEdit}></Route>
            <Route path="/view/:id" Component={View}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/club" Component={Club}></Route>
            <Route path="/events" Component={Events}></Route>
            <Route path="/member" Component={Members}></Route>
            {/* <Route path="/" Component={Events}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
