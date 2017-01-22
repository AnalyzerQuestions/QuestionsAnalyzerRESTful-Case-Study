/**
 * Controller responsável pela manipulação do fragmento de página
 * new-question.html
 * 
 * @created by Franck Aragão
 * @date 20-10-16.
 */
aqtApp.controller('newQuestionController', function($scope, userService, $http,
		$location, localStorageService) {

	var chosenSuggestions = [];
	$scope.suggestions = [];
	$scope.question = {}
	$scope.question.descritptionHtml = post = $('#editor-f').data('markdown').parseContent();

	var userStorage = localStorageService.get("aqt-user");
	var user = {};

	/**
	 * Submete uma nova pergunta à API e obtem sugestões.
	 */
	$scope.getSuggestions = function() {

		var user = userStorage;
		user.question = $scope.question;
		$http({
			method : 'POST',
			url : '/analyzer',
			data : user

		}).then(function onSucces(response) {
			$scope.suggestions = response.data;
			console.log(response.data);
		}, function onError(response) {
		});
	};
	
	/**
	 * Controla as escolhas de sugestões feitas pelo user.
	 */
	$scope.checkedSuggestion = function(suggestion) {
		var index = $scope.suggestions.indexOf(suggestion);
		var elementClicked = $(".aqt-close").eq(index);
		var elementIcon = $('.js-icon').eq(index);
		if (elementClicked.hasClass("alert-success")) {
		
			elementClicked.removeClass('alert-success');
			elementIcon.removeClass('fa-close');
			elementIcon.addClass('fa-check')
			
			var indexChoose = chosenSuggestions.indexOf(suggestion);
			chosenSuggestions.splice(indexChoose, 1);
		
		} else {
			elementClicked.addClass('alert-success');
			elementIcon.removeClass('fa-check');
			elementIcon.addClass('fa-close')
			chosenSuggestions.push(suggestion.header);
		}
	};

	/**
	 * Registra na API as escolhas de sugestões do user.
	 */
	$scope.registerChosenSuggestions = function() {

		var questionWrapper = {};
		questionWrapper.suggestions = chosenSuggestions;
		$scope.question.questionType = "CHANGED_WITH_SUGGESTION";
		questionWrapper.question = $scope.question;
		
		
		userService.getById(userStorage.id).$promise.then(
			function(data) {
				user = data;
				user.questionWrapper = questionWrapper;
				userService.updateUser(user).$promise.then(
					function onSuccess() {
						$location.path('/step2')

					}, function onError() {
				});
		}, function(data) {

		});
	};
});