// ==UserScript==
// @name         Bolsistas CNPq
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Criado para baixar a listas de Bolsitas de Produtividade do CNPq
// @author       Ewerton Silva Santos - ewerton_dc@hotmail.com.br - Universidade Federal de Minas Gerais
// @match        http://cnpq.br/bolsistas-vigentes?*
// @grant        none
// ==/UserScript== https://code.jquery.com/jquery-3.3.1.min.js

(function() {
    'use strict';

    let content =document.getElementsByClassName('dados-perfil');
    let size = content.length;
    let texto= {};
    let array=[];
    let sizeJ = 0;
    let flag = 0;

    let csv = 0;

    let vetor = [];
    let matriz= [vetor];
    let block=0;


    flag = content[0].innerText;
    block = flag[0];

    for(let i=0;i<size;i++){
        texto[i] = content[i].innerText;
        array[i] = texto[i].replace(/\n/gi, '||');
        array[i] = array[i] + '\n';
        csv = csv+array[i];

    }

    console.log(array);

    function downloadCSV(args) {
        var data, filename, link;
        var csv = args;

        if (csv == null) return;

        var indice = '01';
        var name = 'Escolar' + indice + '.csv';
        console.log(name);
        filename = name;

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
    downloadCSV(csv);


    var a_href = $('.lfr-pagination-buttons li a').eq(2).attr('href');
    console.log(a_href);

    setTimeout(function() {
        window.location.href= a_href;
    }, 3000);

})();
