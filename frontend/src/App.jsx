import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/" element={<div>Welcome! Go to <a href="/drivers">Drivers</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;
