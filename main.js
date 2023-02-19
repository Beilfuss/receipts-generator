function gerar_recibos() {
  // Função gerar_recibos é muito grande e tem responsabilidades demais. Cada função = 1 responsabilidade
  // Ler sobre SOLID, especificamente sobre o S.
  // https://en.wikipedia.org/wiki/SOLID
  // https://en.wikipedia.org/wiki/Single-responsibility_principle

  /*extract
    
        Responsabilidade 1 = obter dados do formulário
        Extrair função para obter dados do formulário
    
        const formData = getFormData()

        function getFormData(){

            let numId = parseInt(...)
            ...
        
            ou

            usar FormData()? https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

            return {numId, valor, valorExtenso, ...}

        }

        
    */

  let numId = parseInt(document.getElementById("numId").value);
  let valor = document.getElementById("valor").value;
  let valorExtenso = document.getElementById("valorExtenso").value;
  let nome = document.getElementById("nome").value;
  let dataInicial = document.getElementById("dataInicial").value;
  let numeroGalpao = document.getElementById("numeroGalpao").value;

  // responsabilidade 2: gerar datas - ok
  let datas = gerar_datas(dataInicial);

  /*
    Responsabilidade 3 = ocultar o header

        - Extrair função hideHeader

    Em geral, má prática settar propriedades css diretamente no código. 
        - É mais bem visto criar um classe css como ".hide" e alterar a classe com javascript

  */
  document.getElementById("header").style.display = "none";

  /*Code smell!

        - Próxima sessão de código está difícil de entender e, consequentemente, dar manutenção alterar e debuggar
        - Variáveis com nomes não descritivos - div1, div2, p1, p2, etc... não tem valor semântico algum. Na minha opinião, todas deveriam ser trocadas.
        - classes com nomes pouco descritivos - firstpart, secondPart... pouco valor semântico. Na minha opinião, a maioria deveria ser trocada.
        - Inúmeras responsabilidades misturadas
  */
  /*
    - Responsabilidade 4: criar recibos - com várias subresponsabilidades

        - Extrair função generateReceipts() com várias subfunções. Exemplo(incompleto, mas acho que dá para pegar a ideia e tentar reproduzir para o resto):
            - Deixarei marcado no código original várias subfunções que poderiam (deveriam, na minha opinião) ser extraídas

        function generateReceipts(){

            const NUMBER_OF_RECEIPTS = 12

            const receiptList = new Array(NUMBER_OF_RECEIPTS);
            receiptList.map((val, index) => {

                //val estará vazio

                const receiptContainer = createReceiptContainer();
                const receiptSummary = createReceiptSummary(index+1);
        
            })
        }

        function createReceiptContainer(){
            const receiptContainer = document.createElement("div");
            receiptContainer.classList.add("receiptContainer"); 

            return receiptContainer;
        }

        function createReceiptSummary(receiptNumber){

            const summaryContainer = document.createElement("div");
            summaryContainer.classList.add("summaryContainer");

            const summaryHeader = createReceiptSummaryHeader(receiptNumber);
            const summaryBody = createReceiptSummaryBody();

            summaryContainer.appendChild(summaryHeader);
            summaryContainer.appendChild(summaryBody);
        
            return summaryContainer;
        }

        function createReceiptSummaryHeader(receiptNumber){
            
            const receiptSummaryHeader = document.createElement("div");
            receiptSummaryHeader.classList.add("summaryHeader");
    
            //provavelmente ainda seria boa ideia fazer duas subfunções aqui em vez de juntar as operações abaixo

            let receiptId = document.createElement("p");
            receiptId.classList.add("receiptId");
            let receiptIdText = document.createTextNode(receiptNumber);
            receiptId.appendChild(receiptIdText);
            
            let receiptTitle = document.createElement("p");
            receiptTitle.classList.add("receiptTitle");
            let titleText = document.createTextNode("RECIBO N° " + receiptNumber);
            receiptTitle.appendChild(titleText);
    
            receiptSummaryHeader.appendChild(receiptId);
            receiptSummaryHeader.appendChild(receiptTitle);

        }

        function createReceiptSummaryBody(){
            ...
        }

    */

  for (let i = 0; i < 12; i++) {
    //createReceiptContainer()
    let div1 = document.createElement("div");
    div1.classList.add("allParts"); //trocar .allParts por .receiptContainer?
    document.body.appendChild(div1);

    /*
        - Má prática.
        - Não é escalável. E se fossem 90000 recibos?
            - Boa prática: https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
        - Sempre que você precisar settar as coisas manualmente dessa forma, buscar descobrir primeiro se existe e qual a maneira de fazer isso computacionalmente.
    */
    if (i == 2 || i == 5 || i == 8) {
      div1.setAttribute("id", "third");
    }

    /*
        - Existe um nome para o lado esquerdo do recibo? Se existir, usá-lo. Eu desconheço, vou chamar de receiptSummary
    */
    //createReceiptSummary()
    let div2 = document.createElement("div");
    div2.classList.add("firstPart");
    div1.appendChild(div2);

    let div3 = document.createElement("div");
    div3.classList.add("identifiers"); //trocaria para summaryHeader, mas identifiers é aceitável
    div2.appendChild(div3);

    //createSummaryHeader()
    let p1 = document.createElement("p");
    p1.classList.add("receiptId");
    let p1Text = document.createTextNode(numId + i);
    p1.appendChild(p1Text);
    div3.appendChild(p1);

    let p2 = document.createElement("p");
    p2.classList.add("receiptNumberLeft");
    let p2Text = document.createTextNode("RECIBO N° " + (i + 1));
    p2.appendChild(p2Text);
    div3.appendChild(p2);

    //createSummaryBody()
    let div4 = document.createElement("div");
    div4.classList.add("leftData");
    div2.appendChild(div4);

    //createSummaryValueSection()
    let p3 = document.createElement("p");
    let p3Text = document.createTextNode("Valor: ");
    p3.appendChild(p3Text);
    let b1 = document.createElement("b");
    let b1Text = document.createTextNode("R$ " + valor);
    b1.appendChild(b1Text);
    p3.appendChild(b1);
    div4.appendChild(p3);

    //createSummaryDescriptionSection() melhorar o nome?
    let p4 = document.createElement("p");
    let p4Text1 = document.createTextNode("Recebemos de ");
    p4.appendChild(p4Text1);
    let b2 = document.createElement("b");
    let b2Text = document.createTextNode(nome);
    b2.appendChild(b2Text);
    p4.appendChild(b2);
    let p4Text2 = document.createTextNode(" a quantia de ");
    p4.appendChild(p4Text2);
    let b3 = document.createElement("b");
    let b3Text = document.createTextNode(valorExtenso);
    b3.appendChild(b3Text);
    p4.appendChild(b3);
    let p4Text3 = document.createTextNode(".");
    p4.appendChild(p4Text3);
    div4.appendChild(p4);

    //createSummaryDateSection()
    let p5 = document.createElement("p");
    let p5Text = document.createTextNode("Aluguel referente aos dias:");
    p5.appendChild(p5Text);
    div4.appendChild(p5);

    let p6 = document.createElement("b");
    let p6Text = document.createTextNode(
      datas[i][0] + " a " + datas[i][1] + "."
    );
    p6.appendChild(p6Text);
    div4.appendChild(p6);

    //createSummaryFootter()
    let p7 = document.createElement("p");
    let p7Text = document.createTextNode(
      "Brusque, ____/____/" + datas[i][0].slice(6, 10) + "."
    );
    p7.appendChild(p7Text);
    div4.append(p7);

    //createReceiptBody
    let div5 = document.createElement("div");
    div5.classList.add("secondPart");
    div1.appendChild(div5);

    let div6 = document.createElement("div");
    div6.classList.add("rightData");
    div5.appendChild(div6);

    //createBodyHeader();
    let div7 = document.createElement("div");
    div7.classList.add("receiptAndValue");
    div6.appendChild(div7);

    let p8 = document.createElement("p");
    p8.classList.add("receiptNumberRight");
    let p8Text = document.createTextNode("RECIBO N° " + (i + 1));
    p8.appendChild(p8Text);
    div7.appendChild(p8);

    let p9 = document.createElement("p");
    p9.classList.add("rightValue");
    let p9Text = document.createTextNode("VALOR: ");
    p9.appendChild(p9Text);
    let b4 = document.createElement("b");
    b4.classList.add("rightValueBold");
    let b4Text = document.createTextNode("R$ " + valor);
    b4.appendChild(b4Text);
    p9.appendChild(b4);
    div7.appendChild(p9);

    //createBodyMainSection() ou createBodyDescription() ou algo createReceiptMainSection()
    let p10 = document.createElement("p");
    let p10Text1 = document.createTextNode("Recebemos de ");
    p10.appendChild(p10Text1);
    let b5 = document.createElement("b");
    let b5Text = document.createTextNode(nome);
    b5.appendChild(b5Text);
    p10.appendChild(b5);
    let p10Text2 = document.createTextNode(" a quantia de ");
    p10.appendChild(p10Text2);
    let b6 = document.createElement("b");
    let b6Text = document.createTextNode(valorExtenso);
    b6.appendChild(b6Text);
    p10.appendChild(b6);
    let p10Text3 = document.createTextNode(", referente ao aluguel de ");
    p10.appendChild(p10Text3);
    let b7 = document.createElement("b");
    let b7Text = document.createTextNode("galpão nº " + numeroGalpao);
    b7.appendChild(b7Text);
    p10.appendChild(b7);
    let p10Text4 = document.createTextNode(
      " conforme contrato lavrado em cartório. Aluguel correspondente aos dias de "
    );
    p10.appendChild(p10Text4);
    let b8 = document.createElement("b");
    let b8Text = document.createTextNode(datas[i][0] + " a " + datas[i][1]);
    b8.appendChild(b8Text);
    p10.appendChild(b8);
    let p10Text5 = document.createTextNode(
      ", e para clareza firmamos o presente."
    );
    p10.appendChild(p10Text5);
    div6.appendChild(p10);

    //createBodyPlaceAndDateSection()
    let p11 = document.createElement("p");
    let p11Text = document.createTextNode(
      "Brusque, ______ de _______________________________ de " +
        datas[i][0].slice(6, 10) +
        "."
    );
    p11.appendChild(p11Text);
    div6.appendChild(p11);

    //createBodySigningSection()
    let p12 = document.createElement("p");
    let p12Text = document.createTextNode(
      "Assinatura do Locatário: __________________________________."
    );
    p12.appendChild(p12Text);
    div6.appendChild(p12);
  }
}

//não cheguei a ler a função abaixo como li a antiga, mas se vocÊ fizer as correções que indiquei acima, pode tentar aplicar na função abaixo. Me parece ter problemas similares.
function gerar_datas(dataInicial) {
  let ano = parseInt(dataInicial.slice(0, 5));
  let mes = parseInt(dataInicial.slice(5, 7));
  let dia = parseInt(dataInicial.slice(8, 10));

  let datas = [];

  /*
    Explicação que você pediu da função abaixo:

    - Me parece ser um hackzinho para descobrir quantos dias um mês tem ou qual o último do mês. Possivelmente poderia ter um nome mais descritivo
    - new Date é um construtor que cria um objeto do tipo date recebendo o ano, o mês e o dia. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
        - usar o dia como 0 leva o construtor a utilizar o último dia do mês anterior, conforme link acima:

            If any parameter overflows its defined bounds, it "carries over". For example, if a monthIndex greater than 11 is passed in, those months will cause the year to increment; if a minutes greater than 59 is passed in, hours will increment accordingly, etc. Therefore, new Date(1990, 12, 1) will return January 1st, 1991; new Date(2020, 5, 19, 25, 65) will return 2:05 A.M. June 20th, 2020.

            Similarly, if any parameter underflows, it "borrows" from the higher positions. For example, new Date(2020, 5, 0) will return May 31st, 2020.
        
        - método getDate retorna o dia do mês (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)

        - Lógica: o usuário informa um mês de 1 a 12. Os índices válidos vão de 0 a 11. Ao utilizar o dia como 0, o código garante que sempre será utilizado um índice de 0 a 11 para o mês
        e o objeto criado tem o último dia do mês (27, 28, 30 ou 31, a depender do mês/ano.)

  */
  let getDays = (ano, mes) => {
    return new Date(ano, mes, 0).getDate();
  };

  if (dia == 1) {
    console.log("PRIMEIRO");

    for (let i = 0; i < 12; i++) {
      let totalDays = getDays(ano, mes);

      let data1 = `01/${mes}/${ano}`;
      let data2 = `${totalDays}/${mes}/${ano}`;

      if (mes < 10) {
        data1 = `01/0${mes}/${ano}`;
        data2 = `${totalDays}/0${mes}/${ano}`;
      }

      datas.push([data1, data2]);

      mes = mes + 1;

      if (mes == 13) {
        mes = mes - 12;
        ano = ano + 1;
      }
    }
  } else {
    console.log("SEGUNDO");

    for (let i = 0; i < 12; i++) {
      if (mes == 13) {
        mes = mes - 12;
        ano = ano + 1;
      }

      let data1 = `${dia}/${mes}/${ano}`;
      let data2 = `${dia}/${mes + 1}/${ano}`;

      if (mes == 12) {
        data2 = `${dia}/0${mes - 11}/${ano + 1}`;
        if (data2.length == 9) {
          data2 = `0${dia}/0${mes - 11}/${ano + 1}`;
        }
      }

      if (data1.length == 8) {
        data1 = `0${dia}/0${mes}/${ano}`;
      }

      if (data2.length == 8) {
        data2 = `0${dia}/0${mes + 1}/${ano}`;
      }

      if (data1.length == 9) {
        if (dia < 10) {
          data1 = `0${dia}/${mes}/${ano}`;
        } else if (mes < 10) {
          data1 = `${dia}/0${mes}/${ano}`;
        }
      }

      if (data2.length == 9) {
        if (dia + 1 < 10) {
          data2 = `0${dia}/${mes + 1}/${ano}`;
        } else if (mes + 1 < 10) {
          data2 = `${dia}/0${mes + 1}/${ano}`;
        }
      }

      datas.push([data1, data2]);

      mes = mes + 1;
    }
  }
  console.log(datas);
  return datas;
}
