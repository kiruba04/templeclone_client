
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Admin from "./pages/admin/admin";
//Registeration
import Volunteer from './pages/volunteer/volunteerpage';
import Special from './pages/special/special';
import Trustee from './pages/Trustee/trustee';

import Historypage from './pages/historypage/Historypage';
import Gallerpage from './pages/gallery/gallery'
import Poojapage from './pages/poojapage/poojapage';
import Festivalpage from './pages/festivalpage/Festivalpage';
import Eventpage from './pages/eventpage/events';
import Contact from './pages/contact/Contact';
import Feedback from './pages/Feedback/Feedbak';
import Feedbackreview from './pages/feedbackreview/feedbackreview';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
   <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path ="/admin" element ={<Admin />}/>
        {/*REGISTERATION*/}
        <Route path="/addvounteer" element ={<Volunteer/>}/>
        <Route path="/addspecialdevotee" element ={<Special/>}/>
        <Route path="/addtrustee" element ={<Trustee/>}/>

        <Route path="/history" element ={<Historypage />} />
        <Route path="/gallery" element={<Gallerpage/>}/>
        <Route path='/pooja' element={<Poojapage/>}/>
        <Route path='/festival' element={<Festivalpage/>}/>
        <Route path='/event' element={<Eventpage/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/feedbackreview" element={<Feedbackreview/>}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App;
