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
    printButton.setAttribute('onclick', 'printReceipts()');

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
    backButton.setAttribute('onclick', 'goBackToForm()');

    buttonsContainer.appendChild(backButton);
}

function createReceiptsCoverPayersData(data) {

    const receiptsCoverPayersData = document.createElement('div');
    receiptsCoverPayersData.classList.add('receipts-cover-payers-data');

    const receiptsCoverPayersDataContent = document.createElement('div');
    receiptsCoverPayersDataContent.classList.add('receipts-cover-payers-data-content');
    receiptsCoverPayersData.appendChild(receiptsCoverPayersDataContent);

    for (let i = 1; i < 4; i++) {

        if (data[`owners-name-${i}`]) {

            const ownersData = document.createElement('div');
            ownersData.classList.add('owners-data');

            const ownersName = document.createElement('p');
            ownersName.classList.add('owners-name');
            const ownersNameText = document.createTextNode(data[`owners-name-${i}`]);
            ownersName.appendChild(ownersNameText);
            ownersData.appendChild(ownersName);

            const ownersPhone = document.createElement('p');
            ownersPhone.classList.add('owners-phone');
            const ownersPhoneText = document.createTextNode(data[`owners-phone-${i}`]);
            ownersPhone.appendChild(ownersPhoneText);
            ownersData.appendChild(ownersPhone);

            receiptsCoverPayersDataContent.appendChild(ownersData);
        }
    }
    return receiptsCoverPayersData;
}

function createReceiptsCoverCompanyName(companyName, underlineColour) {
    const receiptsCoverCompanyName = document.createElement('p');
    receiptsCoverCompanyName.classList.add('receipts-cover-company-name')
    receiptsCoverCompanyName.style.textDecorationColor = underlineColour;
    const receiptsCoverCompanyNameText = document.createTextNode(`${companyName}`);
    receiptsCoverCompanyName.appendChild(receiptsCoverCompanyNameText);

    return receiptsCoverCompanyName;
}

function createReceiptsCoverBuildingNumber(buildingNumber) {
    const receiptsCoverBuildingNumber = document.createElement('p');
    receiptsCoverBuildingNumber.classList.add('receipts-cover-building-number')
    const receiptsCoverBuildingNumberText = document.createTextNode(`Galpão N° ${buildingNumber}`);
    receiptsCoverBuildingNumber.appendChild(receiptsCoverBuildingNumberText);

    return receiptsCoverBuildingNumber;
}

function createReceiptsCoverDataContainer() {
    const receiptsCoverDataContainer = document.createElement('div');
    receiptsCoverDataContainer.classList.add('receipts-cover-data-container');

    return receiptsCoverDataContainer;
}

function createReceiptsCoverContainer(coverColour) {
    const receiptsCoverContainer = document.createElement('div');
    receiptsCoverContainer.classList.add('receipts-cover-container');
    receiptsCoverContainer.style.backgroundColor = coverColour;

    return receiptsCoverContainer;
}

function generateCover(receiptsContainer, data) {

    const receiptsCoverContainer = createReceiptsCoverContainer(data['cover-colour']);

    const receiptsCoverDataContainer = createReceiptsCoverDataContainer();
    receiptsCoverContainer.appendChild(receiptsCoverDataContainer);

    const receiptsCoverBuildingNumber = createReceiptsCoverBuildingNumber(data['building-number']);
    receiptsCoverDataContainer.appendChild(receiptsCoverBuildingNumber);

    const receiptsCoverCompanyName = createReceiptsCoverCompanyName(data['company-name'], data['underline-cover-colour']);
    receiptsCoverDataContainer.appendChild(receiptsCoverCompanyName);

    const receiptsCoverPayersData = createReceiptsCoverPayersData(data);
    receiptsCoverDataContainer.appendChild(receiptsCoverPayersData);

    receiptsContainer.appendChild(receiptsCoverContainer);
}

function createReceiptSpace() {
    const receiptSpace = document.createElement('div');
    receiptSpace.classList.add('receipts-space');

    return receiptSpace;
}

function createReceiptMainBodyPayersSignature() {
    const receiptMainBodyPayersSignature = document.createElement('p');
    receiptMainBodyPayersSignature.classList.add('receipt-main-body-payers-signature');

    const receiptMainBodyPayersSignatureText = document.createTextNode('Assinatura do Locatário: __________________________________.');
    receiptMainBodyPayersSignature.appendChild(receiptMainBodyPayersSignatureText);

    return receiptMainBodyPayersSignature;
}

function createReceiptMainBodyCityAndFillingDate(city, dates) {

    const year = (dates[1]).slice(6);

    const receiptMainBodyCityAndFillingDate = document.createElement('p');
    receiptMainBodyCityAndFillingDate.classList.add('receipt-main-city-and-filling-date');

    const receiptMainBodyCityAndFillingDateFormatted = document.createTextNode(`${city}, ______ de _______________________________ de ${year}.`);
    receiptMainBodyCityAndFillingDate.appendChild(receiptMainBodyCityAndFillingDateFormatted);

    return receiptMainBodyCityAndFillingDate;
}

function createReceiptMainBodyText(data, dates) {
    const receiptMainBodyText = document.createElement('p');
    receiptMainBodyText.classList.add('receipt-main-body-text');

    receiptMainBodyText.innerHTML = `Recebemos de <strong>${data['payers-name']}</strong> 
    a quantia de <strong>${data['written-rent-value']}</strong>, referente ao aluguel de 
    <strong>galpão nº ${data['building-number']}</strong> conforme contrato lavrado em cartório. 
    Aluguel correspondente aos dias de <strong>${dates[0]} a ${dates[1]}</strong>, e para clareza firmamos o presente.`;

    return receiptMainBodyText;
}

function createReceiptMainBody(data, dates) {
    const receiptMainBody = document.createElement('div');
    receiptMainBody.classList.add('receipt-main-body');

    const receiptMainBodyText = createReceiptMainBodyText(data, dates);
    receiptMainBody.appendChild(receiptMainBodyText);

    const receiptMainBodyCityAndFillingDate = createReceiptMainBodyCityAndFillingDate(data['city-name'], dates);
    receiptMainBody.appendChild(receiptMainBodyCityAndFillingDate);

    const receiptMainBodyPayersSignature = createReceiptMainBodyPayersSignature();
    receiptMainBody.appendChild(receiptMainBodyPayersSignature);

    return receiptMainBody;
}

function createReceiptMainHeader(receiptNumber, data) {
    const receiptMainHeader = document.createElement('div');
    receiptMainHeader.classList.add('receipt-main-header');

    const receiptMainNumber = createReceiptNumber(receiptNumber);
    receiptMainNumber.classList.add('receipt-main-number');
    receiptMainHeader.appendChild(receiptMainNumber);

    const receiptMainValueNumber = createReceiptValueNumber(data['rent-value']);
    receiptMainValueNumber.classList.add('receipt-main-value-number');
    receiptMainHeader.appendChild(receiptMainValueNumber);

    return receiptMainHeader;
}

function createReceiptMain(receiptNumber, data, dates) {
    const receiptMain = document.createElement('div');
    receiptMain.classList.add('receipt-main');

    const receiptMainHeader = createReceiptMainHeader(receiptNumber, data);
    receiptMain.appendChild(receiptMainHeader);

    const receiptMainBody = createReceiptMainBody(data, dates);
    receiptMain.appendChild(receiptMainBody);

    return receiptMain;
}

function createReceiptSummaryCityAndFillingDate(city, dates) {

    const year = (dates[1]).slice(6);

    const receiptSummaryCityAndFillingDate = document.createElement('p');
    receiptSummaryCityAndFillingDate.classList.add('receipt-summary-city-and-filling-date');

    const receiptSummaryCityAndFillingDateFormatted = document.createTextNode(`${city}, ____/____/${year}.`);
    receiptSummaryCityAndFillingDate.appendChild(receiptSummaryCityAndFillingDateFormatted);

    return receiptSummaryCityAndFillingDate;
}

function createReceiptSummaryDates(dates) {
    const receiptSummaryDates = document.createElement('strong');
    receiptSummaryDates.classList.add('receipt-summary-dates');

    receiptSummaryDatesFormatted = document.createTextNode(`${dates[0]} a ${dates[1]}.`);
    receiptSummaryDates.appendChild(receiptSummaryDatesFormatted);

    return receiptSummaryDates;
}

function createReceiptSummaryRentText() {
    const receiptSummaryRentText = document.createElement('p');
    receiptSummaryRentText.classList.add('receipt-summary-rent-text');

    receiptSummaryRentText.innerHTML = 'Aluguel referente aos dias:';

    return receiptSummaryRentText;
}

function createReceiptSummaryValueText(payersName, writtenRentValue) {
    const receiptSummaryValueText = document.createElement('p');
    receiptSummaryValueText.classList.add('receipt-summary-value-text');

    receiptSummaryValueText.innerHTML = 'Recebemos de <strong>' + payersName + '</strong> a quantia de <strong>' + writtenRentValue + '</strong>.';

    return receiptSummaryValueText;
}

function createReceiptValueNumber(rentValue) {
    const receiptValueNumber = document.createElement('p');
    receiptValueNumber.innerHTML = `Valor: <strong>R$ ${rentValue}</strong:`;

    return receiptValueNumber;
}

function createReceiptSummaryBody(data, dates) {
    const receiptSummaryBody = document.createElement('div');
    receiptSummaryBody.classList.add('receipt-summary-body');

    const receiptSummaryValueNumber = createReceiptValueNumber(data['rent-value']);
    receiptSummaryValueNumber.classList.add('receipt-summary-value-number');
    receiptSummaryBody.appendChild(receiptSummaryValueNumber);

    const receiptSummaryValueText = createReceiptSummaryValueText(data['payers-name'], data['written-rent-value']);
    receiptSummaryBody.appendChild(receiptSummaryValueText);

    const receiptSummaryRentText = createReceiptSummaryRentText();
    receiptSummaryBody.appendChild(receiptSummaryRentText);

    const receiptSummaryDates = createReceiptSummaryDates(dates);
    receiptSummaryBody.appendChild(receiptSummaryDates);

    const receiptCityAndFillingDate = createReceiptSummaryCityAndFillingDate(data['city-name'], dates);
    receiptSummaryBody.appendChild(receiptCityAndFillingDate);

    return receiptSummaryBody;
}

function createReceiptNumber(receiptNumber) {
    const receiptNumberContainer = document.createElement('p');
    const receiptNumberText = document.createTextNode(`RECIBO N° ${receiptNumber}`);
    receiptNumberContainer.appendChild(receiptNumberText);

    return receiptNumberContainer;
}

function createReceiptId(receiptNumberId, receiptNumber) {
    const receiptNumberIdInt = (parseInt(receiptNumberId)) + (receiptNumber - 1);

    const receiptId = document.createElement('p');
    receiptId.classList.add('receipt-id');
    const receiptIdNumber = document.createTextNode(receiptNumberIdInt);
    receiptId.appendChild(receiptIdNumber);

    return receiptId;
}

function createReceiptSummaryHeader(receiptNumberId, receiptNumber) {
    const receiptSummaryHeader = document.createElement('div');
    receiptSummaryHeader.classList.add('receipt-summary-header');

    const receiptId = createReceiptId(receiptNumberId, receiptNumber);
    receiptSummaryHeader.appendChild(receiptId);

    const receiptSummaryNumber = createReceiptNumber(receiptNumber);
    receiptSummaryNumber.classList.add('receipt-summary-number');
    receiptSummaryHeader.appendChild(receiptSummaryNumber);

    return receiptSummaryHeader;
}

function createReceiptSummary(receiptNumber, data, dates) {
    const receiptSummary = document.createElement('div');
    receiptSummary.classList.add('receipt-summary');

    const receiptSummaryHeader = createReceiptSummaryHeader(data['receipt-number-id'], receiptNumber);
    receiptSummary.appendChild(receiptSummaryHeader);

    const receiptSummaryBody = createReceiptSummaryBody(data, dates);
    receiptSummary.appendChild(receiptSummaryBody);

    return receiptSummary;
}

function createReceiptContainer(){
    const receiptContainer = document.createElement('div');
    receiptContainer.classList.add('receipt-container'); 

    return receiptContainer;
}

function generateReceipts(receiptsContainer, data) {

    const dates = generateDates(data['initial-date']);

    for (let i = 0; i < 12; i++) {
        const receiptContainer = createReceiptContainer();

        const receiptSummary = createReceiptSummary((i + 1), data, dates[i]);
        receiptContainer.appendChild(receiptSummary);

        const receiptMain = createReceiptMain((i + 1), data, dates[i]);
        receiptContainer.appendChild(receiptMain);

        if (i !== 0 && ((i) % 3) === 0) {
            const receiptsSpace = createReceiptSpace();
            receiptsContainer.appendChild(receiptsSpace);
        }

        receiptsContainer.appendChild(receiptContainer);
    }
}

function hideApp() {
    const appContainer = document.querySelector('.app-container');
    appContainer.classList.add('hide');
}

function generateDates(initialDate) {

    let year = parseInt(initialDate.slice(0, 5));
    let month = parseInt(initialDate.slice(5, 7));
    let day = parseInt(initialDate.slice(8, 10));

    const getMonthNumberOfDays = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const addLeftZero = (n) => {
        return n >= 10 ? n : `0${n}`;
    }

    const dates = [];
    let receiptInitialDate;
    let receiptFinalDate;

    for (let i = 0; i < 12; i++) {

        if (month > 12) {
            month = 1;
            year++;
        }

        receiptInitialDate = `${addLeftZero(day)}/${addLeftZero(month)}/${year}`;

        if (day === 1) {
            receiptFinalDate = `${getMonthNumberOfDays(year, month)}/${addLeftZero(month)}/${year}`;
        } else if (month === 12) {
            receiptFinalDate = `${addLeftZero(day)}/${addLeftZero(month - 11)}/${year + 1}`;
        } else {
            receiptFinalDate = `${addLeftZero(day)}/${addLeftZero(month + 1)}/${year}`;
        }

        dates.push([receiptInitialDate, receiptFinalDate]); 
        
        month++;
    }
    return dates;
}

function getFormData(form) {

    const formData = new FormData(form);
    
    data = {};
    for (const entry of formData) {
        data[entry[0]] = entry[1];
    }

    return data;
}

String.prototype.extenso = function(c){ // Função para converter número no formato string para número por extenso
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

const form = document.querySelector('.receipt-data-form');

function main() {

    const data = getFormData(form);

    hideApp();

    const styleSheet = document.getElementById("stylesheet");
    styleSheet.setAttribute("href", "./assets/css/receipts.css");

    const receiptsContainer = document.querySelector('.receipts-container');
    generateReceipts(receiptsContainer, data);

    generateCover(receiptsContainer, data);

    const buttonsContainer = document.querySelector('.buttons-container');
    createBackButton(buttonsContainer);
    createPrintButton(buttonsContainer);
}
