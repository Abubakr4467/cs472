


$("document").ready(function(){
    let intervalId = null; 
    let speed  = 250;

    $("#start").click(function(){
        startFunction();
        toggleButton(true,false,true);

    });

    $("#stop").click(function(){
        clearInterval(intervalId);
        toggleButton(false,true,false);
        let a = ANIMATIONS[$("#animation").val()].split("=====\n");
        $('#idTextArea').val(a[0]);

    });



    function startFunction(){
        clearInterval(intervalId);
         $("#idTextArea").val("");
         
        let a = ANIMATIONS[$("#animation").val()].split("=====\n");
        let counter = 0;
        let total = a.length;

        intervalId = setInterval(function(){
            if(counter == total){
                counter = 0;
            }
            $('#idTextArea').val(a[counter]);
            counter++;

        }, 250);
    }


    function toggleButton( start, stop, animation ){
        $("#start").prop("disabled", start);
        $("#stop").prop("disabled", stop);
        $("#animation").prop("disabled", animation);

    }


    $("#sizeOfFont").change(function(){
         $("#idTextArea").css("font-size",this.value+"pt"); 

    });

    $("#speed").click(function() {
        if ($('#speed').is(":checked")) {
            speed = 50;
            startFunction();
        } else {
            speed = 250;
            startFunction();
        }
    });




});









