const _update = require('../services/update');

module.exports = {
    Public_Updates,

    Updates,
    NewUpdate,
    ViewUpdate,

	CreateUpdate,
	SaveUpdate,
	DeleteUpdate,
}

//GET
function Public_Updates(req, res)
{
    req.view.Title = "Update list";

    Promise.all([
        _update.GetAllUpdates()
    ])
    .then(function(responses){

        req.view.Updates = responses[0];

        res.status(200).render('updates', {"view": req.view});
    })
}


//GET
function Updates(req, res)
{
    req.view = {};
    req.view.Title = "Updates list";
    req.view.script = "list";
    Promise.all([
        _update.GetAllUpdates()
    ])
    .then(function(responses){
        
        req.view.Updates = responses[0];

        res.status(200).render('api/updates', {"view": req.view});
    })
}

//GET
function NewUpdate(req, res)
{
    req.view = {};
    req.view.Title = "Add update";
    req.view.script = "update";
    
    res.status(200).render('api/addUpdate', {"view": req.view});
}

//GET
function ViewUpdate(req,res)
{
    req.view = {};
    req.view.Title = "View update";
    req.view.script = "update";
    Promise.all([
        _update.GetUpdate(req.params.UpdateId)
    ])
    .then(function(responses){

        req.view.Update = responses[0];
        res.status(200).render('api/viewUpdate', {"view": req.view});
    })
}


//POST
function CreateUpdate(req, res) {
	if (req.body.UpdateVersion == "") {
		res.status(400).send({ error: "Version can't be empty" });
		return;
	}
	if (req.body.UpdateDate == "") {
		res.status(400).send({ error: "Update date must be set" });
		return;
	}
	if (req.body.Changelist == "") {
		res.status(400).send({ error: "Changelist can't be empty" });
		return;
	}

	_update.CreateUpdate(req.body.UpdateVersion, req.body.UpdateDate, req.body.Changelist)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveUpdate(req, res) {
	if (req.body.UpdateVersion == "") {
		res.status(400).send({ error: "Version can't be empty" });
		return;
	}
	if (req.body.UpdateDate == "") {
		res.status(400).send({ error: "Update date must be set" });
		return;
	}
	if (req.body.Changelist == "") {
		res.status(400).send({ error: "Changelist can't be empty" });
		return;
	}

	_update.SaveUpdate(req.params.UpdateId, req.body.UpdateVersion, req.body.UpdateDate, req.body.Changelist)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//DELETE
function DeleteUpdate(req, res) {
	_update.DeleteUpdate(req.params.UpdateId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}