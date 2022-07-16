import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repository from "./pages/Repo";

const RoutesProject = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          exact
          path="/repositorio/:repositorio"
          element={<Repository />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProject;
