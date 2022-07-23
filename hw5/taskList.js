function addFunc(){
    let nt = document.getElementById('new-task').value;

    if(nt.length ===0){
        alert("Please enter value ");
         return
    }
    nt = nt.trim();

    let s = localStorage.getItem("storage");
    if(s ==null) {
        s="";

    }
    s = nt + "\n" +s ;
    localStorage.setItem("storage" , s );
    sendToTextArea();
    document.getElementById('new-task').value = "";
}
function sendToTextArea() {
    let ta = document.getElementById("text-area");
    ta.value = localStorage.getItem("storage");
}
function clearFunc(){
    let b = document.getElementById("text-area");
    b.value = "";
    localStorage.removeItem("storage");
}
