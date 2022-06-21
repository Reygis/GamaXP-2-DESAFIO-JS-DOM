const empresa = "Sistema Omma";
console.log(`Seja bem vindo ao ${empresa}`);

// ----- alterado essa variavel de const para var pois da erro na função deletarReceita() 
var listaDeReceitas = [{
  id: 1,
  titulo: "Cachorro Quente",
  dificuldade: "simples",
  ingredientes: ["1 pao de leite", "1 Salsicha", "Maionese"],
  preparo: "jodbvnujd osbvcujsbn jsbfusb",
  link: "http://youtube.com",
  vegano: 'não',
}, ];

// -------- comentei esta parte pois não faz nada no código
// const cadastrarReceita = (
//   id,
//   titulo,
//   dificuldade,
//   ingredientes,
//   preparo,
//   link,
//   vegano
// ) => {
//   const novaReceita = {
//     id,
//     titulo,
//     dificuldade,
//     ingredientes,
//     preparo,
//     link,
//     vegano,
//   };
//   listaDeReceitas.push(novaReceita);

//   console.log(`Cadastro da receita ${titulo} feito com sucesso!`);
// };

const btnEnviar = document.querySelector('#btnEnviar');

btnEnviar.onclick = (evento) => {
  // impede que a pagina seja recarregada / previne comportamento padrão
  evento.preventDefault();

  // alert('formulario enviado!');

  // selecionando campos do formulário
  let inputTitulo = document.querySelector('#titulo');
  let inputDificuldade = document.querySelector('#dificuldade');
  let inputIngredientes = document.querySelector('#ingredientes');
  let inputPreparo = document.querySelector('#preparo');
  let inputLink = document.querySelector('#link');
  let inputVegano = document.querySelector('input[name="vegano"]:checked');

  let novaReceita = {
    id: listaDeReceitas.length+1,
    titulo: inputTitulo.value,
    dificuldade: inputDificuldade.value,
    ingredientes: inputIngredientes.value.split(','),
    preparo: inputPreparo.value,
    link: inputLink.value,
    vegano: inputVegano.value ? inputVegano.value : 'não'
  }

  console.log(novaReceita);
  listaDeReceitas.push(novaReceita);

  exibirReceitas();
}

function exibirReceitas() {
  /// corrigindo ids errados apos deletar na receita
  let i=0;
  listaDeReceitas.forEach(receita => {i ++;receita.id = i;});

  let htmlReceitas = '';

  for (let index = 0; index < listaDeReceitas.length; index++) {
    htmlReceitas += `<article class="card">
          <h2>${listaDeReceitas[index].id}</h2>
          <h2>${listaDeReceitas[index].titulo}</h2>
          <small>Dificuldade: ${listaDeReceitas[index].dificuldade}</small>
          <p>${listaDeReceitas[index].ingredientes}</p>
          <p> ${listaDeReceitas[index].preparo}</p>
          <a href="${listaDeReceitas[index].link}"> ${listaDeReceitas[index].link}</a>
          <p>É vegano? <strong>${listaDeReceitas[index].vegano}</strong></p>
          <button id="btnDeletar" onclick=deletarReceita(${listaDeReceitas[index].id})>Deletar</button>
          
      </article>`;
  }

  let painelReceitas = document.querySelector('.painel-receitas');

  painelReceitas.innerHTML = htmlReceitas;

}

exibirReceitas();
// ------- comentado pois função não é usada pra nada
// function deletarReceita(id) {
//   let novaListaDeReceitas = [];

//   for (let index = 0; index < listaDeReceitas.length; index++) {
//     const receita = listaDeReceitas[index];

//     if (receita.id != id) {
//       novaListaDeReceitas.push(receita);
//     }
//   }

//   if (novaListaDeReceitas.length == listaDeReceitas.length) {
//     return console.log("Não encontrei o id");
//   }

//   listaDeReceitas = novaListaDeReceitas;
//   console.log("receita deletada com sucesso!");
// }

function deletarReceita(id) {
  const novaListaDeReceitas = listaDeReceitas.filter(
    (receita) => receita.id != id
  );

  if (novaListaDeReceitas.length == listaDeReceitas.length) {
    return console.log("Não encontrei o id");
  }

  listaDeReceitas = novaListaDeReceitas;
  console.log("receita deletada com sucesso!");

  // para o funcionamento do delete como está nesta função foi necessário alterar a listaDeReceitas de const para var e adicionar a função exibir Receitas ao final desta função
  // porem persiste o bug com os ids das receitas(seus numeros ñ são atualizados), necessário refatorar
  exibirReceitas();
}


const condicaoDeReceita = (receita) => (receita.vegano = true);


const atualizaReceita = (id, receitaAtualizada) => {
  let foiAtualizado = false;

  listaDeReceitas.forEach((receita) => {
    if (receita.id != id) {
      return;
    }

    if (receitaAtualizada.titulo) {
      receita.titulo = receitaAtualizada.titulo;
    }

    if (receitaAtualizada.ingredientes) {
      receita.ingredientes = receitaAtualizada.ingredientes;
    }

    foiAtualizado = true;
  });

  console.log(
    foiAtualizado ?
    "Receita atualizada com sucesso!" :
    "Não foi encontrado o id"
  );
};


const buscarReceita = (termoBuscado) => {

  const resultados = listaDeReceitas.filter(
    (receita) =>
    receita.titulo.toLowerCase().indexOf(termoBuscado.toLowerCase()) != -1
  );

  // if (resultados.length) {
  //   console.log(resultados);
  // } else {
  //   console.log("Não foi encontrado receitas");
  // }

  if (!resultados.length) {
    console.log("Não foi encontrado receitas");
  }

  return console.log(resultados);
};