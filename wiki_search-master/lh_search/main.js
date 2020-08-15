/*
 * @Author: your name
 * @Date: 2020-08-08 21:24:16
 * @LastEditTime: 2020-08-10 20:08:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\freecodecamp_study\code2\main.js
 */

const search_info_input = document.querySelector(".search-info");
const search_get_button = document.querySelector(".search-get-url");
const right_show_area = document.querySelector(".right-show");

let right_show_content = [];

function add_content_show() {
    right_show_area.innerHTML = "";
    for (let info of right_show_content) {
        console.log(info);
        let part_content = document.createElement("div");
        let part_content_title = document.createElement("h4");
        let part_content_extract = document.createElement("p");
        part_content_title.innerText = info.title;
        part_content_extract.innerText = info.body;
        part_content.appendChild(part_content_title);
        part_content.appendChild(part_content_extract);

        right_show_area.appendChild(part_content);
    }
}

function search_get() {
    right_show_area.innerHTML = "";
    let search_info = search_info_input.value;
    let url =
        "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" +
        search_info +
        " &callback=?";
    // loading carton
    let temp_o = document.createElement("div");
    temp_o.className = "spinner";
    let double_bounce1 = document.createElement("div");
    double_bounce1.className = "double-bounce1";
    let double_bounce2 = document.createElement("div");
    double_bounce2.className = "double-bounce2";
    temp_o.appendChild(double_bounce1);
    temp_o.appendChild(double_bounce2);
    right_show_area.appendChild(temp_o);
    // ! Error Fetch
    // fetch(url)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
    right_show_content = [];
    $.getJSON(url, function (data) {
        let result = data.query.pages;
        Object.keys(result).forEach(function (key) {
            let temp = result[key];
            right_show_content.push({
                title: temp.title,
                body: temp.extract,
            });
        });
        add_content_show();
    });
}
search_get_button.addEventListener("click", search_get);
