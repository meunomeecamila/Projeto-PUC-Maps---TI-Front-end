/*Cria um card com a class card-rest filho de main e mae de um elemento<a> com classe nome */
const main = document.querySelector('main');
async function restaurantes(restaurante){
    const card = document.createElement('div');
    const rest = document.createElement('a');

    card.classList.add('card-rest');
    rest.classList.add('nome');

    card.append(rest);

    rest.textContent = restaurante.nome;
    rest.href = `cardapios.html?id=${restaurante.id}`;

    main.appendChild(card);
}


/*guarda todos os restaurantes de restaurantes.json e passa por cada um fazendo um card*/
async function load() {
    
    const aux = await fetch('../restaurantes.json');
    
    const restaurante = await aux.json();
    
    for (let i = 0; i < restaurante.length; i++) {
        console.log('muahahahahaha');
        await restaurantes(restaurante[i]);
    }
}
load();