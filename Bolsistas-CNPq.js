//==UserScript==
// @name         Bolsistas CNPq
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Criado para baixar a listas de Bolsitas de Produtividade do CNPq
// @author       Ewerton Silva Santos - ewerton_dc@hotmail.com.br - Universidade Federal de Minas Gerais
// @match        http://cnpq.br/bolsistas-vigentes*
// @match        http://cnpq.br/bolsistas-vigentes?*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript== https://code.jquery.com/jquery-3.3.1.min.js

(function() {
    'use strict';

    //__________ Declaração de varaiveis __________//
    let content = document.getElementsByClassName('dados-perfil');//Busca os todos os os objetos da classe dados-perfil,
                                                                  // a qual estao os dados do Bolsista
    let size = content.length;
    let texto= {};
    let array=[];
    let csv = 0;
    let vetor = [];
    let a_href = 0;

    //__________ Percorrendo indices do objeto __________//
    for(let i=0;i<size;i++){
        texto[i] = content[i].innerText;//Atribui ao vetor texto apenas os elementos textuais do indice atual do objeto
        array[i] = texto[i].replace(/\n/gi, '||');//Subtitui todos os caracteres \n por ||
        array[i] = array[i] + '\n';//Concatena o vetor contendo os dados dos bolsitas com o caracter \n
        csv = csv+array[i];//Realiza uma concatenacao consecutiva dos dados
    }

    //__________ Funcao que realiza a criacao do csv e seu downaload __________//
    function downloadCSV(csv) {

        let data, filename, link;
        if (csv == null) return;//Verifica se o dado recebido e valido

        let indice = document.getElementsByClassName('search-results')[0].innerText;//Declara um indice para o arquivo baseado na paginação dos resultados
        indice = indice.replace(/\n/gi,'').replace(/\t/g, '').replace(" ","").replace('Mostrando','').replace('resultados','').replace(" - ","_");
        indice = indice.split("de");

        let name = 'Bolsistas' + indice + '.csv';//Concatena strings para criar o nome do arquiv .csv
        filename = name;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;//Cabecalho que define que o tipo do arquivo é csv e seu charset
        }
        data = encodeURI(csv);//Criar caracteres de escape para criacao e uma URL

        link = document.createElement('a');//Cria um elemento <a> no corpo da pagina
        link.setAttribute('href', data);//Define seu atributo href
        link.setAttribute('download', filename);/*
                                                        *Permite que o arquivo seja baixado ao ser cliacado,
                                                        *tambem define o nome do arqiov de saida
                                                */
        $('body').append(link);
        link.click();//Simula o clique no elemento criado desencadeando o donwload do arquivo
    }

    downloadCSV(csv);//A função de Download e chamada

    a_href = $('.lfr-pagination-buttons li a').eq(2).attr('href');//Busca a URL do botão proximo

    setTimeout(function() {//Funcao de Set time que retarda o redirecionamento para a proxima pagina permitindo o download correto
        window.location.href= a_href;
    }, 1500);

})();
