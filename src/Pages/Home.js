import Scene from "../Components/3d/Scene";
import twitterImg from "../static/images/twitter.png";
import instagramImg from "../static/images/instagram.png";
import "./Home.css";

function Home() {
  return (
    <section className="banner" id="home">
      <div className="three-scene">
        <Scene />
      </div>
      <div className="contentBx">
        <div className="textBox">
          <h4>
            <span>Hello</span>, I'm
          </h4>
          <h2>Flavio Oliveira</h2>
          <h4> A developer with a versatile coding skillset.</h4>
          <p>
            We can help you get off scratch, projects as startups, prototypes
            ideas, or create a web application for your business. With a good
            skill set, we can build MVPs, enterprise software, scalable
            microservices, REST and Socket APIs, and deployments in AWS, Azure,
            DigitalOcean, etc.{" "}
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
