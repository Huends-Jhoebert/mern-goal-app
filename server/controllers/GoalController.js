const asyncHandler = require("express-async-handler");
const Goal = require("../model/GoalModel");

//Description  GET GOALS
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
   const goals = await Goal.find();
   res.status(200).json(goals);
});

//Description  Set GOALS
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
   if (!req.body.text) {
      res.status(400);
      throw new Error("Please add a text field");
   }

   const goal = await Goal.create({
      text: req.body.text,
   });

   res.status(200).send(goal);
});
//Description  GET GOALS
//@route Put /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
   const goal = await Goal.findById(req.params.id);

   if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
   }

   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });

   res.status(200).send(updatedGoal);
});

//Description  Delete GOALS
//@route Delete /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
   const goal = await Goal.findById(req.params.id);

   if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
   }

   await goal.remove();

   res.status(200).send({
      id: req.params.id,
   });
});

module.exports = {
   getGoals,
   setGoal,
   updateGoal,
   deleteGoal,
};
