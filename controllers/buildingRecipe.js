const _buildingRecipe = require('../services/buildingRecipe');
const _structure = require('../services/structure');
const _item = require('../services/item');

module.exports = {
    BuildingRecipes,
    NewBuildingRecipe,
    ViewBuildingRecipe,

	CreateBuildingRecipe,
	SaveBuildingRecipe,
	AddIngredientToBuildingRecipe,
}

//GET
function BuildingRecipes(req, res)
{
    req.view = {};
    req.view.Title = "Building list";
    req.view.script = "list";
    Promise.all([
        _buildingRecipe.GetAllBuildingRecipes()
    ])
    .then(function(responses){
        
        req.view.BuildingRecipes = responses[0];

        res.status(200).render('api/buildingRecipes', {"view": req.view});
    })
}

//GET
function NewBuildingRecipe(req, res)
{
    req.view = {};
    req.view.Title = "Add new building recipe";
    req.view.script = "buildingRecipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetAllStructures()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];

        res.status(200).render('api/addBuildingRecipe', {"view": req.view});
    })
}

//GET
function ViewBuildingRecipe(req,res)
{
    req.view = {};
    req.view.Title = "View building recipe";
    req.view.script = "buildingRecipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetAllStructures(),
        _buildingRecipe.GetBuildingRecipe(req.params.BuildingRecipeId)
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];
        req.view.BuildingRecipeComponents = responses[3];

        res.status(200).render('api/viewBuildingRecipe', {"view": req.view});
    })
}

//POST
function CreateBuildingRecipe(req, res) {

	if (req.body.BuiltStructureId == "" || req.body.BuiltStructureId == 0 || req.body.BuiltStructureId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.BuildTimeInMinutes == "") {
		res.status(400).send({ error: "Building time can't be empty" });
		return;
	}

	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_buildingRecipe.CreateBuildingRecipe(req.body.BuiltStructureId, req.body.BuildTimeInMinutes, req.body.RequiredToolOneId, req.body.RequiredToolTwoId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveBuildingRecipe(req, res) {

	if (req.body.BuiltStructureId == "" || req.body.BuiltStructureId == 0 || req.body.BuiltStructureId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.BuildTimeInMinutes == "") {
		res.status(400).send({ error: "Building time can't be empty" });
		return;
	}

	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_buildingRecipe.SaveBuildingRecipe(req.params.BuildingRecipeId, req.body.BuiltStructureId, req.body.BuildTimeInMinutes, req.body.RequiredToolOneId, req.body.RequiredToolTwoId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//POST
function AddIngredientToBuildingRecipe(req, res) {

	if (req.params.BuildingRecipeId == "" || req.params.BuildingRecipeId == 0 || req.params.BuildingRecipeId == "0") {
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

	_buildingRecipe.AddIngredientToBuildingRecipe(req.params.BuildingRecipeId, req.body.IngredientItemId, req.body.IngredientAmount, req.body.OrderNo)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}