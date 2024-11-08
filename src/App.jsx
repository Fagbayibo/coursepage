import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewCoursePage from "./Pages/NewCoursePage";
import CreateCoursePage from "./Pages/CreateCoursePage";

function App() {
  return (
    <Router> {/* Wrap with Router */}
      <Routes>
        <Route path="/" element={<NewCoursePage />} />
        <Route path="/create" element={<CreateCoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
