

var budgetObj =[];
function storeInSession() {
    sessionStorage.setItem("budgetInfo",JSON.stringify(budgetObj))
}
function retrieveFromSession() {
    var obj = sessionStorage.getItem("budgetInfo");
    
    var json = JSON.stringify(budgetObj);
    console.log(json);

    document.write(json);

}
function onFormSubmit(){
    
    var data = readFormData();
    insertNewRecord(data);
    budgetObj.push(data);      
    resetData();
    
}

function readFormData() {
    var obj = {}    
    obj.clientname = document.getElementById("clientname").value;
    obj.projectname=document.getElementById("projectname").value;
    obj.budget = document.getElementById("budget").value;
    console.log(obj);
    return obj; 
}

function insertNewRecord(data){
 var table = document.getElementById("finance")
 var body = table.getElementsByTagName("tbody")[0];
 var newRow = body.insertRow(body.length);   

 var cell1 = newRow.insertCell(0);           
 cell1.innerHTML=data.clientname;                 

 var cell2 = newRow.insertCell(1);          
 cell2.innerHTML=data.projectname;               
 var cell3 = newRow.insertCell(2);          
 cell3.innerHTML=data.budget; 




}


function resetData() {
    document.getElementById("clientname").value="";
    document.getElementById("projectname").value="";
    document.getElementById("budget").value="";
    }
    




