const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllItems,
    GetItem,
    GetCraftingRecipesForItem,
    GetBuildingRecipesForItem,
    GetItemRepairs,
    GetHarvestsForItem,

    GetAllTools,
    GetAllCategories,

    CreateItem,
    SaveItem,
}


function GetAllItems() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Items_GetAll]')
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

function GetItem(ItemId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.execute('[dbo].[Items_GetItem]')
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

function GetCraftingRecipesForItem(ItemId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.execute('[dbo].[CraftingRecipes_GetCraftingRecipesForItem]')
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

function GetBuildingRecipesForItem(ItemId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.execute('[dbo].[BuildingRecipes_GetBuildingRecipesForItem]')
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

function GetItemRepairs(ItemId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.execute('[dbo].[ItemRepair_GetByItemId]')
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

function GetHarvestsForItem(ItemId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.execute('[dbo].[Harvest_GetForItemId]')
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


function GetAllTools() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Items_GetAllTools]')
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

function GetAllCategories() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Categories_GetAll]')
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


function CreateItem(Name, CategoryId, Description, StackSize, IsCraftable, HasDurability, IsEquipable) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("CategoryId", mssql.Int, CategoryId);
        mssql_request.input("Description", mssql.NVarChar, Description);
        mssql_request.input("StackSize", mssql.Int, StackSize);
        mssql_request.input("IsCraftable", mssql.Bit, helper.checkBoolean(IsCraftable));
        mssql_request.input("HasDurability", mssql.Bit, helper.checkBoolean(HasDurability));
        mssql_request.input("IsEquipable", mssql.Bit, helper.checkBoolean(IsEquipable));
        mssql_request.execute('[dbo].[Items_Insert]')
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

function SaveItem(ItemId, Name, CategoryId, Description, StackSize, IsCraftable, HasDurability, IsEquipable) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemId", mssql.Int, ItemId);
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("CategoryId", mssql.Int, CategoryId);
        mssql_request.input("Description", mssql.NVarChar, Description);
        mssql_request.input("StackSize", mssql.Int, StackSize);
        mssql_request.input("IsCraftable", mssql.Bit, helper.checkBoolean(IsCraftable));
        mssql_request.input("HasDurability", mssql.Bit, helper.checkBoolean(HasDurability));
        mssql_request.input("IsEquipable", mssql.Bit, helper.checkBoolean(IsEquipable));
        mssql_request.execute('[dbo].[Items_Update]')
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