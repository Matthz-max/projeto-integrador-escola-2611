$(document).ready(function() {
  // Exibir o modal ao clicar no botão "Adicionar"
  $('#new').on('click', function() {
    $('#modal-container').show();
  });

  // Fechar o modal quando o usuário clicar fora da área do modal
  $('#modal-container').on('click', function(event) {
    if ($(event.target).is('#modal-container')) {
      $('#modal-container').hide();
    }
  });

  // Adicionar carro à tabela quando o formulário for submetido
  $('#carForm').on('submit', function(e) {
    e.preventDefault(); // Impedir o envio padrão do formulário

    // Captura os dados do formulário
    var nome = $('#m-modelo').val();
    var ano = $('#m-ano').val();
    var preco = $('#m-preco').val();
    var cor = $('#m-cor').val();
    var placa = $('#m-placa').val();
    var imagem = $('#m-img')[0].files[0]; // Imagem do carro (file)

    // Criar um objeto FormData para enviar a imagem e os outros dados
    var formData = new FormData();
    formData.append('imagem', imagem);
    formData.append('modelo', nome);
    formData.append('ano', ano);
    formData.append('preco', preco);
    formData.append('cor', cor);
    formData.append('placa', placa);

    // Exemplo de requisição AJAX para salvar os dados no servidor
    $.ajax({
      url: 'http://localhost:8080/carro/criarCarro', // URL do servidor
      type: 'POST',
      data: formData,
      processData: false, // Não processar os dados (como string)
      contentType: false, // Não definir o tipo de conteúdo
      success: function(response) {
        // Sucesso: adicionar o carro à tabela
        adicionarCarroTabela(nome, ano, preco, cor, placa);
        $('#modal-container').hide(); // Fechar o modal
        $('#carForm')[0].reset(); // Limpar o formulário
      },
      error: function(xhr, status, error) {
        console.error('Erro ao adicionar carro:', error);
        alert('Erro ao salvar o carro');
      }
    });
  });

  // Função para adicionar o carro à tabela
  function adicionarCarroTabela(nome, ano, preco, cor, placa) {
    var tableRow = `
      <tr>
        <td><img src="default-image.jpg" alt="Imagem Carro" width="50"></td>
        <td>${nome}</td>
        <td>${ano}</td>
        <td>${preco}</td>
        <td>${cor}</td>
        <td>${placa}</td>
        <td class="acao">
          <button class="editBtn">Editar</button>
        </td>
        <td class="acao">
          <button class="deleteBtn">Excluir</button>
        </td>
      </tr>
    `;

    // Adicionar a nova linha ao corpo da tabela
    $('#carTableBody').append(tableRow);
  }

  // Função para excluir o carro da tabela
  $(document).on('click', '.deleteBtn', function() {
    $(this).closest('tr').remove(); // Remove a linha correspondente
  });

  // Função para editar o carro (apenas exemplo, não implementado completamente)
  $(document).on('click', '.editBtn', function() {
    // Editar funcionalidade pode ser implementada aqui
    alert('Função de editar não implementada');
  });
});
