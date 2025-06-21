// fetch headlings
let blogPost = "";
$.ajax({
    url: "./json/headlines.json",
    type: "POST",
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
     $("#app_main").html(x)
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
                <button><a href="./?nav=economy">More >></a></button>
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

            $.post(`./pages/${blogPost[i].category}/${blogPost[i].id}.html`, (res)=>{
                if (res) {
                    $("#app_loading").fadeIn("slow", ()=>{
                        $("#app_main").html(res);
                        $("#app_loading").fadeOut("slow");
                    })
                }
            })

            return
        }
    } 
}



// 
function getHashTageLink(x) {
    pageLoader(x.getAttribute("href").slice(1))
}