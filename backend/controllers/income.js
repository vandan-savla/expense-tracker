const IncomeSchema = require('../models/IncomeModel');

// const router = require('express').Router();



exports.addIncome = async  (req, res) => {

    const income = new IncomeSchema({
        title: req.body.title,
        amount: req.body.amount,

        date: req.body.date,
        category: req.body.category,
        description: req.body.description
    });

try{

    if(!income.title || !income.amount || !income.date || !income.category){
        res.status(400).json({message: 'Please enter all the fields'});
    }
    if(income.amount <= 0 || !income.amount === 'Number'){
        res.status(400).json({message: 'Amount must be a postive number'});
    }
    await income.save();
    res.status(200).json({message: 'income added successfully'});
}
catch(error){
    res.status(500).json({message: 'Internal Server Error'})
}
    console.log(income);
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes)
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

exports.deleteIncome = async (req, res) => {
    const id = req.params.id

    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'income deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};