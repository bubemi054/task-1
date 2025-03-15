import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import City from "./pages/city/City";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/city/:id" element={<City />} />
    </Routes>
  );
}

export default App;
