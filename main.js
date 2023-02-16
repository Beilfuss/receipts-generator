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
        let p3Text = document.createTextNode('Valor: ');
        p3.appendChild(p3Text);
        let b1 = document.createElement('b');
        let b1Text = document.createTextNode('R$ '+valor);
        b1.appendChild(b1Text);
        p3.appendChild(b1);
        div4.appendChild(p3);

        let p4 = document.createElement('p');
        let p4Text1 = document.createTextNode('Recebemos de ');
        p4.appendChild(p4Text1);
        let b2 = document.createElement('b');
        let b2Text = document.createTextNode(nome);
        b2.appendChild(b2Text);
        p4.appendChild(b2);
        let p4Text2 = document.createTextNode(' a quantia de ');
        p4.appendChild(p4Text2);
        let b3 = document.createElement('b');
        let b3Text = document.createTextNode(valorExtenso);
        b3.appendChild(b3Text);
        p4.appendChild(b3);
        let p4Text3 = document.createTextNode('.');
        p4.appendChild(p4Text3)
        div4.appendChild(p4);

        let p5 = document.createElement('p');
        let p5Text = document.createTextNode('Aluguel referente aos dias:');
        p5.appendChild(p5Text);
        div4.appendChild(p5);

        let p6 = document.createElement('b');
        let p6Text = document.createTextNode(datas[i][0]+' a '+datas[i][1]+'.');
        p6.appendChild(p6Text);
        div4.appendChild(p6)

        let p7 = document.createElement('p');
        let p7Text = document.createTextNode('Brusque, ____/____/'+(datas[i][0]).slice(6,10)+'.');
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
        let p9Text = document.createTextNode('VALOR: ');
        p9.appendChild(p9Text);
        let b4 = document.createElement('b');
        b4.classList.add('rightValueBold');
        let b4Text = document.createTextNode('R$ '+valor);
        b4.appendChild(b4Text);
        p9.appendChild(b4);
        div7.appendChild(p9);

        let p10 = document.createElement('p');
        let p10Text1 = document.createTextNode('Recebemos de ');
        p10.appendChild(p10Text1);
        let b5 = document.createElement('b');
        let b5Text = document.createTextNode(nome);
        b5.appendChild(b5Text);
        p10.appendChild(b5);
        let p10Text2 = document.createTextNode(' a quantia de ');
        p10.appendChild(p10Text2);
        let b6 = document.createElement('b');
        let b6Text = document.createTextNode(valorExtenso);
        b6.appendChild(b6Text);
        p10.appendChild(b6);
        let p10Text3 = document.createTextNode(', referente ao aluguel de ');
        p10.appendChild(p10Text3);
        let b7 = document.createElement('b');
        let b7Text = document.createTextNode('galpão nº '+numeroGalpao);
        b7.appendChild(b7Text);
        p10.appendChild(b7);
        let p10Text4 = document.createTextNode(' conforme contrato lavrado em cartório. Aluguel correspondente aos dias de ');
        p10.appendChild(p10Text4);
        let b8 = document.createElement('b');
        let b8Text = document.createTextNode(datas[i][0]+' a '+datas[i][1]);
        b8.appendChild(b8Text);
        p10.appendChild(b8);
        let p10Text5 = document.createTextNode(', e para clareza firmamos o presente.');
        p10.appendChild(p10Text5);
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