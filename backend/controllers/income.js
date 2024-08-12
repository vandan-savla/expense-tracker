const IncomeSchema = require('../models/IncomeModel');


exports.addIncome = async (req, res) => {


    const income = new IncomeSchema({
        username: req.user.username,
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description
    });

    try {
        console.log("inside add income " + JSON.stringify(req.user));
        if (!income.title || !income.amount || !income.date || !income.category) {
            res.status(400).json({ message: 'Please enter all the fields' });
        }
        if (income.amount <= 0 || !income.amount === 'Number') {
            res.status(400).json({ message: 'Amount must be a postive number' });
        }
        await income.save();
        res.status(200).json({ message: 'income added successfully' });
    }
    catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({ message: 'Internal Server Error' })
    }
    console.log(income);
};

exports.getIncomes = async (req, res) => {
    try {

        username = req.user.username;
        // console.log(username)
        const incomes = await IncomeSchema.find({ username: username }).sort({ createdAt: -1 });
        res.status(200).json(incomes)
    }

    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

exports.updateIncome = async (req, res) => {
    const id = req.params.id
    const username = req.user.username;
    try {
        console.log(req.params, username);

        getUser = await IncomeSchema.findOne({ _id: id });

        if (getUser.username !== username) {
            res.status(400).json({ message: 'Unauthorized to perform action!!!' });
        } else {

            const income = await IncomeSchema.findOneAndUpdate({ "_id": id, "username": username }, req.body);
            // const income = await IncomeSchema.findByIdAndUpdate(id, req.body);
            res.status(200).json(income)
        }
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
exports.deleteIncome = async (req, res) => {
    const id = req.params.id
    const username = req.user.username;
    try {
        getUser = await IncomeSchema.findOne({ _id: id });
        if (getUser.username !== username) {
            res.status(400).json({ message: 'Unauthorized to perform action!!!' });
        } else {
            await IncomeSchema.findOneAndDelete({ "_id": id, "username": username });
            res.status(200).json({ message: 'Income deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};