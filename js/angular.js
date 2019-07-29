angular
	.module('eamResume', [])
	.controller('ResumeLoadJSON', ResumeLoadJSON)
	.directive('resumeSummaries', ResumeSummariesDirective)
//	.controller('ResumeSummariesController', ResumeSummariesController)
	.directive('ResumeEducation', ResumeEducation)
	.directive('ResumeLanguages', ResumeLanguages)
	.directive('ResumeSkills', ResumeSkills)
	.directive('ResumeExperience', ResumeExperience);
	

function ResumeLoadJSON () {
	// Loading JSON data file
	var vm = this;
	$http({
		method : "GET",
		url : "myData.json"
	}).then(
		// SUCCESS
		function (response) { vm.ad = response.data; },
		// Error
		function (response) { vm.ad = response.statusText; }
	);
}

function ResumeSummariesDirective () {
    var directive = {
        restrict: 'EA',
        templateUrl: 'resume_summaries.html',
        controller: ResumeSummariesController,
        controllerAs: 'vm'
    };

    return directive;
}

function ResumeSummariesController () {
	var vm = this;
}

function ResumeEducation () {
	var vm = this;
}

function ResumeLanguages () {
	var vm = this;
}

function ResumeSkills () {
	var vm = this;
}

function ResumeExperience () {
	var vm = this;
}