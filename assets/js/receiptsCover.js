
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

export default function generateCover(receiptsContainer, data) {

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
