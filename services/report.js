const mssql = require('mssql');
const helper = require('../helpers/helper');

module.exports = {
    GetAllReports,

    GetAllUserReports,
    GetUserReport,

    CreateReport,
    SaveReport,
    DeleteReport,
}


function GetAllReports() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[Reports_GetAll]')
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


function GetAllUserReports() {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.execute('[dbo].[UserReports_GetAll]')
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

function GetUserReport(UserReportId) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UserReportId", mssql.Int, UserReportId);
        mssql_request.execute('[dbo].[UserReports_GetUserReport]')
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


function CreateReport(ReportId, Content, ClientIPAddress, RefererUrl) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("ReportId", mssql.Int, ReportId);
        mssql_request.input("Content", mssql.NVarChar, Content);
        mssql_request.input("ClientIPAddress", mssql.NVarChar, ClientIPAddress);
        mssql_request.input("RefererUrl", mssql.NVarChar, RefererUrl);
        mssql_request.execute('[dbo].[UserReport_Insert]')
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

function SaveReport(UserReportId, Content) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UserReportId", mssql.Int, UserReportId);
        mssql_request.input("Content", mssql.NVarChar, Content);
        mssql_request.execute('[dbo].[UserReport_Update]')
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

function DeleteReport(UserReportId) {
    return new Promise(function (resolve, reject) {
        var mssql_request = new mssql.Request();
        mssql_request.input("UserReportId", mssql.Int, UserReportId);
        mssql_request.execute('[dbo].[UserReport_Delete]')
        .then(function (dataset) {
            resolve({});
        }).catch(function (exception) {
            reject(exception);
        });
    })
}