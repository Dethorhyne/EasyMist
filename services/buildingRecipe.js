const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllBuildingRecipes,
    GetBuildingRecipe,

    CreateBuildingRecipe,
    SaveBuildingRecipe,
    AddIngredientToBuildingRecipe,
}


function GetAllBuildingRecipes() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[BuildingRecipes_GetAll]')
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

function GetBuildingRecipe(BuildingRecipeId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("BuildingRecipeId", mssql.Int, BuildingRecipeId);
        mssql_request.execute('[dbo].[BuildingRecipes_GetBuildingRecipe]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve({BuildingRecipe:dataset.recordsets[0][0], Ingredients: dataset.recordsets[1]});
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


function CreateBuildingRecipe(BuiltStructureId, BuildTimeInMinutes, RequiredToolOneId = null, RequiredToolTwoId = null) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("BuiltStructureId", mssql.Int, BuiltStructureId);
        mssql_request.input("BuildTimeInMinutes", mssql.Int, BuildTimeInMinutes);
        mssql_request.input("RequiredToolOneId", mssql.Int, RequiredToolOneId);
        mssql_request.input("RequiredToolTwoId", mssql.Int, RequiredToolTwoId);
        mssql_request.execute('[dbo].[BuildingRecipes_Insert]')
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

function SaveBuildingRecipe(BuildingRecipeId, BuiltStructureId, BuildTimeInMinutes, RequiredToolOneId = null, RequiredToolTwoId = null) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("BuildingRecipeId", mssql.Int, BuildingRecipeId);
        mssql_request.input("BuiltStructureId", mssql.Int, BuiltStructureId);
        mssql_request.input("BuildTimeInMinutes", mssql.Int, BuildTimeInMinutes);
        mssql_request.input("RequiredToolOneId", mssql.Int, RequiredToolOneId);
        mssql_request.input("RequiredToolTwoId", mssql.Int, RequiredToolTwoId);
        mssql_request.execute('[dbo].[BuildingRecipes_Update]')
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

function AddIngredientToBuildingRecipe(BuildingRecipeId, IngredientItemId, IngredientAmount, OrderNo) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("BuildingRecipeId", mssql.Int, BuildingRecipeId);
        mssql_request.input("IngredientItemId", mssql.Int, IngredientItemId);
        mssql_request.input("IngredientAmount", mssql.Int, IngredientAmount);
        mssql_request.input("OrderNo", mssql.Int, OrderNo);
        mssql_request.execute('[dbo].[BuildingRecipeIngredient_Insert]')
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