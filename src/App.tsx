import "./App.css";
import React from "react";
import Home from "./pages/home";
import Todo from "./pages/todo";
import NoMatch from "./components/noMatch";
import Loading from "./components/loading";
import { Routes, Route } from "react-router-dom";
import Edit from "./pages/edit";

export enum RoutePath {
  HOME = "/",
  TODO = "todo/",
  EDIT = "edit/",
}
function App() {
  return (
    <Routes>
      <Route path={RoutePath.HOME}>
        <Route
          index
          element={
            <React.Suspense fallback={<Loading />}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path={`${RoutePath.TODO}:id`}
          element={
            <React.Suspense fallback={<Loading />}>
              <Todo />
            </React.Suspense>
          }
        />
        <Route
          path={`${RoutePath.TODO}:id/edit/`}
          element={
            <React.Suspense fallback={<Loading />}>
              <Edit />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
