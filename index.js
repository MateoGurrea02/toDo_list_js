// El usuario debe poder agregar nuevas tareas a la lista.
// El usuario debe poder marcar las tareas como completadas.
// El usuario debe poder eliminar tareas de la lista.
// El usuario debe poder ver todas las tareas pendientes y las completadas.
// Usar HTML Y css para adaptarlo a la web.
// Pueden utilizar librerias por ejemplo bootstrap, etc.

let contenedor = document.getElementById('contenedor')
let task_list = []

let input_title = document.getElementById('title')
let description = document.getElementById('description')
let btn_create = document.getElementById('create')

btn_create.addEventListener('click',() => {
  if(input_title.value === '' || description.value === ''){
    alert('Por favor rellene los dos campos')
  }else{
    let task_list_storage = JSON.parse(localStorage.getItem('task'))
    let new_element = {
      id: task_list_storage != null ? task_list_storage.length : task_list.length,
      title: input_title.value,
      description: description.value,
      completada: false,
    }
    //si el localstorage no esta vacio entonces se guarda en el localstorage
    if (task_list_storage != null){
      task_list_storage.push(new_element)
      localStorage.setItem('task', JSON.stringify(task_list_storage))
      location.reload()
    }
    //si no guardo en una lista y subo al localstorage
    else{
      task_list.push(new_element)
      localStorage.setItem('task', JSON.stringify(task_list))
      location.reload()
    }
  }
})

// 
// console.log(btn_create)

const render_task = () => {
  // Si el local storage esta vacio entonces me muestra un cartel que dice que no hay tareas
  if (localStorage.getItem('task') === null) {
    console.log('No hay tareas')
    window.localStorage.setItem('task', JSON.stringify(task_list))
    location.reload();
  }
  // Pero si tiene algo me muestra las tareas
  else {
    let task_list = JSON.parse(localStorage.getItem('task'))
    task_list.map(task => {
      //Creando las cards de las tareas y renderizando------------------------------
      const card = document.createElement("div");
      card.className += "card m-5"
      card.style.width = '18rem'
      card.innerHTML = ` 
        <div class="card-body">
          <h4 class="card-title text-body-emphasis">${task.title}</h4>
          <p class="card-text text-secondary">${task.description}</p>
          <button type="button" id="complete${task.id}" class="btn ${task.completada ? 'btn-success' : 'btn-warning'}">${task.completada ? 'Completada' : 'Pendiente'}</button>
          <button type="button" class="btn btn-danger" id="${task.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
      contenedor.appendChild(card)

      //Seteando el boton de eliminar tareas----------------------------------------

      let btn_delete = document.getElementById(task.id)

      btn_delete.addEventListener('click',()=>{
        let new_list = task_list.filter(t=> t.id !== task.id)
        localStorage.setItem('task', JSON.stringify(new_list))
        location.reload();
      })

      //Seteando el boton para marcar tareas completadas o pendientes--------------------
      let btn_complete = document.getElementById(`complete${task.id}`)

      btn_complete.addEventListener('click',()=>{
        let new_list = task_list.map(
          t => t.id === task.id ? 
          {
            id: task.id,
            title: task.title,
            description: task.description,
            completada: t.completada ? false : true,
          }
          :
          {
            id: t.id,
            title: t.title,
            description: t.description,
            completada: t.completada,
          })
        localStorage.setItem('task', JSON.stringify(new_list))
        location.reload();
      })

    })
  }

}

render_task()
