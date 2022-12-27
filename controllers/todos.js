const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('todos.pug', {todos: todoItems, todosLeft: itemsLeft})
        } catch (error) { console.error(err) }
    },
    addTodo: async (req, res) => {
        try {
            await Todo.create({todo: req.body.todoItem, completed: false})
             res.redirect('/todos')
        } catch (error) { console.error(err) }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromMainJS}, {completed: true})
            res.json('Marked Complete')
        } catch (error) { console.error(err) }
    },
    markIncomplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromMainJS}, {completed: false})
            res.json('Marked Incomplete')
        } catch (error) { console.error(err) }
    },
    deleteTodo: async (req, res) => {
        try {
            await Todo.findOneAndDelete({_id:req.body.todoIdFromMainJS})
            res.json('Deleted Todo')
        } catch (error) { console.error(err) }
    }
}