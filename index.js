function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function atualizarContadorConcluidas() {
    const contadorConcluidas = document.getElementById('contadorConcluidas');
    const totalConcluidas = document.querySelectorAll('.concluido').length;
    contadorConcluidas.textContent = `${totalConcluidas} ${totalConcluidas=== 1 ? 'tarefa concluída' : 'tarefas concluídas'}`;
}

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const tarefaInput = document.getElementById('tarefa');
    const etiquetaInput = document.getElementById('etiqueta');
    const dataCriacaoInput = document.getElementById('dataCriacao');
    const listaTarefas = document.getElementById('tarefas');
    

    if (tarefaInput.value.trim() === '' || etiquetaInput.value.trim() === '') return;

    const dataCriacao = new Date().toISOString().split('T')[0];
    dataCriacaoInput.value = dataCriacao;

    const divTarefa = document.createElement('div');
    divTarefa.className = 'tarefaItem';

    const nomeTarefa = document.createElement('p');
    nomeTarefa.textContent = tarefaInput.value;
    nomeTarefa.className = 'nomeTarefa';

    const etiqueta = document.createElement('span');
    etiqueta.textContent = etiquetaInput.value;
    etiqueta.className = 'etiqueta';
    etiqueta.setAttribute('data-etiqueta', etiquetaInput.value.toLowerCase());
    
    const data = document.createElement('span');
    data.textContent = `Criado em ${formatarData(dataCriacao)}`;
    data.className = 'dataCriacao';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    infoContainer.appendChild(etiqueta);
    infoContainer.appendChild(data);

    const concluirButton = document.createElement('button');
    concluirButton.textContent = 'Concluir'; 
    concluirButton.className = 'concluirButton';


    concluirButton.addEventListener ('click', function () {
        divTarefa.classList.add('concluido'); 
        atualizarContadorConcluidas(); 

        const imgConcluido = document.createElement('img');
        imgConcluido.src = 'concluido.svg';
        imgConcluido.alt = 'Tarefa concluída';
        imgConcluido.className = 'imgConcluido';
        
        divTarefa.replaceChild(imgConcluido, concluirButton);

        const listaTarefas = document.getElementById('tarefas');
        listaTarefas.appendChild(divTarefa);
    });

    divTarefa.appendChild(nomeTarefa);
    divTarefa.appendChild(infoContainer); 
    divTarefa.appendChild(concluirButton);

    const primeiraConcluida = document.querySelector('.concluido');
    if (primeiraConcluida) {
        listaTarefas.insertBefore(divTarefa, primeiraConcluida);
    } else {
        listaTarefas.appendChild(divTarefa);
    }
    
    tarefaInput.value = '';
    etiquetaInput.value = '';
});

document.addEventListener('DOMContentLoaded', function () {
    atualizarContadorConcluidas();
});
