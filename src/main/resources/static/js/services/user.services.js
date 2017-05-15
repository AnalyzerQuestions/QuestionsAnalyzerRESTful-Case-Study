aqtApp.factory('resourceService', function($resource) {
	
	return $resource('/analyzer/user/:userId', null, {
		update : {
			method: 'PUT'
		}
	});
})

aqtApp.service('userService', function(resourceService, $http){
	
	this.saveUser = function(user){
		return resourceService.save(user);
	};
	
	this.updateUser = function(user) {
		return resourceService.update(user);
	};	
	
	this.getById = function(id) {
		return resourceService.get({userId: id});
	};
	
	this.findAll = function(id) {
		return $http.get('/admin/user');
	};
});