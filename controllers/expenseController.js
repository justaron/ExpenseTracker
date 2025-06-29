const Expense = require('../models/Expense');

exports.addExpense = async (req, res) =>{
    try{
        const{ title, amount, category, date } = req.body;
        const expense = new Expense({
            title,
            amount,
            category,
            date,
            user: req.user.id
        });
   		await expense.save();
		res.status(201).json({ message: 'Expense added successfully', expense });

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};