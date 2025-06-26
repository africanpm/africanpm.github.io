// fetch headlings
let blogPost = "";
$.ajax({
    url: "./json/headlines.json",
    type: "GET",
    async: false,
    success:function(res){
        blogPost = res;
    },
    error:function(err){
        console.log(err)
    }
});

// parameter url
if (pages != null && desc != null && pages != "" && desc != "") {
    // load page and descrption = detailed contacts and policy
    getAppPage(pages, desc);
}
else if (nav != null && nav != "") {
    // navigate app nav bars
    getNavPage(nav)
}
else if (search != null && search != "") {
    // search post
    getSearchPage(search)
}
else{
    // 
   landingPage();
}

// 
function getAppPage(folder, name) {
    // const loc = `./pages/${folder}/${name}.html`
    // $.get(loc, (res)=>{
    //     $("#app_main").html(res)
    // })
    let x = `
        <p>${folder}</p>
        <p>${name}</p>
    `
    $("#app_main").html(x)
}


// nav page
function getNavPage(x) {
    // implement pagination later
    
    let pages = "";
    
    for (let i = 0; i < blogPost.length; i++) {

        if (blogPost[i].category == x) {
            pages += `
                <li>
                    <a href="#${blogPost[i].id}" onclick="getHashTageLink(this)">
                        <h4>${blogPost[i].headline}</h4>
                        <img src="./gallery/${blogPost[i].category}/${blogPost[i].coverPhoto}" alt="Headline">
                    </a>
                </li>
            `;
        }
        
    }

    let navpage = `
        <section class="sub_mid_pages">

        <button id="go_back_page"><a href="./">&#10094; <span>Back</span></a></button>
        
        <h2>${x}</h2>

        <ul>${pages}</ul>
        </section>
    `;
     $("#app_main").html(navpage)
}


// search page
function getSearchPage(x) {
    $("#app_main").html(x)
}


// landing page
function landingPage() {

    let appendPost = "";

    for (let i = 1; i < 5; i++) {
        appendPost += `
            <li>
                <a href="#${blogPost[i].id}" onclick="getHashTageLink(this)">
                    <img src="./gallery/${blogPost[i].category}/${blogPost[i].coverPhoto}" alt="Headline">
                    <h4>${blogPost[i].headline}</h4> 
                </a>
            </li>
        `;  
    }

    // 
    let politicalPost = "";
    let economicsPost = "";

    let politicsCounter = 0;
    let economicsCounter = 0

    const moreTage = `<i style="color:gray"> ...more</i>`;

    for (let j = 0; j < blogPost.length; j++) {

        if (blogPost[j].category == "politics" && politicsCounter < 5) {
            politicalPost += `
                <li>
                    <a href="#${blogPost[j].id}" onclick="getHashTageLink(this)">
                        <img src="./gallery/${blogPost[j].category}/${blogPost[j].coverPhoto}" alt="Sub Headline">
                        <h4>${blogPost[j].headline}</h4>
                        <p>${blogPost[j].quote.slice(0, 50)} ${moreTage}</p>
                    </a>
                </li>
            `;
            politicsCounter++
        }

        if (blogPost[j].category == "economics" && economicsCounter < 5) {
            economicsPost += `
                <li>
                    <a href="#${blogPost[j].id}" onclick="getHashTageLink(this)">
                        <img src="./gallery/${blogPost[j].category}/${blogPost[j].coverPhoto}" alt="SUb Headline">
                        <h4>${blogPost[j].headline}</h4>
                        <p>${blogPost[j].quote.slice(0, 50)} ${moreTage}</p>
                    </a>
                </li>
            `;
            economicsCounter++
        }
        
    }

    let mainPage = `
        <section class="top_landing">
    
            <div class="top_main_landing">
                <h2>Top Headline</h2>
                <a href="#${blogPost[0].id}" onclick="getHashTageLink(this)">
                    <img src="./gallery/${blogPost[0].category}/${blogPost[0].coverPhoto}" loading="lazy" alt="Top Headline">
                    <h4>${blogPost[0].headline}</h4>
                    <q>${blogPost[0].quote}</q>
                </a>
            </div>

            <ul class="top_side_landing">
                <h2>Sub Headlines</h2>
                <div>${appendPost}<div>
            </ul>
        </section>

        <br>
        <hr>
        <br>

        <section class="mid_landing">
            <ul>
                <h3>Politcs</h3>
                ${politicalPost}
                <button><a href="./?nav=politics">More >></a></button>
            </ul>

            <ul>
                <h3>Economy</h3>
                ${economicsPost}
                <button><a href="./?nav=economics">More >></a></button>
            </ul>
        </section>
    `;

    // 
    const hashTag = window.location.hash.slice(1);
    if (hashTag !="") {
        pageLoader(hashTag)
    }
    else{
        $("#app_main").html(mainPage)
    }
}

function pageLoader(x) {

    for (let i = 0; i < blogPost.length; i++) {

        if (blogPost[i].id == x) {

            $.get(`./pages/${blogPost[i].category}/${blogPost[i].id}.html`, (res)=>{
                if (res) {
                    $("#app_loading").fadeIn("slow", ()=>{
                        
                        $("#app_main").html(`

                            <button id="go_back_page">
                                <a href="./">&#10094; <span>Back</span></a>
                            </button>

                            <section id="my_article">${res}</section>
                        `);

                        $("#app_loading").fadeOut("slow", articleImageLoader);
                        
                        document.getElementById("app_main").scrollIntoView();
                    })
                }
            })

            return
        }
    } 
}

// 
function articleImageLoader() {
    // random number for articles photo
    let randNum = Math.floor(Math.random() * 8);

    for (let i = 0; i < blogPost.length; i++) {

        if (blogPost[i].headline.replace(".", "") == $("#article_header").text().replace(".", "")) {
            // console.log(blogPost[i])
            $("#article_cover").attr('src', `./gallery/${blogPost[i].category}/${blogPost[i].coverPhoto}`);

            $("#article_subcover").attr('src', `./gallery/${blogPost[i].category}/${blogPost[i].subPhoto}`);

            $("#article_quotes").append(`<q>${blogPost[i].quote}</q>`).css({
                "background-image":`linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(../gallery/quotes/quotes_${randNum}.png)`
            });
        } 
    }

    // random json lenght
    let randJson = Math.floor(Math.random() * blogPost.length);

    $("#article_suggestion").html(`
        <hr>
        <p>You may also like: </p>
        <a href="./?#${blogPost[randJson].id}" target="_blank" rel="noopener noreferrer">
            <img src="./gallery/${blogPost[randJson].category}/${blogPost[randJson].coverPhoto}" alt="">
            <h4>${blogPost[randJson].headline.slice(0, 100)} ...</h4>
        </a>    
    `)

}


// 
function getHashTageLink(x) {
    pageLoader(x.getAttribute("href").slice(1))
}

// 
// function goBackPage() {
//     $("#app_loading").fadeIn("slow", ()=>{
//         landingPage();
//         $("#app_loading").fadeOut("slow");
//     });
    
// }