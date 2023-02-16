function gerar_recibos() {

    let numId = parseInt(document.getElementById("numId").value);
    let valor = document.getElementById("valor").value;
    let valorExtenso = document.getElementById("valorExtenso").value;
    let nome = document.getElementById("nome").value;
    let dataInicial = document.getElementById("dataInicial").value;
    let numeroGalpao = document.getElementById("numeroGalpao").value;

    let datas = gerar_datas(dataInicial)

    document.getElementById("header").style.display = "none";

    for (let i = 0; i < 12; i++) {

        let div1 = document.createElement('div');
        div1.classList.add('allParts');
        document.body.appendChild(div1);

        if (i == 2 || i == 5 || i == 8) {
            div1.setAttribute('id', 'third')
        }

        let div2 = document.createElement('div');
        div2.classList.add('firstPart');
        div1.appendChild(div2);

        let div3 = document.createElement('div');
        div3.classList.add('identifiers');
        div2.appendChild(div3);

        let p1 = document.createElement('p');
        p1.classList.add('receiptId');
        let p1Text = document.createTextNode(numId + i);
        p1.appendChild(p1Text);
        div3.appendChild(p1);

        let p2 = document.createElement('p');
        p2.classList.add('receiptNumberLeft');
        let p2Text = document.createTextNode('RECIBO N° '+(i+1));
        p2.appendChild(p2Text);
        div3.appendChild(p2);

        let div4 = document.createElement('div');
        div4.classList.add('leftData');
        div2.appendChild(div4);

        let p3 = document.createElement('p');
        let p3Text = document.createTextNode('Valor: R$ '+valor);
        p3.appendChild(p3Text);
        div4.appendChild(p3);

        let p4 = document.createElement('p');
        let p4Text = document.createTextNode('Recebemos de '+nome+' a quantia de '+valorExtenso+'.');
        p4.appendChild(p4Text);
        div4.appendChild(p4);

        let p5 = document.createElement('p');
        let p5Text = document.createTextNode('Aluguel referente aos dias:');
        p5.appendChild(p5Text);
        div4.appendChild(p5);

        let p6 = document.createElement('p');
        let p6Text = document.createTextNode(datas[i][0]+' a '+datas[i][1]+'.');
        p6.appendChild(p6Text);
        div4.appendChild(p6)

        let p7 = document.createElement('p');
        let p7Text = document.createTextNode('Brusque, ____/____/____.');
        p7.appendChild(p7Text);
        div4.append(p7);

        let div5 = document.createElement('div');
        div5.classList.add('secondPart');
        div1.appendChild(div5);

        let div6 = document.createElement('div');
        div6.classList.add('rightData');
        div5.appendChild(div6);

        let div7 = document.createElement('div');
        div7.classList.add('receiptAndValue');
        div6.appendChild(div7);

        let p8 = document.createElement('p');
        p8.classList.add('receiptNumberRight');
        let p8Text = document.createTextNode('RECIBO N° '+(i+1));
        p8.appendChild(p8Text);
        div7.appendChild(p8);

        let p9 = document.createElement('p');
        p9.classList.add('rightValue');
        let p9Text = document.createTextNode('VALOR: R$ '+valor);
        p9.appendChild(p9Text);
        div7.appendChild(p9);

        let p10 = document.createElement('p');
        let p10Text = document.createTextNode('Recebemos de '+nome+' a quantia de '+valorExtenso+', referente ao aluguel de galpão nº '+numeroGalpao+' conforme contrato lavrado em cartório. Aluguel correspondente aos dias de '+datas[i][0]+' a '+datas[i][1]+', e para clareza firmamos o presente.');
        p10.appendChild(p10Text);
        div6.appendChild(p10);

        let p11 = document.createElement('p');
        let p11Text = document.createTextNode('Brusque, ______ de _______________________________ de '+(datas[i][0]).slice(6,10)+'.');
        p11.appendChild(p11Text);
        div6.appendChild(p11);

        let p12 = document.createElement('p');
        let p12Text = document.createTextNode('Assinatura do Locatário: __________________________________.');
        p12.appendChild(p12Text);
        div6.appendChild(p12);
    }
}

function gerar_datas(dataInicial) {

    let ano = parseInt(dataInicial.slice(0,5));
    let mes = parseInt(dataInicial.slice(5,7));
    let dia = parseInt(dataInicial.slice(8,10))

    let datas = []

    let getDays = (ano, mes) => {
        return new Date(ano, mes, 0).getDate();
    }

    if (dia == 1) {

        console.log('PRIMEIRO')

        for (let i = 0; i < 12; i++) {

            let totalDays = getDays(ano, mes);
    
            let data1 = `01/${mes}/${ano}`;
            let data2 = `${totalDays}/${mes}/${ano}`;
    
            if (mes < 10) {
                data1 = `01/0${mes}/${ano}`;
                data2 = `${totalDays}/0${mes}/${ano}`;
            }
    
            datas.push([data1, data2]);
    
            mes = mes+1;
    
            if (mes == 13) {
                mes = mes-12
                ano = ano + 1
            };
        }
    } else {

        console.log('SEGUNDO')

        for (let i = 0; i < 12; i++) {

            if (mes == 13) {
                mes = mes-12
                ano = ano+1
            };

            let data1 = `${dia}/${mes}/${ano}`;
            let data2 = `${dia}/${mes+1}/${ano}`;        

            if (mes == 12) {
                data2 = `${dia}/0${mes-11}/${ano+1}`;
                if (data2.length == 9) {
                    data2 = `0${dia}/0${mes-11}/${ano+1}`;
                }    
            }

            if (data1.length == 8) {
                data1 = `0${dia}/0${mes}/${ano}`;
            }

            if (data2.length == 8) {
                data2 = `0${dia}/0${mes+1}/${ano}`;
            }

            if (data1.length == 9) {
                if (dia < 10) {
                    data1 = `0${dia}/${mes}/${ano}`;
                } else if (mes < 10) {
                    data1 = `${dia}/0${mes}/${ano}`;
                }
            }

            if (data2.length == 9) {
                if ((dia+1) < 10) {
                    data2 = `0${dia}/${mes+1}/${ano}`;
                } else if ((mes+1) < 10) {
                    data2 = `${dia}/0${mes+1}/${ano}`;
                }
            }

            datas.push([data1, data2]);
    
            mes = mes+1;
        }
    }
    console.log(datas)
    return datas
}