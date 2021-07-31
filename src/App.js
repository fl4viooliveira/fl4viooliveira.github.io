import Home from "./Pages/Home";
import Header from "./Components/Header";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Work from "./Pages/Work";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";
import "./App.css";
import { ContactShadows } from "@react-three/drei";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <About />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
