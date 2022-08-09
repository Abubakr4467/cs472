const API_URL = 'http://localhost:3500';

$(document).ready(function(){
    $("#search").click(sendReq);
});

function sendReq(){
    const searchingWord = $("#search_value").val();
    const body = JSON.stringify({word:searchingWord});

    $.ajax({
        url: `${API_URL}/search`,
        type: "POST",
        dataType: "json",
        data: body,
        contentType: "application/json",
        beforeSend: ()=>{
            $("#result").empty().append("<p>Just a sec...</p>");
        },
        success: (resp)=>{
            makeData(resp);
        },

        error: (err)=>{
            $("#result").empty().append("<p>Sorry error happened on connection</p>");
        }
    });
}

function makeData(resp){
    let a = "<p> Sorry word not found. <p>";
    if(resp.total>0){
        a = resp.data.map((e,index )=>{
            return `<p>${index+1}(${e.wordtype})::${e.definition}</p>`
        });
    }
    $('#result').empty().append(a);
}