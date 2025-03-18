import { Routes, Route } from "react-router";
import Layout from "./layout";
import Home from "./pages/home/Home";
import City from "./pages/city/City";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="city/:city" element={<City />} />
      </Route>
    </Routes>
  );
}

export default App;
