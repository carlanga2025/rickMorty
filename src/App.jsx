import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./pages/Character";
import Home from "./pages/Home";
import NotFound from "./pages/error/NotFound";
import Episodes from "./pages/Episodes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/character" element={<Character />}></Route>
        <Route path="/episodes" element={<Episodes />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
