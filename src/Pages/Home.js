import Scene from "../Components/3d/Scene";
import twitterImg from "../static/images/twitter.png";
import instagramImg from "../static/images/instagram.png";
import "./Home.css";

function Home() {
  return (
    <section className="banner" id="home">
      <div className="contentBx">
        {/*--3d - Scene-- */}
        <Scene />
        <h5 className="logoText">Fl4v.io</h5>
        <div>
          <h4>
            <span>Hello</span>, I'm
          </h4>
          <h2>Flavio Oliveira</h2>
          <h4> A developer with a versatile coding skillset.</h4>
          <p>
            We are a developer with a broad and versatile coding skillset. We
            can help startups and enterprises with prototypes and ideas by
            efficiently building those things into reality. Our expertise lies
            in building MVPs, enterprise software, scalable microservices, REST
            and Socket APIs and deployments in AWS, Azure, DigitalOcean and
            others.{" "}
          </p>
          <a href="#about" class="btn">
            About Me
          </a>
        </div>

        <ul className="sci">
          <li>
            <a href="https://twitter.com/fl4viooliveira">
              <img src={twitterImg} alt="twitter" target="_blank" />
            </a>
          </li>
          <li>
            <a href="#0">
              <img src={instagramImg} alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
