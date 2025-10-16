import './App.css'
import EmailVerify from './pages/EmailVerify'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./components/PrivateRoute";
import MainPage from './pages/MainPage'
import QuizSelection from "./pages/quiz/QuizSelection";
import QuizPlay from "./pages/quiz/QuizPlay";
import QuizResult from "./pages/quiz/QuizResult";
import QuizHome from "./pages/quiz/QuizHome";
import Sudoku from "./pages/Entertainment/sudoku/Sudoku";
import TicTacToe from "./pages/Entertainment/TicTacToe/TicTacToe";
import ChessComponent from "./pages/Entertainment/chess/chess";
import BlockBlast from "./pages/Entertainment/BlockBlast/BlockBlast";
import Game2048 from "./pages/Entertainment/Game2048/Game2048";
import Entertainment from "./pages/Entertainment/Entertainment";
import Communication from "./pages/Communication/Communication";
import CommunicationDetails from "./pages/Communication/CommunicationDetails/CommunicationDetails"
import SoftSkillViewer from "./pages/Communication/Softskill/SoftSkillViewer";
import SoftSkillViewers from "./pages/Communication/Softskill/SoftSkillViewers";
import SoftSkillDetail from "./pages/communication/SoftSkill/SoftSkillDetail";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ss" element={<SoftSkillViewer />} />
        <Route path="/sss" element={<SoftSkillViewers />} />
        <Route path="/softskill/:id" element={<SoftSkillDetail />} />
       
        

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/explore" element={<MainPage />} />

          {/* All quiz-related routes are now protected */}
          <Route path="/quiz" element={<QuizHome />} />
          <Route path="/quiz/select" element={<QuizSelection />} />
          <Route path="/quiz/play" element={<QuizPlay />} />
          <Route path="/quiz/result" element={<QuizResult />} />
           <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/chess" element={<ChessComponent />} />
        <Route path="/blockblast" element={<BlockBlast />} />
        <Route path="/game2048" element={<Game2048 />} />
        <Route path="/Communication" element={<Communication />} />
        <Route path="/CommunicationDetails" element={<CommunicationDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
