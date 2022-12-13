import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ChainInfo from "./pages/chaininfo";
/*import NotFound from "./pages/NotFound";
import FakeBayc from "./pages/FakeBayc";
import FakeBaycTokenInfo from "./pages/FakeBaycTokenInfo";
import FakeNefturians from "./pages/FakeNefturians";
import FakeNefturiansUserInfo from "./pages/FakeNefturiansUserInfo";
import FakeMeebits from "./pages/FakeMeebits";
import WrongNetwork from "./pages/WrongNetwork";*/

function AppRoutes() {

  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chai-ninfo" element={<ChainInfo />} />
    </Routes>
  );
}

export default AppRoutes;