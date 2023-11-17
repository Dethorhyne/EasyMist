const _item = require('../services/item');

module.exports = {
    Public_Items,
    Public_ViewItem,

    Items,
    NewItem,
    ViewItem,

	CreateItem,
	SaveItem,
}

//GET
function Public_Items(req, res)
{
    req.view.Title = "Item list";
    
    res.status(200).render('items', {"view": req.view});
}

//GET
function Public_ViewItem(req,res)
{
    Promise.all([
        _item.GetItem(req.params.ItemId),
        _item.GetCraftingRecipesForItem(req.params.ItemId),
        _item.GetBuildingRecipesForItem(req.params.ItemId),
        _item.GetItemRepairs(req.params.ItemId),
        _item.GetHarvestsForItem(req.params.ItemId)
    ])
    .then(function(responses){

        req.view.Item = responses[0];
        req.view.CraftingRecipes = responses[1].filter(x => x.ItemId == req.view.Item.ItemId);
        req.view.IngredientRecipes = responses[1].filter(x => x.ItemId != req.view.Item.ItemId);
        req.view.BuildingRecipes = responses[2];
        req.view.ItemRepairs = responses[3];
        req.view.Harvests = responses[4];

        req.view.Title = "Item > " + req.view.Item.Name;

        res.status(200).render('item', {"view": req.view});
    })
}


//GET
function Items(req, res)
{
    req.view = {};
    req.view.Title = "Item list";
    req.view.script = "list";
    Promise.all([
        _item.GetAllItems()
    ])
    .then(function(responses){

        req.view.Items = responses[0];

        res.status(200).render('api/items', {"view": req.view});
    })
}

//GET
function NewItem(req, res)
{
    req.view = {};
    req.view.Title = "Add new item";
    req.view.script = "item";
    Promise.all([
        _item.GetAllCategories()
    ])
    .then(function(responses){

        req.view.Categories = responses[0];

        res.status(200).render('api/addItem', {"view": req.view});
    })
}

//GET
function ViewItem(req,res)
{
    req.view = {};
    req.view.Title = "View item";
    req.view.script = "item";
    Promise.all([
        _item.GetAllCategories(),
        _item.GetItem(req.params.ItemId),
        _item.GetCraftingRecipesForItem(req.params.ItemId)
    ])
    .then(function(responses){

        req.view.Categories = responses[0];
        req.view.Item = responses[1];
        req.view.CraftingRecipes = responses[2].filter(x => x.ItemId == req.view.Item.ItemId);
        req.view.IngredientRecipes = responses[2].filter(x => x.ItemId != req.view.Item.ItemId);

        res.status(200).render('api/viewItem', {"view": req.view});
    })
}


//POST
function CreateItem(req, res) {

	if (req.body.Name == "") {
		res.status(400).send({ error: "Item can't be added without a name." });
		return;
	}
	if (req.body.CategoryId == "") {
		res.status(400).send({ error: "Building category can't be empty" });
		return;
	}
	if (req.body.StackSize == "" || req.body.StackSize == 0 || req.body.StackSize == "0") {
		res.status(400).send({ error: "Stack size can't be empty." });
		return;
	}

	if (req.body.Description == "") req.body.Description = null;

	_item.CreateItem(req.body.Name, req.body.CategoryId, req.body.Description, req.body.StackSize, req.body.IsCraftable, req.body.HasDurability, req.body.IsEquipable)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveItem(req, res) {

	if (req.body.Name == "") {
		res.status(400).send({ error: "Item can't be added without a name." });
		return;
	}
	if (req.body.CategoryId == "") {
		res.status(400).send({ error: "Building category can't be empty" });
		return;
	}
	if (req.body.StackSize == "" || req.body.StackSize == 0 || req.body.StackSize == "0") {
		res.status(400).send({ error: "Stack size can't be empty." });
		return;
	}

	if (req.body.Description == "") req.body.Description = null;

	_item.SaveItem(req.params.ItemId, req.body.Name, req.body.CategoryId, req.body.Description, req.body.StackSize, req.body.IsCraftable, req.body.HasDurability, req.body.IsEquipable)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}