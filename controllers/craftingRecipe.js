const _craftingRecipe = require('../services/craftingRecipe');
const _structure = require('../services/structure');
const _item = require('../services/item');

module.exports = {
    CraftingRecipes, //Recipes
    NewCraftingRecipe,  //NewRecipe
    ViewCraftingRecipe, //ViewRecipe

	CreateCraftingRecipe,
	SaveCraftingRecipe,
	AddIngredientToCraftingRecipe, //AddIngredientToRecipe
}

//GET
function CraftingRecipes(req, res)
{
    req.view = {};
    req.view.Title = "Recipe list";
    req.view.script = "list";
    Promise.all([
        _craftingRecipe.GetAllCraftingRecipes()
    ])
    .then(function(responses){
        
        req.view.Recipes = responses[0];

        res.status(200).render('api/recipes', {"view": req.view});
    })
}

//GET
function NewCraftingRecipe(req, res)
{
    req.view = {};
    req.view.Title = "Add new recipe";
    req.view.script = "recipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetCraftingStations(),
        _craftingRecipe.GetAllCraftingCategories()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];
        req.view.CraftingCategories = responses[3];

        res.status(200).render('api/addRecipe', {"view": req.view});
    })
}

//GET
function ViewCraftingRecipe(req,res)
{
    req.view = {};
    req.view.Title = "View recipe";
    req.view.script = "recipe";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _structure.GetCraftingStations(),
        _craftingRecipe.GetAllCraftingCategories(),
        _craftingRecipe.GetCraftingRecipe(req.params.CraftingRecipeId)
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.Structures = responses[2];
        req.view.CraftingCategories = responses[3];
        req.view.RecipeComponents = responses[4];

        res.status(200).render('api/viewRecipe', {"view": req.view});
    })
}

//POST
function CreateCraftingRecipe(req, res) {

	if (req.body.CraftedItemId == "" || req.body.CraftedItemId == 0 || req.body.CraftedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.CraftTimeInMinutes == "") {
		res.status(400).send({ error: "Crafting time can't be empty" });
		return;
	}
	if (req.body.ItemYield == "") {
		res.status(400).send({ error: "Item yield can't be empty" });
		return;
	}

	if (req.body.RequiredStructureId == "") req.body.RequiredStructureId = null;
	if (req.body.RequiredStructureLevel == "") req.body.RequiredStructureLevel = null;
	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_craftingRecipe.CreateCraftingRecipe(req.body.CraftedItemId, req.body.CraftTimeInMinutes, req.body.ItemYield, req.body.RequiredStructureId, req.body.RequiredStructureLevel, req.body.RequiredToolOneId, req.body.RequiredToolTwoId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveCraftingRecipe(req, res) {

	if (req.body.CraftedItemId == "" || req.body.CraftedItemId == 0 || req.body.CraftedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.CraftTimeInMinutes == "") {
		res.status(400).send({ error: "Crafting time can't be empty" });
		return;
	}
	if (req.body.ItemYield == "") {
		res.status(400).send({ error: "Item yield can't be empty" });
		return;
	}

	if (req.body.RequiredStructureId == "") req.body.RequiredStructureId = null;
	if (req.body.RequiredStructureLevel == "") req.body.RequiredStructureLevel = null;
	if (req.body.RequiredToolOneId == "") req.body.RequiredToolOneId = null;
	if (req.body.RequiredToolTwoId == "") req.body.RequiredToolTwoId = null;

	_craftingRecipe.SaveCraftingRecipe(req.params.CraftingRecipeId, req.body.CraftedItemId, req.body.CraftTimeInMinutes, req.body.ItemYield, req.body.RequiredStructureId, req.body.RequiredStructureLevel, req.body.RequiredToolOneId, req.body.RequiredToolTwoId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//POST
function AddIngredientToCraftingRecipe(req, res) {

	if (req.params.CraftingRecipeId == "" || req.params.CraftingRecipeId == 0 || req.params.CraftingRecipeId == "0") {
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

	_craftingRecipe.AddIngredientToCraftingRecipe(req.params.CraftingRecipeId, req.body.IngredientItemId, req.body.IngredientAmount, req.body.OrderNo)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}