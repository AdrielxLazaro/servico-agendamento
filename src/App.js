import { Routes, Route } from 'react-router-dom'; 
import Login from './Login';
import Admin from './Admin';
import Agendamento from './Agendamento';

  function App() {
    return (
      <Routes>
        <Route path='/' element={<Agendamento />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<Login />} />
      </Routes>
    );
  }
 
export default App;