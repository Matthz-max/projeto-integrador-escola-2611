const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sModelo = document.querySelector("#m-modelo");
const sAno = document.querySelector("#m-ano");
const sPreco = document.querySelector("#m-preco");
const sCor = document.querySelector("#m-cor");
const sPlaca = document.querySelector("#m-placa");
const btnSalvar = document.querySelector("#btnSalvar");
const modalConfirm = document.querySelector("#modalConfirm");
const btnConfirmDelete = document.querySelector("#btnConfirmDelete");
const btnCancelDelete = document.querySelector("#btnCancelDelete");

let itens = [];
let modelo;
 

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sModelo.value = itens[index].modelo;
    sAno.value = itens[index].ano;
    sPreco.value = itens[index].preco;
    sCor.value = itens[index].cor;
    sPlaca.value = itens[index].placa;
   
  } else {
    sModelo.value = "";
    sAno.value = "";
    sPreco.value = "";
    sCor.value = "";
    sPlaca.value = "";
 
  }
}

function editItem(index) {
  openModal(true, index);
}

function showConfirmDeleteModal(index) {
  itemToDelete = index;
  modalConfirm.classList.add("active");
}

btnConfirmDelete.onclick = () => {
  if (itemToDelete !== null) {
    deleteItem(itemToDelete);
    itemToDelete = null;
  }
  modalConfirm.classList.remove("active");
};

btnCancelDelete.onclick = () => {
  itemToDelete = null;
  modalConfirm.classList.remove("active");
};

btnSalvar.onclick = (e) => {
  e.preventDefault();
  if (sModelo.value === "" || sAno.value === "" || sPreco.value === "" || sCor.value === "" || sPlaca.value === "") {
    return;
  }

  const carImage = document.getElementById('m-img').files[0];

  if (!carImage) {
    alert("Por favor, carregue uma imagem.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const carImageData = e.target.result;

    const novoCarro = {
      modelo: sModelo.value,
      ano: sAno.value,
      preco: sPreco.value,
      cor: sCor.value,
      placa: sPlaca.value,
      imagem: carImageData
    };

  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td><img src="${item.imagem}" alt="Imagem do Carro" style="max-width: 100px; max-height: 100px;" /></td>
    <td>${item.modelo}</td>
    <td>${item.ano}</td>
    <td>${item.preco}</td>
    <td>${item.cor}</td>
    <td>${item.placa}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="showConfirmDeleteModal(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
  
  
}

//CONECTANDO O FRONT COM O BACK
//CONECTANDO O FRONT COM O BACK
//CONECTANDO O FRONT COM O BACK
//CONECTANDO O FRONT COM O BACK
//CONECTANDO O FRONT COM O BACK
//CONECTANDO O FRONT COM O BACK

//aqui é o GET

    
fetch('http://localhost:8080/carro/listarCarro', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ modelo: '', ano: '', preco: '', cor: '', placa: '',})
})
    .then(response => response.json())
    .then(data => {
        console.log(data);   
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
	
	
	//aqui é o POST
	
	fetch('http://localhost:8080/carro/criarCarro', {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({  modelo: '', ano: '', preco: '', cor: '',placa: '', })
	})
	    .then(response => response.json())
	    .then(data => {
	        console.log(data); 
	    })
	    .catch(error => {
	        console.error('Erro ao enviar os dados:', error);
	    });
		
		fetch('http://localhost:8080/carro/atualizarCarro{id}', {
			    method: 'PUT',
			    headers: {
			        'Content-Type': 'application/json',
			    },
			    body: JSON.stringify({modelo: '', ano: '',preco: '',cor: '',placa: '',})
			})
			    .then(response => response.json())
			    .then(data => {
			        console.log(data);   
			    })
			    .catch(error => {
			        console.error('Erro ao enviar os dados:', error);
			    });
				
				fetch('http://localhost:8080/carro/deletarCarro{id}', {
							    method: 'DELETE',
							    headers: {
							        'Content-Type': 'application/json',
							    },
							    body: JSON.stringify({modelo: '', ano: '',preco: '',cor: '',placa: '', })
							})
							    .then(response => response.json())
							    .then(data => {
							        console.log(data);  
							    })
							    .catch(error => {
							        console.error('Erro ao enviar os dados:', error);
							    });


                      loadItens();
                }
