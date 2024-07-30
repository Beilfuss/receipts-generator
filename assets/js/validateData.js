
function createError(field, message) {
    const error = document.createElement('div');
    error.innerHTML = message;
    error.classList.add('error-text');

    if (field.classList.contains('colour')) {
        error.classList.add('error-text-colour');
        const receiptDataCoverFieldset = document.querySelector('.receipt-data-cover-fieldset');
        const lastChild = receiptDataCoverFieldset.lastElementChild;
        lastChild.insertAdjacentElement('afterend', error);
    } else {
        field.insertAdjacentElement('afterend', error);
    }
}

export default function validateData(form){
    let valid = true;

    for(let errorText of form.querySelectorAll('.error-text')) {
        errorText.remove();
    }

    for(let field of form.querySelectorAll('.required')) {
        if (!field.value && !field.disabled) {
            createError(field, "Campo obrigatório");
            valid = false;
        }
    }

    for(let field of form.querySelectorAll('.validate')) {
        if (field.classList.contains('string') && field.value !== "") {
            if (!field.value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s,.]+$/g)) {
                createError(field, "Campo precisa ser texto");
                valid = false;
            }
        } else if (field.classList.contains('number') && field.value !== "") {
            if (!field.value.match(/^[0-9]+$/g)) {
                createError(field, "Campo precisa ser número");
                valid = false;
            }
        } else if (field.classList.contains('colour')) {
            if (field.value === "#000000" && !field.disabled) {
                createError(field, "Campo obrigatório");
                valid = false;
            }
        }
    }
    return valid;
}
