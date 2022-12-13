const Book = require("../models/Book")


const addBook = async (book,id) => {
    try {
        book.owner = id;
        return await Book.create({ ...book })
    } catch (error) {
        throw new Error(error)
    }
}

const getAllBooks = async () => {
    return await Book.find({})
}

const getOneBook = async (id) => {
    return await Book.findById(id).populate('owner')
}

const getProfileBooks = async (_id) => {
    const result = await Book.find({ owner: _id })
    console.log(result)
    return result
}
const editBook = async (id, data) => {
    try {
        return await Book.findByIdAndUpdate(id, {...data}, {runValidators: true})
    } catch (error) {
        return error
    }
}
const getThreeBooks = async () => {
    try{
        const books = await Book.find({}).limit(3)
        return books

    }catch (error) {
        console.error(error)
    }
}

async function addUserToItem(bookId, userId) {
    const existing = await Book.findById(bookId)
    existing.wishingList.push(userId)

    return existing.save()
}
const deleteBook = async (id) => {
    await Book.findByIdAndDelete(id)
}
module.exports = {
    getAllBooks,
    addBook,
    getOneBook,
    editBook,
    deleteBook,
    getThreeBooks,
    getProfileBooks,
    addUserToItem
}