class DespesaController {

    constructor(formId) {
        this.formEl = document.getElementById(formId);
    }

    getValues() {

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

    }
}
