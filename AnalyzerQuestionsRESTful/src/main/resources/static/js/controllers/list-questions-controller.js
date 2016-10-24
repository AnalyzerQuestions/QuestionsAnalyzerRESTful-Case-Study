/**
 * Controller responsável pela manipulação do fragmento de  página list-questions.html
 * 
 * @created by Franck Aragão @date 21-10-16.
 */
aqtApp.controller("listQuestionController", function($scope, $http, $location) {

	const URI = 'http://localhost:8080';
	$scope.questions = [];
	$scope.questionSelected = {};
	var chosenQuestions = [];
	var clickedQuestions = [];
	

	/**
	 * Obtém lista de perguntas do WS.
	 */
	$scope.getQuestions = function() {

		$http({
			method : 'GET',
			url : URI + '/analyzer/getQuestions'

		}).then(function onSuccess(response) {
			$scope.questions = response.data;

		}, function onError(response) {

		});
	};
	
	/**
	 * Evento de click no item de lista clicado.
	 */
	$scope.selectedQuestion = function(question) {
		$scope.questionSelected = question;
		clickedQuestions.push(question);
	};
	
	/**
	 * Evento de escolha para o user responder.
	 */
	$scope.selectedChosenQuestion = function(){
		chosenQuestions.push($scope.questionSelected);
		var index = $scope.questions.indexOf($scope.questionSelected);
		var groupList = $(".aqt-confirm").eq(index);
		groupList.append('<span class="label label-success">SELECIONADA</span>'); 
		
		$scope.questionSelected = {};
	}
	
	$scope.endChosenQuestion = function(){
		var chosenQuestion = {};
		chosenQuestion.clickedQuestions = clickedQuestions;
		chosenQuestion.chosenQuestions = chosenQuestions;
		
		$http({
			method: 'POST',
			url : URI + '/analyzer/choices',
			data : chosenQuestion
			
		}).then(function onSuccess(response) {
			$location.path('/responseQuestions')
			
		}, function onError(response) {
			
		});
		
		console.log(chosenQuestion);
	}
	
	$scope.getQuestions();
	
});