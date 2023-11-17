const _itemRepair = require('../services/itemRepair');
const _item = require('../services/item');

module.exports = {
    ItemRepairs,
    NewItemRepair,
    ViewItemRepair,

	CreateItemRepair,
	SaveItemRepair,
	AddIngredientToItemRepair,
}

//GET
function ItemRepairs(req, res)
{
    req.view = {};
    req.view.Title = "Item repair list";
    req.view.script = "list";
    Promise.all([
        _itemRepair.GetAllItemRepairs()
    ])
    .then(function(responses){
        
        req.view.ItemRepairs = responses[0];

        res.status(200).render('api/itemRepairs', {"view": req.view});
    })
}

//GET
function NewItemRepair(req, res)
{
    req.view = {};
    req.view.Title = "Add new item repair";
    req.view.script = "itemRepair";
    Promise.all([
		_item.GetAllItems(),
		_itemRepair.GetAllItemRepairTypes()
    ])
    .then(function(responses){

		req.view.Items = responses[0];
		req.view.ItemRepairTypes = responses[1];

        res.status(200).render('api/addItemRepair', {"view": req.view});
    })
}

//GET
function ViewItemRepair(req,res)
{
    req.view = {};
    req.view.Title = "View item repair";
    req.view.script = "itemRepair";
    Promise.all([
        _item.GetAllItems(),
        _itemRepair.GetItemRepair(req.params.ItemRepairId),
		_itemRepair.GetAllItemRepairTypes()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.ItemRepairComponents = responses[1];
		req.view.ItemRepairTypes = responses[2];

        res.status(200).render('api/viewItemRepair', {"view": req.view});
    })
}

//POST
function CreateItemRepair(req, res) {

	if (req.body.ItemRepairTypeId == "" || req.body.ItemRepairTypeId == 0 || req.body.ItemRepairTypeId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.RepairedItemId == "" || req.body.RepairedItemId == 0 || req.body.RepairedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.RepairTimeInMinutes == "") {
		res.status(400).send({ error: "Item repair time can't be empty" });
		return;
	}

	_itemRepair.CreateItemRepair(req.body.ItemRepairTypeId, req.body.RepairedItemId, req.body.RepairTimeInMinutes)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveItemRepair(req, res) {

	if (req.body.ItemRepairTypeId == "" || req.body.ItemRepairTypeId == 0 || req.body.ItemRepairTypeId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.RepairedItemId == "" || req.body.RepairedItemId == 0 || req.body.RepairedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	if (req.body.RepairTimeInMinutes == "") {
		res.status(400).send({ error: "Item repair time can't be empty" });
		return;
	}

	_itemRepair.SaveItemRepair(req.params.ItemRepairId, req.body.ItemRepairTypeId, req.body.RepairedItemId, req.body.RepairTimeInMinutes)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//POST
function AddIngredientToItemRepair(req, res) {

	if (req.params.ItemRepairId == "" || req.params.ItemRepairId == 0 || req.params.ItemRepairId == "0") {
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

	_itemRepair.AddIngredientToItemRepair(req.params.ItemRepairId, req.body.IngredientItemId, req.body.IngredientAmount, req.body.OrderNo)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}