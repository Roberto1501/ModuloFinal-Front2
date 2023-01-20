//pegando elemento do botao pelo ID
let btn = document.getElementById('btn-sub');

//Criando um evento de click para salvar o que o usuario escreveu no input, salvando no localStorage e imprimindo na tabela os valores do input
btn.addEventListener('click', () => {

    let descricao = document.querySelector('#descricao');
    let detalhamento = document.querySelector('#detalhamento');
    
    
    
    let data = JSON.parse(localStorage.getItem('data') || '[]');
    
    data.push({
        id: Date.now(),
        descricao: descricao.value,
        detalhamento: detalhamento.value
    })
    
    localStorage.setItem('data', JSON.stringify(data));

    // console.log(data);
    
    let mostrar = document.getElementById('mostrarLinha');
    mostrar.innerHTML = '';
    
    let getData = JSON.parse(localStorage.getItem('data'));
    
    
    
        
        getData.forEach((valor, index, array) => {
               mostrar.innerHTML += `
               <tr>
                   <td data-label="#" id="count">${index + 1}</td>
                   <td data-label="Descricao" id="description">${valor.descricao}</td>
                   <td data-label="Detalhamento" id="detalhes" >${valor.detalhamento}</td>
                   <td data-label="Acao" >
                   <button type="submit" id="btn-apagar" onclick=removeItem(${valor.id})>Apagar</button>
                   <button type="submit" id="btn-edit" onclick=editarItem(${valor.id}) >Editar</button>
                   </td>
               </tr> 
               `
               
           }); 
           localStorage.setItem('data', JSON.stringify(data));

    
    document.getElementById('descricao').value = "";
    document.getElementById('detalhamento').value = "";  
    
})


//Função para editar o item na tabela e atualiazr no localStorage o item editado
function editarItem(id){
    let data = JSON.parse(localStorage.getItem('data'));

    data = data.map(item => {
        if(item.id === id){
            item.descricao = descricao.value;
            item.detalhamento = detalhamento.value;
        }
        return item;
    })
    localStorage.setItem('data', JSON.stringify(data));
    descricao.value = '';
    detalhamento.value = '';
    atualizarTabela();
    mostrarLinha();

}



//Funçao para remover o item da tabela ao clicar nele
function removeItem(id){
    let data = JSON.parse(localStorage.getItem('data'));
    data = data.filter(item => item.id !== id);
    localStorage.setItem('data', JSON.stringify(data));
    // location.reload();
    
    atualizarTabela();

}


//Funçao para atualizar a tabela depois que um item da tabela tenha sido removido
function atualizarTabela(){

    let mostrar = document.getElementById('mostrarLinha');
    mostrar.innerHTML = '';
    
    let getData = JSON.parse(localStorage.getItem('data'));


    getData.forEach((valor, index, array) => {
        mostrar.innerHTML += `
        <tr>
            <td data-label="#" id="count">${index + 1}</td>
            <td data-label="Descricao" id="description">${valor.descricao}</td>
            <td data-label="Detalhamento" id="detalhes" >${valor.detalhamento}</td>
            <td data-label="Acao" >
            <button type="submit" id="btn-apagar" onclick=removeItem(${valor.id})>Apagar</button>
            <button type="submit" id="btn-edit" onclick=editarItem(${valor.id}) >Editar</button>
            </td>
        </tr> 
        `
        
    }); 
    localStorage.setItem('data', JSON.stringify(data));
}




//Pegando o usuario logado no sistema e imprimindo no cabeçalho o nome que ele cadastrou
let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('#h1');

logado.innerHTML = `Lista de recados: ${userLogado.nome}`;

//Buscando no localstorage o token do usuario logado
if(localStorage.getItem('token') === null){
    alert('Você precisar estar logado para acessar essa página');
    window.location.href='../SignIn/login.html';
}
if(userLogado.email == '' || userLogado.senha == '') {
    alert("Você precisar estar logado para acessar essa página")
    window.location.href = '../SignIn/login.html';

}


//Função para sair da aplicação e removendo o token e o usuariologado do localStorage
function sair(){
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href='../SignIn/login.html';
}
