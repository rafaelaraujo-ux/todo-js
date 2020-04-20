// Referencias en el HTML

import {Todo} from '../classes';
import {todoList} from '../index';

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//EVENTOS

// keyup -> cuando el usuario suelta la tecla
// event -> indica que tecla presionó el usuario
// keyCode -> devuelve el codigo de caracteres Unicode de la tecla
// value -> recoge lo que el usuario escribió
txtInput.addEventListener('keyup', (event) => {  
    if (event.keyCode === 13 && txtInput.value.length > 0){
        const newTodo = new Todo(txtInput.value);
        //todos los objetos(todoList) pasan por referencia(nuevoTodo).
        //Añade(nuevoTodo) al arreglo(todoList) el nuevo valor(newTodo).
        todoList.nuevoTodo(newTodo);

        //Se coloca el valor(newTodo) en el HTML(crearTodoHtml)
        crearTodoHtml(newTodo);
        //Una vez hecho el proceso se deja el valor de txtInput vacío.
        txtInput.value = '';
    }
});

//getAttribute -> recoge el valor del atributo
//toggle -> añade o cambia la clase css. 
divTodoList.addEventListener('click', (event) => {

    //Guarda sobre que elemento(input, button, label) el usuario hace click
    const nombreElemento = event.target.localName;
    //Guarda todo aquello que queramos manipular
    const todoElemento   = event.target.parentElement.parentElement;
    //Guarda el nombre del atributo(id)
    const todoId = todoElemento.getAttribute('data-id');


    if(nombreElemento.includes('input')){ //Click en el check
        todoList.marcarCompletado(todoId); //Marca completado como true al id
        todoElemento.classList.toggle('completed'); //Agragamos o cambiamos al bloque html la clase completed
    }else if(nombreElemento.includes('button')){ //Click en el button
        todoList.eliminarTodo(todoId); // borra el todo
        divTodoList.removeChild(todoElemento); //elimina un elemento html
    }

})


// .contains -> contiene
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i--){

        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains('completed')){ 
            
            divTodoList.removeChild(elemento);
        }
    }
})


ulFiltros.addEventListener('click', (event) => {

    //console.log(event.target.text); // Todos Pendientes Completados undefined
    const filtro = event.target.text;

    if(!filtro){
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){

        //Cada vez que se hace click en uno de los elementos se limpia la clase hidden para evitar que se hereden de un elemento a otro
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;

            //Los demás casos no son necesarios ya que no hacen nada y como comportamiento por defecto es que remueva la clase 'hidden' de todos los elementos.
        }
    }
})