import "./About.css";
import flavio from "../static/images/flavio_pc.PNG";

function About() {
  return (
    <section className="about" id="about">
      <div className="title white">
        <h2>About Me</h2>
        <p>
          I'm Flavio, continuously working to improve my web development skills.
        </p>
      </div>
      <div className="content">
        <div className="textBx">
          <p>
            I'm Flavio, a Web developer that focuses on listening and
            understanding the client's needs. My job is to transform the
            project's and ideas into real web applications. I'm continuously
            improving my web development skills with JavaScript, React, Next.js
            and Node.js.
            <br />
            <br />I speak Portuguese, English, and Spanish at the lower level.
            <br />
            <br />I consider the most substantial skill of mine "fast
            adaptation." I could confirm it in the last six years, moving
            country, changing the job, and adapting well in diverse
            environments.
            <br />
            <br />I used to be an athlete in Jiu Jitsu. I just described it
            because this experience helped me push myself to be better day by
            day.
          </p>
        </div>
        <div className="imgBx">
          <img src={flavio} alt="Flavio" />
        </div>
      </div>
    </section>
  );
}

export default About;
