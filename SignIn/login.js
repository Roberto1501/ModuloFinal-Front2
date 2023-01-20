
//Função para acessar a aplicação com o email e senha cadastrados
function acessar(){
    let email = document.querySelector('#email');

    let senha = document.querySelector('#password');

    let listaUser = [];

    let userValid = {
        email: '',
        senha: ''
    };
    
    listaUser = JSON.parse(localStorage.getItem('listaUser'));
    // console.log(listaUser);
    // console.log(email.value);


    listaUser.forEach((item) => {
        if(email.value === item.emailUser && senha.value === item.senhaUser){
            userValid = {
                nome: item.nomeUser,
                email: item.emailUser,
                senha: item.senhaUser
            };
        }
    });

    if(email.value === userValid.email && senha.value === userValid.senha){
        window.location.href='../Dashboard/dashboard.html';

        let token = Math.random().toString(14).substring(2) + Math.random().toString(14).substring(2);
        localStorage.setItem('token', token);

        localStorage.setItem('userLogado', JSON.stringify(userValid)); 
        
    }else{
        alert('Email e senha incorretos');
    }
    
    
    
}
 

    



