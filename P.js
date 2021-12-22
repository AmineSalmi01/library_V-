var input = document.getElementsByTagName("input");
var form = document.getElementsByTagName("form")[0];
var select = document.getElementById("lang");
var type = document.getElementsByClassName("book")
var para = document.getElementById("para");
var table = document.getElementById("table")
var email = document.getElementById("email")
var form_valid = 0;

function valider(e){
    form_valid = 0;
    e.preventDefault();
    for(i=0;i<input.length-3;i++){
        if(input[i].value==''){
           input[i].nextElementSibling.innerHTML = "please fill this field"
           input[i].nextElementSibling.style.color = "red"
           input[i].style.borderColor = "red"
           form_valid++;
            
        }
        else{
            input[i].nextElementSibling.innerHTML = "done"
            input[i].nextElementSibling.style.color = "green"
            input[i].style.borderColor = "green"
        }
    }

    // title validation
    if(input[0].value.length>25){
        input[0].nextElementSibling.innerHTML = "too big"
        input[0].nextElementSibling.style.color = "red"
        form_valid++;
    }
    
    // author validation
    if(input[1].value.length>25){
        input[1].nextElementSibling.innerHTML = "too big"
        input[1].nextElementSibling.style.color = "red"
        form_valid++;
    }

    // price 

    var reg_price = /^[0-9]+((\.[0-9]{2})|())$/;
    if(input[2].value!==""){
        if(reg_price.test(input[2].value)){
            input[2].nextElementSibling.innerHTML = "yes"
            input[2].nextElementSibling.style.color = "green"
        }
        else{
            input[2].nextElementSibling.innerHTML = "no"
            input[2].nextElementSibling.style.color = "red"
        }
    }

    // if(isNaN(Number(input[2].value))){
    //     input[2].nextElementSibling.innerHTML = "enter a number"
    //     input[2].nextElementSibling.style.color = "red"
    //     input[2].style.borderColor = "red"
    //     form_valid++;
    // }
    // else if(Number(input[2].value<0)){
    //     input[2].nextElementSibling.innerHTML = "positive number"
    //     input[2].nextElementSibling.style.color = "red"
    //     input[2].style.borderColor = "red"
    //     form_valid++;   
    // }

     
    // language
    if(select.value == ""){
        select.nextElementSibling.innerHTML = "select a language"
        select.nextElementSibling.style.color = "red"
        select.style.borderColor = "red"
        form_valid++;
    }
    else{
        select.nextElementSibling.innerHTML = "done"
        select.nextElementSibling.style.color = "green"
        select.style.borderColor = "green"
    }
  
    var is_checked = false;
    for(i=0;i<type.length;i++){     
        if(type[i].checked){
            is_checked = true;
            break;
        }
        else{
            is_checked = false;
        }
    }
    if(is_checked){
        para.innerHTML = "done";
        para.style.color = "green";
    }
    else{
        para.innerHTML = "please select a type";
        para.style.color = "red";
        form_valid++;
    }
    
    if(form_valid == 0){
        var tr = table.insertRow(-1);
        tr.insertCell(0).innerHTML = input[0].value;
        tr.insertCell(1).innerHTML = input[1].value;
        tr.insertCell(2).innerHTML = input[2].value;
        tr.insertCell(3).innerHTML = input[3].value;
        tr.insertCell(4).innerHTML = select.value;
        tr.insertCell(5).innerHTML = "<input type='button' class='delete_btn' onclick=' myDelete(this)' value='delete'><input type='button' class='edit_btn' onclick='edit_row(this)' value='Edit'>"

        var type2=false;
        for(var i=0;i<type.length;i++){
            if(type[i].checked){
                tr.insertCell(5).innerHTML = type[i].value;
                break;
            }
        }
        
    }
    input[0].value = "";
    input[1].value = "";
    input[2].value = "";
    input[3].value = "";
    select.value = "";

    for(var i=0;i<type.length;i++){
        if(type[i].checked==true){
            type[i].checked = false
            break;
        } 
}
var reg_email = /^(((\w+)(.)(\w+))|((\w+)))(@)(\w+)(.)(\w+)$/;
if(email.value!==""){
    if(reg_email.test(email.value)){
        email.nextElementSibling.innerHTML = "yes"
        email.nextElementSibling.style.color = "green"
    }
    else{
        email.nextElementSibling.innerHTML = "no"
        email.nextElementSibling.style.color = "red"
    }

}


// delete button
function myDelete(r){
    if(confirm("sure?")){
        var i = r.parentNode.parentNode.rowIndex;
        table.deleteRow(i)
    }
}

// edit button
function edit_row(editing){
    var i = editing.parentNode.parentNode.rowIndex;
    var row = table.rows[i];

    if(editing.value=="Edit"){
     input[0].value = row.cells[0].innerHTML;
     input[1].value = row.cells[1].innerHTML;
     input[2].value = row.cells[2].innerHTML;
     input[3].value = row.cells[3].innerHTML;
     select.value = row.cells[4].innerHTML;

    for(var i=0;i<3;i++){
     if(type[i].value==row.cells[5].innerHTML){
         type[i].checked = true;
         break;
        }
        editing.value = "Save";
        document.getElementById('submit').setAttribute("disabled","true");
}
}
else{
    row.cells[0].innerHTML = input[0].value
    row.cells[1].innerHTML = input[1].value
    row.cells[2].innerHTML = input[2].value
    row.cells[3].innerHTML = input[3].value
    row.cells[4].innerHTML = select.value   

    for(var i=0;i<3;i++){
        if(type[i].checked){
            row.cells[5].innerHTML = type[i].value
            break;
        }
    }
    editing.value = "Edit"
    document.getElementById('submit').removeAttribute("disabled");
}


}
}



form.addEventListener("submit", valider);