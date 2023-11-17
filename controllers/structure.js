const _structure = require('../services/structure');

module.exports = {
    Public_Structures,
    Public_ViewStructure,

    Structures,
    NewStructure, 
    ViewStructure,

	CreateStructure,
	SaveStructure,
}

//GET
function Public_Structures(req, res)
{
    req.view.Title = "Structure list";
    
    res.status(200).render('structures', {"view": req.view});
}

//GET
function Public_ViewStructure(req,res)
{
    Promise.all([
        _structure.GetStructure(req.params.StructureId),
        _structure.GetBuildingRecipeForStructure(req.params.StructureId),
        _structure.GetCraftingRecipesForStructure(req.params.StructureId),
        _structure.GetUpgradeRecipesForStructure(req.params.StructureId)
    ])
    .then(function(responses){

        req.view.Structure = responses[0];
        req.view.BuildingRecipe = responses[1];
        req.view.CraftingRecipes = responses[2];
        req.view.UpgradeRecipes = responses[3];

        req.view.Title = "Structure > " + req.view.Structure.Name;

        res.status(200).render('structure', {"view": req.view});
    })
}


//GET
function Structures(req, res)
{
    req.view = {};
    req.view.Title = "Structure list";
    req.view.script = "list";
    Promise.all([
        _structure.GetAllStructures()
    ])
    .then(function(responses){

        req.view.Structures = responses[0];

        res.status(200).render('api/structures', {"view": req.view});
    })
}

//GET
function NewStructure(req, res)
{
    req.view = {};
    req.view.Title = "Add new structure";
    req.view.script = "structure";
    Promise.all([
        _structure.GetAllBuildingCategories(),
    ])
    .then(function(responses){

        req.view.BuildingCategories = responses[0];

        res.status(200).render('api/addStructure', {"view": req.view});
    })
}

//GET
function ViewStructure(req,res)
{
    req.view = {};
    req.view.Title = "View structure";
    req.view.script = "structure";
    Promise.all([
        _structure.GetAllBuildingCategories(),
        _structure.GetStructure(req.params.StructureId)
    ])
    .then(function(responses){

        req.view.BuildingCategories = responses[0];
        req.view.Structure = responses[1];

        res.status(200).render('api/viewStructure', {"view": req.view});
    })
}


//POST
function CreateStructure(req, res) {

	if (req.body.Name == "") {
		res.status(400).send({ error: "Structure can't be added without a name." });
		return;
	}
	if (req.body.BuildingCategoryId == "") {
		res.status(400).send({ error: "Building category can't be empty" });
		return;
	}

	if (req.body.StorageAmount == "") req.body.StorageAmount = null;
	if (req.body.Description == "") req.body.Description = null;
	if (req.body.EnergyConsumption == "") req.body.EnergyConsumption = null;

	_structure.CreateStructure(req.body.Name, req.body.BuildingCategoryId, req.body.Description, req.body.StorageAmount, req.body.IsElectricityRequired, req.body.EnergyConsumption, req.body.IsCraftStation, req.body.StructureUI)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveStructure(req, res) {

	if (req.body.Name == "") {
		res.status(400).send({ error: "Structure can't be added without a name." });
		return;
	}
	if (req.body.BuildingCategoryId == "") {
		res.status(400).send({ error: "Building category can't be empty" });
		return;
	}

	if (req.body.StorageAmount == "") req.body.StorageAmount = null;
	if (req.body.Description == "") req.body.Description = null;
	if (req.body.EnergyConsumption == "") req.body.EnergyConsumption = null;

	_structure.SaveStructure(req.params.StructureId, req.body.Name, req.body.BuildingCategoryId, req.body.Description, req.body.StorageAmount, req.body.IsElectricityRequired, req.body.EnergyConsumption, req.body.IsCraftStation, req.body.StructureUI)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}