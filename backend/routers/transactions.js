const { addExpense, getExpenses, updateExpense,deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, updateIncome,deleteIncome } = require('../controllers/income');
// const Validate = require('../controllers/validate');
const {UserSignUp,UserSignIn,validate } = require('../controllers/user');
const {isLoggedIn} = require('../controllers/middleware');
const router = require('express').Router();



router.post('/add-income', isLoggedIn, addIncome)
    .get('/get-incomes', isLoggedIn, getIncomes)
    .put('/update-income/:id', isLoggedIn, updateIncome)
    .delete('/delete-income/:id', isLoggedIn, deleteIncome)
    .post('/add-expense', isLoggedIn, addExpense)
    .get('/get-expenses', isLoggedIn, getExpenses) 
    // .get('/get-expenses', getExpenses)
    .put('/update-expense/:id', isLoggedIn, updateExpense)
    .delete('/delete-expense/:id', isLoggedIn, deleteExpense)
    .post('/sign-up', UserSignUp)
    .post('/sign-in', UserSignIn)
    .get('/validate',isLoggedIn,validate)
module.exports = router;