import "./Contact.css";

function Contact() {
  return (
    <div>
      <section className="contact" id="contact">
        <div className="title white">
          <h2>Contact Us</h2>
          <p>
            Use this form to tell us about your project or idea; let's talk
            about how to make this happen.
          </p>
        </div>
        <form
          action="https://getform.io/f/04feb2e1-24e2-4e73-98b3-837225c11041"
          method="POST"
        >
          <div className="contactForm">
            <div className="row">
              <div className="col50">
                <input type="text" name="first_name" placeholder="First Name" />
              </div>
              <div className="col50">
                <input type="text" name="last_name" placeholder="Last Name" />
              </div>
            </div>
            <div className="row">
              <div className="col50">
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div className="col50">
                <input type="text" name="subject" placeholder="Subject" />
              </div>
            </div>
            <div className="row">
              <div className="col100">
                <textarea name="message" placeholder="Message"></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col100">
                <button>
                  <input type="submit" value="Send" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Contact;
