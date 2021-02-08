
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

    EnviarDados(objectDesp);

});

function post(dados) {
    $.ajax({
        url: "http://localhost:81/api",
        contentType: 'application/json',
        cache: false,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(dados),
        success: function (data) {
            console.log(data);
        }

    });
}

function EnviarDados(dados) {

    let xhr = new XMLHttpRequest();
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.open("POST", "http://localhost:81/api");
    xhr.send(dados);
}
