$(document).ready(
    function(){
        $("#view_button").click(getPicture);
        $("#loading").hide();
});


function getPicture(){
    // const date = $('#date').val();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=UgIzpgwHxmDoBDntesnIgk9Z53LX49cRV3yGQzVn&date=${$('#date').val()}`)
        .then(response => response.json())
        .then(function(data){
            if(data.code==400){
                return Promise.reject(data.msg);
            }
            showPicture(data);
        })
        .catch(function(error){
            noPicture(error);
        })
    

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