$(document).ready(
    function(){
        $("#view_button").click(getPicture);
        $("#loading").hide();
});

function getPicture(){
    $.ajax({
        url: "http://api.nasa.gov/planetary/apod",
        type: "GET",
        data: {api_key: "DEMO_KEY",
                date: $("#date").val() 
        },
        dataType: "json",
        "success": showPicture,
        "error": noPicture
    });
    $("#loading").show();
    $("#myTitle").text("");
    $("#pic").attr("src","");
};

function showPicture(data){ 
    $("#loading").hide();
    $("#myTitle").text(data.title);
    $("#pic").attr("src",data.url);
};

function noPicture(error){
    alert(error.responseText);
};