// fetch main json
let mainJson = "";
$.ajax({
    url: "./json/main.json",
    type: "POST",
    async: false,
    success:function(res){
        mainJson = res;
    },
    error:function(err){
        console.log(err)
    }
});

// fetch headlings
let headlines = "";
$.ajax({
    url: "./json/headlines.json",
    type: "POST",
    async: false,
    success:function(res){
        headlines = res;
    },
    error:function(err){
        console.log(err)
    }
});

// parameter url
if (pages != null && desc != null && pages != "" && desc != "") {
    // getAppPage(pages, desc);
    alert(desc)
}
else if (nav != null && nav != "") {
    // 
    alert(nav)
}
else{
    // 
   landingPage(); 
}

// landing page
function landingPage() {
    console.log(headlines);

    let mainPage = `
        <section class="top_landing">
    
            <div class="top_main_landing">
                <h2>Top Headline</h2>
                <a href="#">
                    <img src="./gallery/politics/1.jpg" alt="Top Headline">
                    <h4>Nigeria is a political nightmare</h4>
                    <q>Nigeria, a case study of how ethnic politics bring a country to its knees</q>
                </a>
            </div>

            <ul class="top_side_landing">
                <h2>Sub Headlines</h2>
                <div>
                    <li>
                    <a href="#">
                       <img src="./gallery/economics/1.jpg" alt="Headline">
                        <h4>Why is Africa yet to develop</h4> 
                        </a>
                    </li>

                    <li>
                        <a href="#">
                        <img src="./gallery/economics/1.jpg" alt="Headline">
                            <h4>Nigeria power sustainability not in sight</h4> 
                        </a>
                    </li>

                    <li>
                        <a href="#">
                        <img src="./gallery/economics/1.jpg" alt="Headline">
                            <h4>Waste management in kenye</h4> 
                        </a>
                    </li>

                    <li>
                        <a href="#">
                        <img src="./gallery/economics/1.jpg" alt="Headline">
                            <h4>Religion, a flash point for african development</h4> 
                        </a>
                    </li>
                <div>
            </ul>
        </section>

        <br>
        <hr>
        <br>

        <section class="mid_landing">
            <ul>
                <h3>Politcs</h3>
                <li>
                    <a href="#">
                        <img src="./gallery/politics/1.jpg" alt="Top Headline">
                        <h4>Nigeria is a political nightmare</h4>
                        <p>Nigeria, a case study of how ethnic politics bring a country to its knees</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src="./gallery/politics/1.jpg" alt="Top Headline">
                        <h4>Nigeria is a political nightmare</h4>
                        <p>Nigeria, a case study of how ethnic politics bring a country to its knees</p>
                    </a>
                </li>
                <button>More >></button>
            </ul>

            <ul>
                <h3>Economics</h3>
                <li>
                    <a href="#">
                        <img src="./gallery/politics/1.jpg" alt="Top Headline">
                        <h4>Nigeria is a political nightmare</h4>
                        <p>Nigeria, a case study of how ethnic politics bring a country to its knees</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src="./gallery/politics/1.jpg" alt="Top Headline">
                        <h4>Nigeria is a political nightmare</h4>
                        <p>Nigeria, a case study of how ethnic politics bring a country to its knees</p>
                    </a>
                </li>

                <button>More >></button>
            </ul>
        </section>
    `;

    $("#app_main").html(mainPage)
}

// 
function getAppPage(folder, name) {
    const loc = `./pages/${folder}/${name}.html`
    $.get(loc, (res)=>{
        $("#app_main").html(res)
    })
}