const _harvest = require('../services/harvest');
const _item = require('../services/item');

module.exports = {
    Harvests,
    NewHarvest,
    ViewHarvest,

	CreateHarvest,
	SaveHarvest,
	AddGainedItemToHarvest,
}

//GET
function Harvests(req, res)
{
    req.view = {};
    req.view.Title = "Harvest list";
    req.view.script = "list";
    Promise.all([
        _harvest.GetAllHarvests()
    ])
    .then(function(responses){
        
        req.view.Harvests = responses[0];

        res.status(200).render('api/harvests', {"view": req.view});
    })
}

//GET
function NewHarvest(req, res)
{
    req.view = {};
    req.view.Title = "Add new harvest";
    req.view.script = "harvest";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools()
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];

        res.status(200).render('api/addHarvest', {"view": req.view});
    })
}

//GET
function ViewHarvest(req,res)
{
    req.view = {};
    req.view.Title = "View harvest";
    req.view.script = "harvest";
    Promise.all([
        _item.GetAllItems(),
        _item.GetAllTools(),
        _harvest.GetHarvest(req.params.HarvestId)
    ])
    .then(function(responses){

        req.view.Items = responses[0];
        req.view.Tools = responses[1];
        req.view.HarvestComponents = responses[2];

        res.status(200).render('api/viewHarvest', {"view": req.view});
    })
}

//POST
function CreateHarvest(req, res) {

	if (req.body.HarvestedItemId == "" || req.body.HarvestedItemId == 0 || req.body.HarvestedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}

	if (req.body.ToolItemId == "") req.body.ToolItemId = null;

	_harvest.CreateHarvest(req.body.HarvestedItemId, req.body.ToolItemId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveHarvest(req, res) {

	if (req.body.HarvestedItemId == "" || req.body.HarvestedItemId == 0 || req.body.HarvestedItemId == "0") {
		res.status(400).send({ error: "No item selected" });
		return;
	}
	
	if (req.body.ToolItemId == "") req.body.ToolItemId = null;

	_harvest.SaveHarvest(req.params.HarvestId, req.body.HarvestedItemId, req.body.ToolItemId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//POST
function AddGainedItemToHarvest(req, res) {

	if (req.params.HarvestId == "" || req.params.HarvestId == 0 || req.params.HarvestId == "0") {
		res.status(400).send({ error: "No harvest selected" });
		return;
	}
	if (req.body.GainedItemId == "" || req.body.GainedItemId == 0 || req.body.GainedItemId == "0") {
		res.status(400).send({ error: "Gained item not selected" });
		return;
	}
	if (req.body.LowRange == "") {
		res.status(400).send({ error: "Low range not selected" });
		return;
	}
	if (req.body.HighRange == "") {
		res.status(400).send({ error: "High range not selected" });
		return;
	}
	if (req.body.HarvestTime == "" || req.body.HarvestTime == 0 || req.body.HarvestTime == "0") {
		res.status(400).send({ error: "Harvest time not selected" });
		return;
	}
	if (req.body.OrderNo == "" || req.body.OrderNo == 0 || req.body.OrderNo == "0") {
		res.status(400).send({ error: "Order not selected" });
		return;
	}

	_harvest.AddGainedItemToHarvest(req.params.HarvestId, req.body.GainedItemId, req.body.LowRange, req.body.HighRange, req.body.HarvestTime, req.body.OrderNo)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}