import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";  // Adjust the import path if necessary
import { ExpenseTracker } from "./pages/expense-tracker/index";  // Adjust the import path if necessary

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Auth />} />
                <Route path="/expense-tracker" element={<ExpenseTracker />} />
            </Routes>
        </Router>
    );
}

export default App;
