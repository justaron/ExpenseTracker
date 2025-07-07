const Expense = require('../models/Expense');

// Harcama ekleme
exports.addExpense = async (req, res) => {
	try {
		const { title, amount, category, date } = req.body;
		const expense = new Expense({
			title,
			amount,
			category,
			date,
			user: req.user.id // DİKKAT! Artık req.user.id var!
		});
		await expense.save();
		res.status(201).json({ message: 'Expense added successfully', expense });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};
exports.getExpenses = async (req,res)=> {
	try
	{
		const expenses = await Expense.find({user: req.user.id}).sort({date: -1});
		res.status(200).json(expenses);
	}
	catch(error)
	{
		console.error(error);
		res.status(500).json({message:'Server Error'});
	}
};