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
            I'm Flavio, continuously working to improve my web development
            skills on the frontend, basically using React, Svelte, CSS3 and
            HTML5. On the backend, we are mainly developing using the Django
            framework, Python and SQL database. I'm working as a freelancer to
            develop web solutions for projects with scalable perspectives and
            integrate Django Rest API with the Svelte frontend. In this way, we
            could see some fantastic plans, projects, and dreams get off the
            paper to reality.
            <br />
            <br />
            I speak Portuguese, English, and Spanish at the lower level.
            <br />
            I consider the most substantial skill of mine "fast adaptation." I
            could confirm it in the last six years, moving country, changing the
            job, and adapting well in diverse environments.
            <br />
            <br />I used to be an athlete and coach in Jiu Jitsu and Paraglider.
            I just described it because this experience helped me to push myself
            to be better day by day.
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