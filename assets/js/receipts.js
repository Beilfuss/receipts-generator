
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

    const receiptSummaryDatesFormatted = document.createTextNode(`${dates[0]} a ${dates[1]}.`);
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

function generateDates(initialDate, receiptsQuantity) {

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

    for (let i = 0; i < receiptsQuantity; i++) {

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

export default function generateReceipts(receiptsContainer, data) {

    const initialDate = data['initial-date'];
    const receiptsQuantity = data['receipts-quantity'];

    const dates = generateDates(initialDate, receiptsQuantity);

    for (let i = 0; i < receiptsQuantity; i++) {
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
