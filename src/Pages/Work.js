import work1 from "../static/images/work-1.jpg";
import work2 from "../static/images/work-2.jpg";
import work3 from "../static/images/work-3.jpg";
import work4 from "../static/images/work-4.jpg";
import "./Work.css";

function Work() {
  return (
    <div>
      <section className="work" id="work">
        <div className="title">
          <h2>Recent Work</h2>
          <p>
            Here are some studies, projects and jobs that we recently did to
            expose some technique and styles that we can use in your projects.
          </p>
        </div>
        <div className="content">
          <div className="workBx">
            <div className="imgBx">
              <img src={work1} alt="work-1" />
            </div>
            <div className="textBx">
              <a
                href="https://fl4viooliveira.github.io/bkg_grid_layout/"
                target="_blank"
              >
                <h3>Grid Layout</h3>
              </a>
            </div>
          </div>
          <div className="workBx">
            <div className="imgBx">
              <img src={work2} alt="work-2" />
            </div>
            <div className="textBx">
              <a
                href="https://fl4viooliveira.github.io/animated_form/"
                target="_blank"
              >
                <h3>Animated Form</h3>
              </a>
            </div>
          </div>
          <div className="workBx">
            <div className="imgBx">
              <img src={work3} alt="work-3" />
            </div>
            <div className="textBx">
              <a
                href="https://fl4viooliveira.github.io/profile_card/"
                target="_blank"
              >
                <h3>Profile Card</h3>
              </a>
            </div>
          </div>
          <div className="workBx">
            <div className="imgBx">
              <img src={work4} alt="work-4" />
            </div>
            <div className="textBx">
              <a
                href="https://fl4viooliveira.github.io/blogr_landing_page/"
                target="_blank"
              >
                <h3>Landing Page</h3>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Work;
