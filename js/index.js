$(document).ready(()=>{
    // 
    $("#app_loading").fadeOut("slow")


    $.get('./json/main.json', (res)=>{
        $("#app_motto").text(res[0].motto)
    });

})


// url
const params = new URLSearchParams(document.location.search);
// nav headlines, search
const nav = params.get("nav");

// get page folder and names
const pages = params.get("page");

// describe page or nav
const desc = params.get("desc");


// nav
let appNav = `
    <ul>
        <li>
            <a href="./"><img src="./icons/favicon.png" alt="African PM"></a>
        </li>

        <li>
            <h1>African Political Minds</h1>
            <i id="app_motto"></i>
        </li>

        <li></li>
    </ul>

    <div id="sub_nav">
        <menu id="sub_menu">&#x2630;</menu>
        <p id="sub_nav_menu">
            <b>Topics:</b>
            <span>
                <button>Politics</button>
                <button>Economy</button>
            </span>
        </p>

        <form id="nav_form">
            <input type="search" id="nav_form_input" placeholder="search">
            <button> <img src="./icons/search.svg" alt="search"> </button>
        </form>
    </div>

    <div id="app_loading">
        <p></p>
        <img src="./icons/favicon.png" alt="Please with">
    </div>
`;
$("#app_nav").html(appNav)


// footer

let currentDate = new Date();
let updateYear = currentDate.getFullYear();

let app_footer = `
    <section id="foot_side_bar">
        <a href="#app_nav"><img src="./icons/home.svg" alt="Home"></a>
        <a href="#"><img src="./icons/facebook.svg" alt="facebook"></a>
        <a href="#"><img src="./icons/youtube.svg" alt="youtube"></a>
        <a href="#"><img src="./icons/email.svg" alt="email"></a>
    </section>

    <ul id="footer_main">
        <li><a href="#">Policy</a></li>
        
        <li>&copy;${updateYear}</li>

        <li>
            <abbr title="African Political Mind">APM</abbr>
            <img src="./icons/favicon.png" alt="African PM">
        </li>
    </ul>
`;

$("#app_footer").html(app_footer);

// animate input
if ($(window).innerWidth() <= 500) {

    $("#nav_form_input").focus(()=>{

        $("#sub_nav_menu").fadeOut("fast", ()=>{
            $("#sub_nav").css({"justify-content":"right"});
            $("#nav_form_input").css({"width":"300px"});
        });
    });

    // 
    $("#nav_form_input").blur(()=>{

        $("#sub_nav").css({"justify-content":"right"});
        $("#nav_form_input").css({"width":"100px"});

        setTimeout(() => {
           $("#sub_nav_menu").fadeIn("fast", ()=>{
                $("#sub_nav").css({"justify-content":"space-between"});
           }); 
        }, 100);
    });
}
