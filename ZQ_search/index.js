"use strict";

let searching = () => {
    let keyword = $(".keyword").val();
    if(keyword.length == 0){
        alert("请输入搜索内容QAQ");
        return;
    }
    $(".clear-ico").fadeIn(150);
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: (response) => {
            resultResp(response,keyword);
        },
        error: () => {
            alert("Sorry, there's something wrong within the search, please refresh this page and try again!");
        }
    });
    /*let response = {
        query: {
            search: [
                {title:"title1",snippet:"snippet1",timestamp:"timestamp1"},
                {title:"title2",snippet:"snippet222222222222222222222 33333",timestamp:"timestamp2"},
                {title:"title3",snippet:"snippet3",timestamp:"timestamp3"}
            ]
            //search: [],
        }
    };
    resultResp(response,keyword);*/
};

$(".keyword").on("keydown",(event) => {
    if(event.keyCode != "13") return;
    searching();
});

$(".search-a").on("click",searching);

$(".search-clear").on("click",() => {
    $(".clear-ico").fadeOut(150);
    $(".result").html('<p class="result-title">We will show your search results here.</p><ul class="result-ul"></ul>');
});

let resultResp = (response,keyword) => {
    if(response.query.search.length == 0){
        let s = `Sorry, the word "${keyword}" is not existed in wiki\'s database.`;
        $(".result-title")[0].innerText = s;
        return;
    }
    $(".result").html("");
    $(".result").append('<ul class = "result-ul"></ul>');
    for(let resObj of response.query.search){
        let str = `
        <a class="result-link" href="https://en.wikipedia.org/wiki/${resObj.title}" target="_blank">
            <li class="result-li">
                <h3 class="result-h3">${resObj.title}</h3>
                <p class="result-abs">${resObj.snippet}</p>
                <p class="result-time">${resObj.timestamp}</p>
            </li>
        </a>`;
        let dot = $(str);
        $(".result-ul").append(dot);
    }
};