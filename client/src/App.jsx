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
import SpeakingPage from "./pages/Communication/CommunicationDetails/SpeakingPage";
import ListeningPage from "./pages/Communication/CommunicationDetails/ListeningPage";
import ReadingCrud from "./pages/Communication/CommunicationDetails/ReadingCrud";
import ReadingView from "./pages/Communication/CommunicationDetails/ReadingView";
import AttitudePage from "./pages/communication/AttitudePage/AttitudePage";


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
        <Route path="/softskills-details" element={<SoftSkillViewers />} />
        <Route path="/softskill/:id" element={<SoftSkillDetail />} />
        <Route path="/speakingPage" element={<SpeakingPage />} />
       <Route path="/ListeningPage" element={<ListeningPage />} />
       <Route path="/Readingview" element={<ReadingView />} />
        <Route path="/attitude-details" element={<AttitudePage />} />


        <Route path="admin/reading" element={<ReadingCrud token={localStorage.getItem("token")} />} />
       <Route path="admin/softskill" element={<SoftSkillViewer />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
