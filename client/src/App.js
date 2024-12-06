import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CreateForm from "./components/Forms/createForm";
import Form from "./pages/Form/form";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<createForm />} />
          <Route path="/form/:tag" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
