$(document).ready(function () {
    
    $('.btn_Del').click(function ( ) {
        alert("Excluir registro")

    });

    $('.btn_Edit').click(function () {        
        editarregistro()
    });

    $('#btn_voltar').click(function () {
       window.location.href = '/listaDespesas';
    });

    $.ajax({
        url:'/menu',
        method: "get",
        success:function(data){                
            document.getElementById("menu").innerHTML = data;
        }
    });
    

    //let btnGravar = document.querySelector('#btn_gravar');

    //btnGravar.addEventListener('click', e =>{
        
   // });

    /*
    $('#btn_gravar').click(function(acao){
        console.log(acao);

        if (acao === 1){
            console.log("Novo Registro")
        } else if (acao === 2 ){
            console.log("Edição de Registro");
        }
    

    });*/
});

function cadastro(tipo){
    if (tipo == 1 ){
        console.log("Novo cadastro")
    } else {
            
        let dados  = $(this).serialize();
        $("#theForm").ajaxSubmit({url: '?editardespesa', type: 'post'})

        /*$.ajax({
            url:'/editardespesa',
            method: "post",
            data:  {
                dados: dados
            },
            dataType: "json",
            success:function(data){                
                //document.getElementById("menu").innerHTML = data;
                console.log(data);    
            }
        });*/

    }


      
}



function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for(i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
    aux = '';
    for(; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = '';
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        objTextBox.value += aux2.charAt(i);
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}  