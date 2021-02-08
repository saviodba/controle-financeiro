
document.getElementById('form-user-create').addEventListener("submit", function (event) {
    event.preventDefault();

    let fields = document.querySelectorAll("#form-user-create [name]");
    let despesa = {};

    fields.forEach(function (field, index) {

        if (field.name == "tipodespesa") {
            despesa[field.name] = field.value;
        }

        if (field.name == "situacao") {
            despesa[field.name] = field.checked;
        } else {
            despesa[field.name] = field.value;
        }

    });

    let objectDesp = new Despesa(
        despesa.despesa,
        despesa.valor,
        despesa.tipodespesa,
        despesa.data,
        despesa.situacao
    );


    console.log(objectDesp);

});



function EnviarDados(dados) {
    var formData = new FormData();
    formData.append(dados);
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let resposta = xhr.responseText;
            alert(resposta);
        }
    }

    xhr.open("POST", "http://localhost:81/api");
    xhr.send(formData);
}
