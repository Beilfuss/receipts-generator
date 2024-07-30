import validateData from "./validateData.js";
import generateReceipts from "./receipts.js";
import generateCover from "./receiptsCover.js";

function printReceipts() {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer.classList.add('hide');
    console.log(buttonsContainer);
    window.print();
}

function createPrintButton(buttonsContainer) {
    const printButton = document.createElement('button');
    printButton.classList.add('print-button');
    const printButtonText = document.createTextNode('Imprimir');
    printButton.appendChild(printButtonText);
    printButton.addEventListener('click', printReceipts);

    buttonsContainer.appendChild(printButton);
}

function goBackToForm() {
    const receiptsContainer = document.querySelector('.receipts-container');
    receiptsContainer.innerHTML = '';

    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer.innerHTML = '';

    const styleSheet = document.getElementById("stylesheet");
    styleSheet.setAttribute("href", "./assets/css/form.css");

    const appContainer = document.querySelector('.app-container');
    appContainer.classList.remove('hide');
}

function createBackButton(buttonsContainer) {
    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    const backButtonText = document.createTextNode('Voltar');
    backButton.appendChild(backButtonText);
    backButton.addEventListener('click', goBackToForm);

    buttonsContainer.appendChild(backButton);
}

function hideApp() {
    const appContainer = document.querySelector('.app-container');
    appContainer.classList.add('hide');
}

function getFormData(form) {

    const formData = new FormData(form);
    
    let data = {};
    for (const entry of formData) {
        data[entry[0]] = entry[1];
    }

    return data;
}

String.prototype.extenso = function(c){
    var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for(a = -1, l = v.length; ++a < l; t = ""){
            if(!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

function writeMoneyValueInWords(moneyValue) {
    let writtenValue = moneyValue.extenso(true);
    const firtsLetter = (writtenValue.charAt(0)).toUpperCase();
    writtenValue = firtsLetter + writtenValue.slice(1,);
    
    const writtenRentValue = document.getElementById("written-rent-value");
    writtenRentValue.value = (writtenValue);
}

function formatMoneyValue() {
    let rentValueInput = document.getElementById("rent-value");
    let value = rentValueInput.value;

    value = value.replace(/\D/g, "");
    value = parseFloat(value / 100);

    let formattedValue = value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    if (formattedValue.indexOf(',') === -1) {
        formattedValue += ',00';
    } else if (formattedValue.split(',')[1].length < 2) {
        formattedValue += '0';
    }

    rentValueInput.value = formattedValue;
    writeMoneyValueInWords(formattedValue);
}

function formatPhoneNumber(event) {
    let phoneNumberInput = (event.target).value;
    
    if (!phoneNumberInput) (event.target).value = "";
    phoneNumberInput = phoneNumberInput.replace(/\D/g,'');
    phoneNumberInput = phoneNumberInput.replace(/(\d{2})(\d)/,"($1) $2");
    phoneNumberInput = phoneNumberInput.replace(/(\d)(\d{4})$/,"$1-$2");
    
    (event.target).value = phoneNumberInput;
}

function focusNext(e, nextElementId) {
    if (e.keyCode === 13) { // Enter
      document.querySelector('#' + nextElementId).focus();
    }
}

function deactivateReceiptsCover() {
    const coverInputs = document.querySelector('.receipt-data-cover-fieldset').querySelectorAll('input');
    if (!this.checked) {
        for (let i = 0; i < coverInputs.length; i++) {
            coverInputs[i].disabled = true;
        }
    } else {
        for (let i = 0; i < coverInputs.length; i++) {
            coverInputs[i].disabled = false;
        }
    }
}

const form = document.querySelector('.receipt-data-form');

document.getElementById('submit-button').addEventListener('click', main);

const inputs = document.getElementsByTagName('input');

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id === 'underline-cover-colour') {
        inputs[i].addEventListener('keydown', (event) => focusNext(event, 'submit-button'));
    } else {
        inputs[i].addEventListener('keydown', (event) => focusNext(event, inputs[i+1].id));
    }
}

document.getElementById('rent-value').addEventListener('input', formatMoneyValue);
document.getElementById('receipts-cover-checkbox').addEventListener('change', deactivateReceiptsCover);

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id.includes('phone')) {
        inputs[i].addEventListener('input', formatPhoneNumber);
    }
}

function main() {

    const valid = validateData(form);

    if (valid) {
        const data = getFormData(form);
    
        hideApp();
    
        const styleSheet = document.getElementById("stylesheet");
        styleSheet.setAttribute("href", "./assets/css/receipts.css");
    
        const receiptsContainer = document.querySelector('.receipts-container');
        generateReceipts(receiptsContainer, data);

        if (data['receipts-cover'] === 'on') {
            generateCover(receiptsContainer, data);
        }
    
        const buttonsContainer = document.querySelector('.buttons-container');
        createBackButton(buttonsContainer);
        createPrintButton(buttonsContainer);    
    }
}
