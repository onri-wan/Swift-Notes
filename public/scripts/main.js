const deleteBtn = document.querySelectorAll('.fa-trash')
const itemNotDone = document.querySelectorAll('.item .not-done')
const itemDone = document.querySelectorAll('.item .done')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteTodo)
})

Array.from(itemNotDone).forEach((element) => {
    element.addEventListener('click', markComplete)
})

Array.from(itemDone).forEach((element) => {
    element.addEventListener('click', markIncomplete)
})

async function deleteTodo() {
    const todoId = this.parentElement.dataset.id
    try {
        const response = await fetch('todos/deleteTodo', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromMainJS': todoId
            })
        })
        const data = await response.json()
        location.reload()
    } catch (error) { console.error(error) }
}

async function markComplete() {
    const todoId = this.parentElement.dataset.id
    try {
        const response = await fetch('todos/markComplete', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromMainJS': todoId
            })
        })
        const data = await response.json()
        location.reload()
    } catch (error) { console.error(error) }
}

async function markIncomplete() {
    const todoId = this.parentElement.dataset.id
    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromMainJS': todoId
            })
        })
        const data = await response.json()
        location.reload()
    } catch (error) { console.error(error) }
}