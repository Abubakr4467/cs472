class Account {
    id;
    name;
    balance;
    static accountInfoList = [];

    createAcc(name,balance){
        this.id = Account.accountInfoList.length +1 ;
        this.name = name;
        this.balance = parseInt(balance);
        Account.accountInfoList.push(this);
        writeToStorage();
    }

    display(){
        return "Account name "+this.name+ ", Balance: "+this.balance;
    }

    getId(){
        return parseInt(this.id);
    }
    static deposit(id,amount){
        Account.accountInfoList.filter(e =>e.id == id).forEach(b => {
            b.balance += amount;
        });
        writeToStorage();
    }

    static debit(id, amount){
        Account.accountInfoList.filter(e => e.id == id).forEach(b =>{
            if(b.balance < amount){
                throw "Not enough balance";
            }
            b.balance -= amount;
        });
        writeToStorage();
    }
}

function writeToStorage(){
    localStorage.setItem("accounts",JSON.stringify(Account.accountInfoList));
}

window.onload = function(){
    let history = JSON.parse(localStorage.getItem("accounts"));
    if(history == null){
        history = [];
    }
    Account.accountInfoList = history;

    const path = location.pathname;
    const currentPage = path.split("/").pop();
    if(currentPage === "index.html"){
        updateTextArea();
        document.getElementById("create").addEventListener("click", createAcc);
    }else if (currentPage == "deposit.html"){
        setOptions();
        document.getElementById("deposit").addEventListener("click", makeDeposit);
    }
    else if (currentPage == "debit.html"){
        setOptions();
        document.getElementById("debit").addEventListener("click",makeDebit);
    }

}

function changePath(target){
    window.location =target;
}
function setOptions(){
    try{
        if(Account.accountInfoList.length ==0){
            throw "Acoount is empty";
        }
        let total = Account.accountInfoList.map(e => `<option 
        value="${e.id}"> ${e.name}</option>`).join("");
        document.getElementById("accounts").insertAdjacentElement("beforeend",total);
    }
    catch(e){
        alert(e);
        changePath("index.html");
    }
}


function createAcc(){
    try{
        let accountName = document.getElementById("name");
        let deposit = document.getElementById("deposit");
        let(accountName.ariaValueMax.length ===0 || deposit.ariaValueMax.length===0){
            throw "Please enter fields ";
        }
    let newAccount = new Account()
    newAccount.createAcc(accountName.value, deposit.value);

    updateTextArea();
    accountName.value ="";
    deposit.value = "";

    }catch(e){
        alert(e);
    }
}


function updateTextArea (){
    document.getElementById("total").value = Account.accountInfoList.map(e=>
        `Account name: ${e.name} Balance: ${e.balance} `).join("\r\n"); 
}

function makeDeposit(){
    try{
        let accountId = parseInt(document.getElementById("accounts").value);
        let amount = parseInt(document.getElementById("amount").value);

        if(!amount || amount<0){
            throw "Please enter right amount";
        }
        
        Account.debit(accountId,amount);
        changePath("index.html");
    }
    catch(e){
        alert(e);
        changePath("deposit.html");
    }
}