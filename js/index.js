$(document).ready(()=>{
    
    $.get('./json/main.json', (res)=>{
        $("#app_motto").text(res[0].motto);

    });

     // 
    $("#app_loading").fadeOut("slow")

})


// url
const params = new URLSearchParams(document.location.search);
// nav headlines, search
const nav = params.get("nav");

// nav headlines, search
const search = params.get("search");

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
                <button><a href="./?nav=politics">Politics</a></button>
                <button><a href="./?nav=economics">Economy</a></button>
            </span>
        </p>

        <form id="nav_form">
            <input type="search" id="nav_form_input" placeholder="search headlines">
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

// fetch main json
let mainJson = "";
$.ajax({
    url: "./json/main.json",
    type: "GET",
    async: false,
    success:function(res){
        mainJson = res;
    },
    error:function(err){
        console.log(err)
    }
});

let currentDate = new Date();
let updateYear = currentDate.getFullYear();

let app_footer = `
    <section id="foot_side_bar">
        <a href="#"><img src="./icons/home.svg" alt="Home"></a>

        <a href="${mainJson[0].facebook}" target="_blank" rel="noopener noreferrer">
            <img src="./icons/facebook.svg" alt="facebook">
        </a>

        <a href="${mainJson[0].youtube}" target="_blank" rel="noopener noreferrer">
            <img src="./icons/youtube.svg" alt="youtube">
        </a>

        <a href="mailto:${mainJson[0].email}" target="_blank" rel="noopener noreferrer">
            <img src="./icons/email.svg" alt="email">
        </a>
    </section>

    <ul id="footer_main">
        <li><a href="./?page=contact&desc=policy">Policy</a></li>
        
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
            
            if ($(window).innerWidth() <= 330) {
                $("#nav_form_input").css({"width":"250px"});
            } 
            else {
                $("#nav_form_input").css({"width":"300px"});
            }

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

// 
$("#nav_form").on('submit', (e)=>{
    e.preventDefault();
    if ($("#nav_form_input").val() != "") {
        location = `./?search=${$("#nav_form_input").val().toLowerCase()}`
    }
})
