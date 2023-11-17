const _upgradeRecipe = require('../services/upgradeRecipe');
const _structure = require('../services/structure');
const _item = require('../services/item');

module.exports = {
    UpgradeRecipes,
    NewUpgradeRecipe,
    ViewUpgradeRecipe,

	CreateUpgradeRecipe,
	SaveUpgradeRecipe,
	AddIngredientToUpgradeRecipe,
}

//GET
function UpgradeRecipes(req, res)
{
    req.view = {};
    req.view.Title = "Building list";
    req.view.script = "list";
    Promise.all([
        _upgradeRecipe.GetAllUpgradeRecipes()
    ])
    .then(function(responses){
        
        req.view.UpgradeRecipes = responses[0];

        res.status(200).render('api/upgradeRecipes', {"view": req.view});
    })
}

//GET
function NewUpgradeRecipe(req, res)
{
    req.view = {};
    req.view.Title = "Add new upgrade recipe";
    req.view.script = "upgradeRecipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetAllStructures()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];

        res.status(200).render('api/addUpgradeRecipe', {"view": req.view});
    })
}

//GET
function ViewUpgradeRecipe(req,res)
{
    req.view = {};
    req.view.Title = "View upgrade recipe";
    req.view.script = "upgradeRecipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetAllStructures(),
        _upgradeRecipe.GetUpgradeRecipe(req.params.UpgradeRecipeId)
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];
        req.view.UpgradeRecipeComponents = responses[3];

        res.status(200).render('api/viewUpgradeRecipe', {"view": req.view});
    })
}

//POST
function CreateUpgradeRecipe(req, res) {

	if (req.body.StructureId == "" || req.body.StructureId == 0 || req.body.StructureId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.BuildTimeInMinutes == "") {
		res.status(400).send({ error: "Building time can't be empty" });
		return;
	}

	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_upgradeRecipe.CreateUpgradeRecipe(req.body.StructureId, req.body.Name, req.body.BuildTimeInMinutes)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveUpgradeRecipe(req, res) {

	if (req.body.StructureId == "" || req.body.StructureId == 0 || req.body.StructureId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.BuildTimeInMinutes == "") {
		res.status(400).send({ error: "Building time can't be empty" });
		return;
	}

	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_upgradeRecipe.SaveUpgradeRecipe(req.params.UpgradeRecipeId, req.body.StructureId, req.body.Name, req.body.BuildTimeInMinutes)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//POST
function AddIngredientToUpgradeRecipe(req, res) {

	if (req.params.UpgradeRecipeId == "" || req.params.UpgradeRecipeId == 0 || req.params.UpgradeRecipeId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.IngredientItemId == "" || req.body.IngredientItemId == 0 || req.body.IngredientItemId == "0") {
		res.status(400).send({ error: "Ingredient must be selected" });
		return;
	}
	if (req.body.IngredientAmount == "") {
		res.status(400).send({ error: "Ingredient amount can't be empty" });
		return;
	}

	_upgradeRecipe.AddIngredientToUpgradeRecipe(req.params.UpgradeRecipeId, req.body.IngredientItemId, req.body.IngredientAmount, req.body.OrderNo)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}