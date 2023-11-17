const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllItemRepairs,
    GetItemRepair,
    GetAllItemRepairTypes,

    CreateItemRepair,
    SaveItemRepair,
    AddIngredientToItemRepair,
}


function GetAllItemRepairs() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[ItemRepair_GetAll]')
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

function GetItemRepair(ItemRepairId)
{
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemRepairId", mssql.Int, ItemRepairId);
        mssql_request.execute('[dbo].[ItemRepair_GetItemRepair]')
        .then(function (dataset) {
            if (dataset && dataset.recordsets && dataset.recordsets.length != 0) 
            {
                resolve({ItemRepair:dataset.recordsets[0][0], Ingredients: dataset.recordsets[1]});
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


function GetAllItemRepairTypes() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[ItemRepairType_GetAll]')
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


function CreateItemRepair(ItemRepairTypeId, RepairedItemId, RepairTimeInMinutes) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemRepairTypeId", mssql.Int, ItemRepairTypeId);
        mssql_request.input("RepairedItemId", mssql.Int, RepairedItemId);
        mssql_request.input("RepairTimeInMinutes", mssql.Int, RepairTimeInMinutes);
        mssql_request.execute('[dbo].[ItemRepair_Insert]')
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

function SaveItemRepair(ItemRepairId, ItemRepairTypeId, RepairedItemId, RepairTimeInMinutes) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemRepairId", mssql.Int, ItemRepairId);
        mssql_request.input("ItemRepairTypeId", mssql.Int, ItemRepairTypeId);
        mssql_request.input("RepairedItemId", mssql.Int, RepairedItemId);
        mssql_request.input("RepairTimeInMinutes", mssql.Int, RepairTimeInMinutes);
        mssql_request.execute('[dbo].[ItemRepair_Update]')
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

function AddIngredientToItemRepair(ItemRepairId, IngredientItemId, IngredientAmount, OrderNo) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ItemRepairId", mssql.Int, ItemRepairId);
        mssql_request.input("IngredientItemId", mssql.Int, IngredientItemId);
        mssql_request.input("IngredientAmount", mssql.Int, IngredientAmount);
        mssql_request.input("OrderNo", mssql.Int, OrderNo);
        mssql_request.execute('[dbo].[ItemRepairIngredient_Insert]')
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