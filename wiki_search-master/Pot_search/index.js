/*$(document).ready(function(){
    
});*/

$(document).ready(function(){
   $("#switch").click(function()
   {
       let title=$("#input").val();
       let api ='https://en.wikipedia.org/w/api.php?action=opensearch&search=';
       let cb = '&format=json&callback=?';
       let url = api+title+cb;
       $.getJSON(url,function(json)
       {
           $(".result").empty();
           if(json[1].length==0){
               $(".result").html("<p>There's Nothing!</p>");
           }
           for(let i=0;i<json[1].length;i++)
           {
               $(".result").append(`<div class='title'>${json[1][i]}</div><h2>${json[2][i]}</h2><a href=${json[3][i]} target='_blank' >For more?</a><div class="splitspace"></div>`)
           }
        });
   }); 
});
