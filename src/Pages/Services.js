import webdevelopment from "../static/images/webdevelopment.png";
import webdesign from "../static/images/webdesign.png";
import frontend from "../static/images/frontend.png";
import backend from "../static/images/backend.png";
import deployment from "../static/images/deployment.png";
import administrator from "../static/images/administrator.png";
import "./Services.css";

function Services() {
  return (
    <div>
      <section className="services" id="services">
        <div className="title">
          <h2>How can I help you?</h2>
          <p>
            It is the services that we offer to help you bring your project to
            life. We can do any step separately or the whole process from
            scratch to the deployment.
          </p>
        </div>
        <div className="content">
          <div className="servicesBx">
            <img src={webdevelopment} alt="Web Development icon" />
            <h2>Web Development</h2>
            <p>
              We develop intuitive software solutions for businesses. This helps
              to streamline, improve, and convert across a range of web based
              applications.
            </p>
          </div>
          <div className="servicesBx">
            <img src={webdesign} alt="Web Development icon" />
            <h2>Web Design</h2>
            <p>
              By creating the perfect visual identity for your project, we aim
              to attract the attention of your audience with much more than just
              a logo refresh.
            </p>
          </div>
          <div className="servicesBx">
            <img src={frontend} alt="Frontend icon" />
            <h2>Frontend</h2>
            <p>
              We’ll guarantee your website works over a range of popular
              devices. Whether you need to function on tablets or mobile, we
              have the skills to make it happen.
            </p>
          </div>
          <div className="servicesBx">
            <img src={backend} alt="Backend icon" />
            <h2>Backend</h2>
            <p>
              Our backend applications usually are scalable and structured in
              one way to give you the possibility to grow with your project,
              adding easily new functionalities.
            </p>
          </div>
          <div className="servicesBx">
            <img src={deployment} alt="Deployment icon" />
            <h2>Deployment</h2>
            <p>
              We can deploy and administrate your applications on clouds
              services like AWS, Azure, Google Cloud and others.{" "}
            </p>
          </div>
          <div className="servicesBx">
            <img src={administrator} alt="Administrator icon" />
            <h2>Website Administration</h2>
            <p>
              If something has broken on your website, it needs to be fixed –
              fast. You’ll have someone on hand at all times, ready to resolve
              any issues that arise quickly and efficiently.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
