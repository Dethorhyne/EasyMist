const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllUpgradeRecipes,
    GetUpgradeRecipe,

    CreateUpgradeRecipe,
    SaveUpgradeRecipe,
    AddIngredientToUpgradeRecipe,
}


function GetAllUpgradeRecipes() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[UpgradeRecipes_GetAll]')
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

function GetUpgradeRecipe(UpgradeRecipeId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpgradeRecipeId", mssql.Int, UpgradeRecipeId);
        mssql_request.execute('[dbo].[UpgradeRecipes_GetUpgradeRecipe]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve({UpgradeRecipe:dataset.recordsets[0][0], Ingredients: dataset.recordsets[1]});
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


function CreateUpgradeRecipe(StructureId, Name, BuildTimeInMinutes) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("BuildTimeInMinutes", mssql.Int, BuildTimeInMinutes);
        mssql_request.execute('[dbo].[UpgradeRecipes_Insert]')
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

function SaveUpgradeRecipe(UpgradeRecipeId, StructureId, Name, BuildTimeInMinutes) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpgradeRecipeId", mssql.Int, UpgradeRecipeId);
        mssql_request.input("StructureId", mssql.Int, StructureId);
        mssql_request.input("Name", mssql.NVarChar, Name);
        mssql_request.input("BuildTimeInMinutes", mssql.Int, BuildTimeInMinutes);
        mssql_request.execute('[dbo].[UpgradeRecipes_Update]')
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

function AddIngredientToUpgradeRecipe(UpgradeRecipeId, IngredientItemId, IngredientAmount, OrderNo) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UpgradeRecipeId", mssql.Int, UpgradeRecipeId);
        mssql_request.input("IngredientItemId", mssql.Int, IngredientItemId);
        mssql_request.input("IngredientAmount", mssql.Int, IngredientAmount);
        mssql_request.input("OrderNo", mssql.Int, OrderNo);
        mssql_request.execute('[dbo].[UpgradeRecipeIngredient_Insert]')
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