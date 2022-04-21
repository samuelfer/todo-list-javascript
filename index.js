const texto = document.querySelector('input');
const btnInsert = document.querySelector('.div-insert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

var items = [];

btnDeleteAll.onclick = () => {
    items = [];
    updateItems();
}

texto.addEventListener('keypress', e => {
    if (e.key == 'Enter' && this.validaCampoIsPreenchido()) {
        setItems();
    }
})

btnInsert.onclick = () => {
   if (this.validaCampoIsPreenchido()) {
     setItems();
   }
}

function setItems() {
    if (items.length > 20) {
        alert('Limite de 20 itens atingido');
    }

    if (!this.valideIsElementExistsInList(texto.value)) {
        items.push({ 'item': texto.value, 'status': '' });
        updateItems();
    } else {
        alert(`A tarefa ${texto.value} já existe na lista`)
        return;
    }
}

function updateItems() {
    localStorage.setItem('todolist', JSON.stringify(items));
    loadItems();
}

function loadItems() {
    ul.innerHTML = '';
    items = JSON.parse(localStorage.getItem('todolist')) ?? [];

    items.forEach((item, i) => {
        insertItemList(item.item, item.status, i)    
    });
}

function insertItemList(text, status, i) {
    const li = document.createElement('li');

    li.innerHTML = `
    <div class="todo-list">
        <input type="checkbox" ${status} data-i=${i} 
            onchange="done(this, ${i})" >
        <span data-si=${i}>${text}</span>
        <button onclick="removeItem(${i})" data-i=${i}>
            <i class="bx bxs-trash-alt"></i>
        </button>
    </div>`;

    ul.appendChild(li);

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through');
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through');
    }

    texto.value = '';
}

function done(chk, i) {
    if (chk.checked) {
        items[i].status = 'checked';
    } else {
        items[i].status = '';
    }

    updateItems();
}

function removeItem(i) {
    items.splice(i, 1);
    updateItems();
}

function validaCampoIsPreenchido() {
    if (texto.value === '') {
      alert('Preencha o campo');
      return;
    } else {
        return true;
    }
}

function valideIsElementExistsInList(item) {
    const itemSearch = JSON.stringify({'item': item, 'status': ''});
    return items.some(itemList => JSON.stringify(itemList) == itemSearch);
}