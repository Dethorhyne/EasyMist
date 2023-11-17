const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllCraftingRecipes,
    GetCraftingRecipe,
    GetAllCraftingCategories,

    CreateCraftingRecipe,
    SaveCraftingRecipe,
    AddIngredientToCraftingRecipe,
}


function GetAllCraftingRecipes() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[CraftingRecipes_GetAll]')
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

function GetCraftingRecipe(CraftingRecipeId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("CraftingRecipeId", mssql.Int, CraftingRecipeId);
        mssql_request.execute('[dbo].[CraftingRecipes_GetCraftingRecipe]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve({Recipe:dataset.recordsets[0][0], Ingredients: dataset.recordsets[1]});
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

function GetAllCraftingCategories() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[CraftingCategories_GetAll]')
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


function CreateCraftingRecipe(CraftedItemId, CraftTimeInMinutes, ItemYield, RequiredStructureId = null, RequiredStructureLevel = null, RequiredToolOneId = null, RequiredToolTwoId = null) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("CraftedItemId", mssql.Int, CraftedItemId);
        mssql_request.input("CraftTimeInMinutes", mssql.Int, CraftTimeInMinutes);
        mssql_request.input("ItemYield", mssql.Int, ItemYield);
        mssql_request.input("RequiredStructureId", mssql.Int, RequiredStructureId);
        mssql_request.input("RequiredStructureLevel", mssql.Int, RequiredStructureLevel);
        mssql_request.input("RequiredToolOneId", mssql.Int, RequiredToolOneId);
        mssql_request.input("RequiredToolTwoId", mssql.Int, RequiredToolTwoId);
        mssql_request.execute('[dbo].[CraftingRecipes_Insert]')
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

function SaveCraftingRecipe(CraftingRecipeId, CraftedItemId, CraftTimeInMinutes, ItemYield, RequiredStructureId = null, RequiredStructureLevel = null, RequiredToolOneId = null, RequiredToolTwoId = null) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("CraftingRecipeId", mssql.Int, CraftingRecipeId);
        mssql_request.input("CraftedItemId", mssql.Int, CraftedItemId);
        mssql_request.input("CraftTimeInMinutes", mssql.Int, CraftTimeInMinutes);
        mssql_request.input("ItemYield", mssql.Int, ItemYield);
        mssql_request.input("RequiredStructureId", mssql.Int, RequiredStructureId);
        mssql_request.input("RequiredStructureLevel", mssql.Int, RequiredStructureLevel);
        mssql_request.input("RequiredToolOneId", mssql.Int, RequiredToolOneId);
        mssql_request.input("RequiredToolTwoId", mssql.Int, RequiredToolTwoId);
        mssql_request.execute('[dbo].[CraftingRecipes_Update]')
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

function AddIngredientToCraftingRecipe(CraftingRecipeId, IngredientItemId, IngredientAmount, OrderNo) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("CraftingRecipeId", mssql.Int, CraftingRecipeId);
        mssql_request.input("IngredientItemId", mssql.Int, IngredientItemId);
        mssql_request.input("IngredientAmount", mssql.Int, IngredientAmount);
        mssql_request.input("OrderNo", mssql.Int, OrderNo);
        mssql_request.execute('[dbo].[CraftingRecipeIngredient_Insert]')
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