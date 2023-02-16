import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Main from './components/first_page/Main'
import Question from './components/second_page/Question'
import Save from './components/third_page/SaveQuestion';

function App() {
  return (
    <div className="App">
      <h1>Конспект</h1>
      <Router>
        <div>
          <nav>
            <ul className='navbar'>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/question">Вопросы</Link>
              </li>
              <li>
                <Link to="/save_question">Добавить вопрос</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Routes>

            <Route path="/" element={<Main />} />
            <Route path="/question" element={<Question />} />
            <Route path="/save_question" element={<Save />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
