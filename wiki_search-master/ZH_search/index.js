$(document).ready(function(){
    $(".button").on("click",function(){
         var text = $("#input").val();
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + text + '&format=json&callback=?';
        $.getJSON(url,function(json){
          $(".result").empty();
       if(json[1].length==0){
         $(".result").html("<h2>该词条不存在</h2>");
       }
        for (var i = 0; i < json[1].length; i++) {
       $(".result").append("<span class='title'>" + json[1][i] + "</span>" + "<h2>" + json[2][i] + "</h2>" + "<a href=" + json[3][i] + " >详情请点击</a><hr>")
        }
        });
      });
    });