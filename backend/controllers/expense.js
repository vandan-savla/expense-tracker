const ExpenseSchema = require('../models/ExpenseModel');


exports.addExpense = async  (req, res) => {

    const expense = new ExpenseSchema({
        title: req.body.title,
        amount: req.body.amount,
    
        date: req.body.date,
        category: req.body.category,
        description: req.body.description
    });

try{

    if(!expense.title ||!expense.amount ||!expense.date ||!expense.category){
        res.status(400).json({message: 'Please enter all the fields'});
    }
    if(expense.amount <= 0 || !expense.amount === 'number'){
        res.status(400).json({message: 'Amount must be a postive number'});
    }
    await expense.save();
    res.status(200).json({message: 'Expense added successfully'});
}
catch(error){
    res.status(500).json({message: 'Internal Server Error'})
}
    console.log(expense);
};

exports.getExpenses = async  (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt:-1});
        res.status(200).json(expenses)
    }

    catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
};

exports.deleteExpense = async  (req, res) => {
 const id=req.params.id

    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({message: 'Expense deleted successfully'});
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
};