<script>
    let active = false
</script>

<svelte:head>
    <title>Flavio Oliveira</title>
</svelte:head>

<div class="toggle" class:active on:click={() => active= !active}></div>
<!-- Home Page -->
<section class="banner" id="home">
    <div class="imgSidebar">
        <img src="images/bg.jpg" alt="">
    </div>
    <div class="contentBx">
        <h5 class="logoText">Fl4_Dev</h5>
        <div>
            <h4><span>Hello</span>, I'm</h4>
            <h2>Flavio Oliveira</h2>
            <h4>I'm a FullStack Web Developer.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nemo amet, reiciendis rem ipsum at accusantium aperiam minima iusto ipsam, quasi ab reprehenderit inventore dolorem. Facere voluptatum iure provident cumque!
            Autem natus sit repudiandae, hic sint ullam molestias ratione vel consectetur!</p>
            <a href="#0" class="btn">About Me</a>
        </div>
        <ul class="sci">
            <li><a href="#0"><img src="images/facebook.png" alt="facebook"></a></li>
            <li><a href="#0"><img src="images/twitter.png" alt="twitter"></a></li>
            <li><a href="#0"><img src="images/instagram.png" alt="instagram"></a></li>
        </ul>
    </div>
</section>
<!-- About-Us Page -->
<section class="about" id="about">
    <div class="title white">
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="content">
        <div class="textBx">
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente laborum voluptate aut error aliquam veritatis deleniti suscipit expedita velit tempora! Ut molestiae commodi quia adipisci consequuntur et a rem ipsum.
                Distinctio excepturi, veritatis magni eum qui adipisci esse explicabo nam hic possimus ipsam enim nesciunt quisquam ut odit fuga praesentium ipsa sunt doloribus aperiam accusantium voluptatum error amet culpa? Labore?<br><br>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa repellendus corrupti reiciendis hic facilis adipisci, atque quae, quaerat doloribus unde molestias repudiandae. Minima iusto reprehenderit, fugit expedita labore harum saepe?
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sapiente repellendus numquam iste impedit dolorum earum minima. Nisi ex eligendi ad illo officia!</p>
    </div>
</section>

<div class="sidebar" class:active on:click={() => active= !active}>
    <ul class="menu">
        <li><a href="#home" class:active on:click={() => active}>Home</a></li>
        <li><a href="#about" class:active on:click={() => active}>About</a></li>
        <li><a href="#services" class:active on:click={() => active}>Services</a></li>
        <li><a href="#0" class:active on:click={() => active}>Work</a></li>
        <li><a href="#0" class:active on:click={() => active}>Contact</a></li>
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
	.banner .imgSidebar{
		position: absolute;
		top: 0;
		left: 0;
		width: 500px;
		height: 100%; 
	}
	.banner .imgSidebar img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.banner .contentBx, .sidebar{
		position: absolute;
		top: 0;
		right: 0;
		width: calc(100% - 500px);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100px;
	}
    .logoText{
        position: absolute;
        top: 40px;
        left: 100px;
        font-size: 1.2em;
        text-transform: uppercase;
        letter-spacing: 1px;
        background: #333;
        color: #fff;
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

</style> 