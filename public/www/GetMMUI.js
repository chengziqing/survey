var GetMMUI = function() {};

GetMMUI.prototype.ShowUI = function(successCallback, failCallback) {

    function success(args) {
        successCallback(args);
    }
    
    function fail(args) {
    	failCallback(args);
    }

	return PhoneGap.exec(function(args) {
		success(args);
	}, function(args) {
		fail(args);
	}, 'GetMMUI', '', []);
};

cordova.addConstructor(function() {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.GetMMUI = new GetMMUI();
});
