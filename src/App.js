import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Landing from './pages/Landing';
import EditEmp from './pages/EditEmp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
   <Header></Header>
<Routes>
  <Route path='/' element={<Landing></Landing>}></Route>
  <Route path='/edit/:id' element={<EditEmp></EditEmp>}></Route>
  </Routes>   
  <Footer></Footer>
    </div>
  );
}

export default App;
