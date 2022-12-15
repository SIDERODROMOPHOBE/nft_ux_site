import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ChainInfo from "./pages/chaininfo";
import FakeBayc from "./pages/FakeBayc";
import FakeBayc2 from "./pages/FakeBaycView";


/*import NotFound from "./pages/NotFound";

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
        <Route path="/FakeBayc" element={<FakeBayc/>}/>
        <Route path="/FakeBayc/:suu" element={<FakeBayc2/>}/>
    </Routes>
  );
}

export default AppRoutes;