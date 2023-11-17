var express = require('express');
var router  = express.Router();

var _craftingRecipe         = require('./controllers/craftingRecipe');
var _buildingRecipe         = require('./controllers/buildingRecipe');
var _itemRepair             = require('./controllers/itemRepair');
var _upgradeRecipe          = require('./controllers/upgradeRecipe');
var _index                  = require('./controllers/index');
var _item                   = require('./controllers/item');
var _report                 = require('./controllers/report');
var _structure              = require('./controllers/structure');
var _update                 = require('./controllers/update');
var _harvest                 = require('./controllers/harvest');

router.get    ('/', _index.Index);

router.get    ('/items', _item.Items);

router.get    ('/item/new', _item.NewItem)
router.get    ('/item/:ItemId', _item.ViewItem);

router.post   ('/createItem', _item.CreateItem);
router.put    ('/item/:ItemId', _item.SaveItem);


router.get    ('/recipes', _craftingRecipe.CraftingRecipes);

router.get    ('/recipe/new', _craftingRecipe.NewCraftingRecipe);
router.get    ('/recipe/:CraftingRecipeId', _craftingRecipe.ViewCraftingRecipe);

router.post   ('/createCraftingRecipe', _craftingRecipe.CreateCraftingRecipe);
router.post   ('/recipe/:CraftingRecipeId/ingredient', _craftingRecipe.AddIngredientToCraftingRecipe);
router.put    ('/recipe/:CraftingRecipeId', _craftingRecipe.SaveCraftingRecipe);


router.get    ('/structures', _structure.Structures)

router.get    ('/structure/new', _structure.NewStructure)
router.get    ('/structure/:StructureId', _structure.ViewStructure);

router.post   ('/createStructure', _structure.CreateStructure);
router.put    ('/structure/:StructureId', _structure.SaveStructure);


router.get    ('/buildingrecipes', _buildingRecipe.BuildingRecipes);

router.get    ('/buildingrecipe/new', _buildingRecipe.NewBuildingRecipe);
router.get    ('/buildingrecipe/:BuildingRecipeId', _buildingRecipe.ViewBuildingRecipe);

router.post   ('/createBuildingRecipe', _buildingRecipe.CreateBuildingRecipe);
router.post   ('/buildingrecipe/:BuildingRecipeId/ingredient', _buildingRecipe.AddIngredientToBuildingRecipe);
router.put    ('/buildingrecipe/:BuildingRecipeId', _buildingRecipe.SaveBuildingRecipe);


router.get    ('/updates', _update.Updates)

router.get    ('/update/new', _update.NewUpdate);
router.get    ('/update/:UpdateId', _update.ViewUpdate);

router.post   ('/createUpdate', _update.CreateUpdate);
router.put    ('/update/:UpdateId', _update.SaveUpdate);
router.delete ('/update/:UpdateId', _update.DeleteUpdate);


router.get    ('/reports', _report.Reports)

router.get    ('/report/:UserReportId', _report.ViewReport);

router.put    ('/report/:UserReportId', _report.SaveReport);
router.delete ('/report/:UserReportId', _report.DeleteReport);

router.get    ('/upgraderecipes', _upgradeRecipe.UpgradeRecipes);

router.get    ('/upgraderecipe/new', _upgradeRecipe.NewUpgradeRecipe);
router.get    ('/upgraderecipe/:UpgradeRecipeId', _upgradeRecipe.ViewUpgradeRecipe);

router.post   ('/createUpgradeRecipe', _upgradeRecipe.CreateUpgradeRecipe);
router.post   ('/upgraderecipe/:UpgradeRecipeId/ingredient', _upgradeRecipe.AddIngredientToUpgradeRecipe);
router.put    ('/upgraderecipe/:UpgradeRecipeId', _upgradeRecipe.SaveUpgradeRecipe);


router.get    ('/itemrepairs', _itemRepair.ItemRepairs);

router.get    ('/itemrepair/new', _itemRepair.NewItemRepair);
router.get    ('/itemrepair/:ItemRepairId', _itemRepair.ViewItemRepair);

router.post   ('/createItemRepair', _itemRepair.CreateItemRepair);
router.post   ('/itemrepair/:ItemRepairId/ingredient', _itemRepair.AddIngredientToItemRepair);
router.put    ('/itemrepair/:ItemRepairId', _itemRepair.SaveItemRepair);


router.get    ('/harvests', _harvest.Harvests);

router.get    ('/harvest/new', _harvest.NewHarvest);
router.get    ('/harvest/:HarvestId', _harvest.ViewHarvest);

router.post   ('/createHarvest', _harvest.CreateHarvest);
router.post   ('/harvest/:HarvestId/gainedItem', _harvest.AddGainedItemToHarvest);
router.put    ('/harvest/:HarvestId', _harvest.SaveHarvest);

module.exports = router;