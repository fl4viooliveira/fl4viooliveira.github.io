<script>
    import {onMount} from 'svelte';
    import {createScene} from "./scene.js"

    let webgl;

    onMount(() => {
        createScene(webgl)
    });

    let active = false
</script>

<svelte:head>
    <title>Flavio Oliveira</title>
</svelte:head>

<div class="toggle" class:active on:click={() => active= !active}></div>
<!-- Home Page -->
<section class="banner" id="home">
    <!-- <div class="imgSidebar">
        <img src="images/bg.jpg" alt="">
    </div> -->
    <div class="contentBx">
        <canvas bind:this={webgl} id="canvas1"></canvas>
      <h5 class="logoText">Fl4v.io</h5>
        <!-- <div>
            <h4><span>Hello</span>, I'm</h4>
            <h2>Flavio Oliveira</h2>
            <h4>A developer with a versatile coding skillset.</h4>
            <p>We are a developer with a broad and versatile coding skillset. We can help startups and enterprises with prototypes and ideas by efficiently building those things into reality. Our expertise lies in building MVPs, enterprise software, scalable microservices, REST and Socket APIs and deployments in AWS, Azure, DigitalOcean and others. </p>
            <a href="#about" class="btn">About Me</a>
        </div> -->
        <ul class="sci">
          <!--<li><a href="#0"><img src="images/facebook.png" alt="facebook"></a></li>-->
            <li><a href="https://twitter.com/fl4viooliveira"><img src="images/twitter.png" alt="twitter" target="_blank"></a></li>
            <!--<li><a href="#0"><img src="images/instagram.png" alt="instagram"></a></li>-->
        </ul>
    </div>
</section>
<!-- About-Us Page -->
<section class="about" id="about">
    <div class="title white">
        <h2>About Us</h2>
        <p>I'm Flavio, continuously working to improve my web development skills.</p>
    </div>
    <div class="content">
        <div class="textBx">
            <p>
                I'm Flavio, continuously working to improve my web development skills on the frontend, basically using Svelte framework, JavaScript, CSS3 and HTML5.  On the backend, we are mainly developing using the Django framework, Python and SQL database. I'm working as a freelancer, developing some web solutions for projects with scalable perspectives and integrating Django Rest API with the Svelte frontend.  In this way, we could see some fantastic plans, project, and dreams get off the paper to reality.<br><br>
                I speak Portuguese, English, and Spanish at the lower level.<br> 
                I consider the most substantial skill of mine "fast adaptation." I could confirm it in the last six years, moving country, changing the job, and adapting well in diverse environments.<br><br>                
                I used to be an athlete in Jiu Jitsu. I still compete, sometimes. I just described it because this experience helps me to push myself to be better day by day.  
            </p>
        </div>
        <div class="imgBx">
            <img src="images/flavio_pc.PNG" alt="Flavio">
        </div>
    </div>
</section>
<!-- Services Page -->
<section class="services" id="services">
    <div class="title">
        <h2>Our Services</h2>
        <p>It is the services that we offer to help you bring your project to life. We can do any step separately or the whole process from scratch to the deployment.</p>
    </div>
    <div class="content">
        <div class="servicesBx">
            <img src="images/webdevelopment.png" alt="Web Development icon">
            <h2>Web Development</h2>
            <p>We develop intuitive software solutions for businesses. This helps to streamline, improve, and convert across a range of web based applications.</p>
        </div>
        <div class="servicesBx">
            <img src="images/webdesign.png" alt="Web Development icon">
            <h2>Web Design</h2>
            <p>By creating the perfect visual identity for your project, we aim to attract the attention of your audience with much more than just a logo refresh.</p>
        </div>
        <div class="servicesBx">
            <img src="images/frontend.png" alt="Frontend icon">
            <h2>Frontend</h2>
            <p>We’ll guarantee your website works over a range of popular devices. Whether you need to function on tablets or mobile, we have the skills to make it happen.</p>
        </div>
        <div class="servicesBx">
            <img src="images/backend.png" alt="Backend icon">
            <h2>Backend</h2>
            <p>Our backend applications usually are scalable and structured in one way to give you the possibility to grow with your project, adding easily new functionalities.</p>
        </div>
        <div class="servicesBx">
            <img src="images/deployment.png" alt="Deployment icon">
            <h2>Deployment</h2>
            <p>We can deploy and administrate your applications on clouds services like AWS, Azure, Google Cloud and others. </p>
        </div>
        <div class="servicesBx">
          <img src="images/administrator.png" alt="Administrator icon">
          <h2>Website Administration</h2>
        <p>If something has broken on your website, it needs to be fixed – fast. You’ll have someone on hand at all times, ready to resolve any issues that arise quickly and efficiently.</p>
        </div>
    </div>
</section>
<!-- Work Page -->
<section class="work" id="work">
    <div class="title">
        <h2>Recent Work</h2>
        <p>Here are some studies, projects and jobs that we recently did to expose some technique and styles that we can use in your projects.</p>
    </div>
    <div class="content">
        <div class="workBx">
            <div class="imgBx">                
                <img src="images/img1.jpg" alt="work-1">                
            </div>
            <div class="textBx"> 
                <a href="https://fl4viooliveira.github.io/bkg_grid_layout/" target="_blank">               
                <h3>Grid Layout</h3>
                </a>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img2.jpg" alt="work-2">
            </div>
            <div class="textBx">
                <a href="https://fl4viooliveira.github.io/animated_form/" target="_blank">               
                    <h3>Animated Form</h3>
                </a>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img3.jpg" alt="work-3">
            </div>
            <div class="textBx">
                <a href="https://fl4viooliveira.github.io/profile_card/" target="_blank">               
                    <h3>Profile Card</h3>
                </a>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img4.jpg" alt="work-4">
            </div>
            <div class="textBx">
                <a href="https://fl4viooliveira.github.io/blogr_landing_page/" target="_blank">               
                    <h3>Landing Page</h3>
                </a>
            </div>
        </div>
        <!--<div class="workBx">
            <div class="imgBx">
                <img src="images/img5.jpg" alt="work-5">
            </div>
            <div class="textBx">
                <h3>Project 05</h3>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img6.jpg" alt="work-6">
            </div>
            <div class="textBx">
                <h3>Project 06</h3>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img7.jpg" alt="work-7">
            </div>
            <div class="textBx">
                <h3>Project 07</h3>
            </div>
        </div>
        <div class="workBx">
            <div class="imgBx">
                <img src="images/img8.jpg" alt="work-8">
            </div>
            <div class="textBx">
                <h3>Project 08</h3>
            </div>
        </div> -->
    </div>
</section>
<!-- Contact Page -->
<section class="contact" id="contact">
    <div class="title white">
        <h2>Contact Us</h2>
        <p>Use this form to tell us about your project or idea; let's talk about how to make this happen.</p>
    </div>
    <form action="https://getform.io/f/04feb2e1-24e2-4e73-98b3-837225c11041" method="POST">
        <div class="contactForm">
            <div class="row">
                <div class="col50">
                    <input type="text" name="first_name" placeholder="First Name">
                </div>
                <div class="col50">
                    <input type="text" name="last_name" placeholder="Last Name">
                </div>
            </div>
            <div class="row">
                <div class="col50">
                    <input type="email" name="email" placeholder="Email">
                </div>
                <div class="col50">
                    <input type="text" name="subject" placeholder="Subject">
                </div>
            </div>
            <div class="row">
                <div class="col100">
                    <textarea name="message" placeholder="Message"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col100">
                    <button>
                        <input type="submit" value="Send">
                    </button>
                </div>
            </div>
        </div>
    </form>
</section>

<div class="copyright">
    <p>MIT License. Copyright © 2021 Flavio Oliveira.</p>
</div>

<div class="sidebar" class:active on:click={() => active= !active}>
    <ul class="menu">
        <li><a href="#home" class:active on:click={() => active}>Home</a></li>
        <li><a href="#about" class:active on:click={() => active}>About</a></li>
        <li><a href="#services" class:active on:click={() => active}>Services</a></li>
        <li><a href="#work" class:active on:click={() => active}>Work</a></li>
        <li><a href="#contact" class:active on:click={() => active}>Contact</a></li>
    </ul>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        scroll-behavior: smooth;
    }
    .toggle {
        position: fixed;
        top: 30px;
        right: 30px;
        width: 50px;
        height:50px;
        background: #000 url(../images/menu.png);
        background-size: 30px;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        z-index: 1000;
    }
    .toggle.active
    {
        background: #000 url(../images/close.png);
        background-size: 25px;
        background-position: center;
        background-repeat: no-repeat;       
    }
	section{
		padding: 100px;
		min-height: 100vh;
	}
	.banner{
		position: relative;
		width: 100%;
		min-height: 100vh;
	}
	/* .banner .imgSidebar{
		position: absolute;
		top: 0;
		left: 0;
		width: 500px;
		height: 100%; 
	} */
	/* .banner .imgSidebar img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	} */
    #canvas1 {
        width: 100vw;
        height: 100vh;
    }
	.banner .contentBx, .sidebar{
		position: absolute;
		top: 0;
		right: 0;
		width: 100vw ;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 100px; */
	}
    .logoText{
        position: absolute;
        top: 40px;
        left: 100px;
        font-size: 1.2em;
        text-transform: uppercase;
        letter-spacing: 1px;
        background: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        padding: 0 5px;
    }
    .banner .contentBx h4{
        font-size: 1.5em;
        color: #333;
        font-weight: 300;
    }
    .banner .contentBx h4 span{
        color:#00bcd4;
        font-size: 1.5em;
        font-weight: 700;
    }
    .banner .contentBx h2{
        font-size: 3em;
        color:#333;
        line-height: 1em;
    }
    p{
        font-size: 1.1em;
        margin: 20px 0;
        font-weight: 300;
    }
    .btn{
        background: #00bcd4;
        color: #fff;
        padding: 10px 30px;
        display: inline-block;
        text-decoration: none;
        font-weight: 500;
        letter-spacing: 2px;
    }
    .sidebar{
        position: fixed;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;
        padding: 40px;
        z-index: 100;
        right: -100%;
    }
    .sidebar.active{
        right: 0;
    }
    .sidebar ul{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .sidebar ul li{
        list-style: none;
    }
    .sidebar ul li a{
        color: #fff;
        text-decoration: none;
        font-size: 2em;
        margin: 10px 0;
        font-weight: 300;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    .sidebar ul li a:hover{
        color: #00bcd4;
    }
    .sci{
        position: absolute;
        left: 100px;
        bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sci li{
        margin-right: 10px;
        list-style: none;
        background: white;
    }
    .sci li img{
        transform: scale(0.5);
        opacity: 0.7;
    }
    .sci li img:hover{
        opacity: 1;
    }
    .title{
        width: 100%;
        text-align: center;
    }
    .title h2{
        position: relative;
        color: #00bcd4;
        font-size: 1.8em;
        font-weight: 700;
        letter-spacing: 1px;
    }
    .title p{
        max-width: 700px;
        display: inline-block;
    }
    .title h2::before{
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -10px;
        width: 60px;
        height: 4px;
        background: #000;
    }
    .title.white h2, .title.white p{
        color: #fff;
    }
    .title.white h2::before{
        background: #fff;
    }
    .about{
        background: #000;
    }
    .about .content{
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }
    .about .content .textBx{
        min-width: 49%;
        width: 49%;
    }
    .about .content .textBx p{
        color: #fff;
    }
    .about .content .imgBx{
        margin-left: 40px;
    }
    .about .content .imgBx img{
        max-width: 100%;
    }
    .services .content{
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .services .content .servicesBx{
        padding: 40px 20px;
        max-width: 340px;
        margin: 20px;
        transition: 0.5s;
        text-align: center;
        background: #f5f5f5;
    }
    .services .content .servicesBx:hover{
        background: #000;
    }
    .services .content .servicesBx img{
        max-width: 80px;
        transition: 0.5s;
    }
    .services .content .servicesBx:hover img{
        filter:invert(1);
    }
    .services .content .servicesBx h2{
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 600;
        transition: 0.5s;
    }
    .services .content .servicesBx:hover h2{
        color: #fff;
    }
    .services .content .servicesBx p{
        margin: 0;
        transition: 0.5s;
    }
    .services .content .servicesBx:hover p{
        color: #fff;
    }
    .work .content{
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .work .content .workBx{
        position: relative;
        width: 265px;
        height: 265px;
        margin: 10px;
        transition: 0.5s;
        text-align: center;
    }
    .work .content .workBx .imgBx, .work .content .workBx .textBx{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .work .content .workBx .imgBx img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    } 
    .work .content .workBx .textBx{
        background: #000;
        opacity: 0;
        transition: 0.5s;
    }
    .work .content .workBx:hover .textBx{
        opacity: 1;
    }
    .work .content .workBx .textBx h3{
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 1em;
    }
    .contact{
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .contact .contactForm{
        position: relative;
        width: 700px;
        margin-top: 20px;
    }
    .contact .contactForm .row{
        width: 100%;
        display: flex;
    }
    .contact .contactForm .row .col50{
        width: 50%;
        margin: 10px;
    }
    .contact .contactForm .row .col100{
        width: 100%;
        margin: 10px;
        text-align: center;

    }
    .contact .contactForm .row input, .contact .contactForm .row textarea{
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        background: #111;
        color: #fff;
        font-size: 16px;
        resize: none;
    }
    .contact .contactForm .row textarea{
        height: 100px;
    }
    .contact .contactForm .row input[type="submit"]{
        background: #00bcd4;
        color: #fff;
        padding: 10px 30px;
        display: inline-block;
        font-weight: 500;
        letter-spacing: 2px;
        cursor:pointer;
        max-width: 150px;
    }
    .copyright{
        color: #fff;
        background: #111;
        text-align: center;
        padding: 10px;
    }
    .copyright p{
        margin: 0;
        font-size: 16px;
    }

    @media (max-width: 991px){
        .banner .imgSidebar{
            display: none;
        }
        .banner .contentBx, .sidebar{
            width: 100%;
            padding: 40px;
        }
        .logoText{
            top: 40px;
        }
        .toggle{
            right: 40px;
        }
        .sci{
            left: 40px;
        }
        section{
            padding: 40px;
        }
        .about .content{
            flex-direction: column;
        }
        .about .content .textBx{
            min-width: 100%;
            width: 100%;
        }
        .about .content{
            margin-top: 0;
        }
        .about .content .imgBx{
            margin-left: 0;
        }
        .services .content .servicesBx{
            padding: 30px 20px;
            max-width: 340px;
            margin: 10px;
        }
        .contact .contactForm{
            width: 100%;
        }
        .contactForm .row{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
        .contact .contactForm .row .col50{
            width: 100%;
        }
        .sidebar ul li a{
            font-size: 1.5em;
        }
    }

    @media (max-width: 500px){
        .services .content .servicesBx, .work .content .workBx{
            max-width: 100%;
            width: 100%;
            margin: 10px 0;
        }
    }
</style> 
