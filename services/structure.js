const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllStructures,
    GetCraftingStations,
    GetStructure,
    GetBuildingRecipeForStructure,
    GetCraftingRecipesForStructure,
    GetUpgradeRecipesForStructure,
    GetAllBuildingCategories,

    CreateStructure,
    SaveStructure,
}


function GetAllStructures() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Structures_GetAll]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetCraftingStations() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Structures_GetCraftingStations]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetStructure(StructureId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.execute('[dbo].[Structure_GetStructure]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0]);
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetBuildingRecipeForStructure(StructureId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.execute('[dbo].[BuildingRecipes_GetBuildingRecipeForStructure]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0]);
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetCraftingRecipesForStructure(StructureId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.execute('[dbo].[CraftingRecipes_GetCraftingRecipesForStructure]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0]);
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetUpgradeRecipesForStructure(StructureId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.execute('[dbo].[UpgradeRecipes_GetUpgradeRecipesForStructure]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0]);
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function GetAllBuildingCategories() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[BuildingCategories_GetAll]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordsets[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}


function CreateStructure(Name, BuildingCategoryId, Description, StorageAmount, IsElectricityRequired, EnergyConsumption, IsCraftStation, StructureUI) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("BuildingCategoryId", mssql.Int, BuildingCategoryId);
        mssql_request.input("Description", mssql.NVarChar, Description);
        mssql_request.input("StorageAmount", mssql.Int, StorageAmount);
        mssql_request.input("IsElectricityRequired", mssql.Bit, helper.checkBoolean(IsElectricityRequired));
        mssql_request.input("EnergyConsumption", mssql.Int, EnergyConsumption);
        mssql_request.input("IsCraftStation", mssql.Bit, helper.checkBoolean(IsCraftStation));
        mssql_request.input("StructureUI", mssql.NVarChar, StructureUI);
        mssql_request.execute('[dbo].[Structures_Insert]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}

function SaveStructure(StructureId, Name, BuildingCategoryId, Description, StorageAmount, IsElectricityRequired, EnergyConsumption, IsCraftStation, StructureUI) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("BuildingCategoryId", mssql.Int, BuildingCategoryId);
        mssql_request.input("Description", mssql.NVarChar, Description);
        mssql_request.input("StorageAmount", mssql.Int, StorageAmount);
        mssql_request.input("IsElectricityRequired", mssql.Bit, helper.checkBoolean(IsElectricityRequired));
        mssql_request.input("EnergyConsumption", mssql.Int, EnergyConsumption);
        mssql_request.input("IsCraftStation", mssql.Bit, helper.checkBoolean(IsCraftStation));
        mssql_request.input("StructureUI", mssql.NVarChar, StructureUI);
        mssql_request.execute('[dbo].[Structures_Update]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve(dataset.recordset[0])
            }
            else 
            {
                resolve({});
            }
        }).catch(function (exception) {
            reject(exception);
        });
    })
}