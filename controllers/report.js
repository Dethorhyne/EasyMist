const _report = require('../services/report');

module.exports = {
    Reports,
    ViewReport,

	Public_CreateReport,
	SaveReport,
	DeleteReport,
}

//GET
function Reports(req, res)
{
    req.view = {};
    req.view.Title = "Reports list";
    req.view.script = "list";
    Promise.all([
        _report.GetAllUserReports()
    ])
    .then(function(responses){
        
        req.view.UserReports = responses[0];

        res.status(200).render('api/reports', {"view": req.view});
    })
}

//GET
function ViewReport(req,res)
{
    req.view = {};
    req.view.Title = "View update";
    req.view.script = "report";
    Promise.all([
        _report.GetUserReport(req.params.UserReportId)
    ])
    .then(function(responses){

        req.view.UserReport = responses[0];
        res.status(200).render('api/viewReport', {"view": req.view});
    })
}

//POST
function Public_CreateReport(req, res) {
	if (req.body.ReportId == "") {
		res.status(400).send({ error: "Report category must be selected" });
		return;
	}
	if (req.body.Content == "") {
		res.status(400).send({ error: "Report can't be empty" });
		return;
	}

	_report.CreateReport(req.body.ReportId, req.body.Content, req.ClientIpAddress, req.headers.referer)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//PUT
function SaveReport(req, res) {
	if (req.body.Content == "") {
		res.status(400).send({ error: "Report can't be empty" });
		return;
	}

	_report.SaveReport(req.params.UserReportId, req.body.Content)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}

//DELETE
function DeleteReport(req, res) {
	_report.DeleteReport(req.params.UserReportId)
	.then(function (response) {
		res.status(200).send(response);
	})
	.catch(function (exception) {
		res.status(400).send(exception);
	});
}