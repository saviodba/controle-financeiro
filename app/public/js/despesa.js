let fields = document.querySelectorAll("#form-user-create [name]");
let despesa = {};

fields.forEach(function(field, index){
    
    if (field.name == "tipodespesa"){
        despesa[field.name] = field.value;
        console.log(field.value);
    }
  
    if(field.name == "situacao"){
        despesa[field.name] = field.checked; 
    } else {
        despesa[field.name] = field.value;
    }
    
});
console.log(despesa);