/**
 * Utils
 */
jQuery.fn.toObservable = function (eventName, selector) {
	return Rx.Observable.fromEvent(this, eventName, selector);
};


var api = (function(){

	// var baseUrl = "https://yaq8h11crk.execute-api.eu-west-1.amazonaws.com/prod";
	var baseUrl = "../data";

/*
		var promise = $.ajax({
			url: 'https://yaq8h11crk.execute-api.eu-west-1.amazonaws.com/prod/pads?owner=' + encodeURI(inp.val())
		}).promise();
		 */

	return {
		"pads":{

			"createPad": function(title, owner){
				var pad = {
					"id": new Date().getTime() + "-" + Math.floor(Math.random() * 1000000), 
					"title": title, 
					"owner": owner
				};

				return $.ajax({
					url: baseUrl + '/pads?owner=' + encodeURI(username),
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify(pad)
				}).promise();
			},

			"padsByOwner": function(username){
				return $.ajax({url: baseUrl + '/pads?owner=' + encodeURI(username)}).promise();
			}
		}
	};

}());



// Flow and such

var event$ = new Rx.Subject();


var loginView = new Vue({
    el: '#app-login-view',
    data: {
        loginRequired: true,
        loginStatus: null
    }
});

var login$ = Rx.Observable.create(function(observer){

    $('#app-login-view form').on('submit', function(){
        loginView.loginStatus = 'inprog';
        var f  = this;
        var inp = $(f).find('input');
		
		var doley = Rx.Observable.fromPromise(api.pads.padsByOwner(inp.val()));
        
        doley.subscribe(function(data){
            loginView.loginStatus = 'done';
            loginView.loginRequired = false;
			
			observer.onNext(JSON.parse(data));
        });

        return false;
    });
});

login$.subscribe(function(d){
    console.log(d);
	mainView.pads = d;
	mainView.authenticated = true;
});



var mainView = new Vue({
    el: '#app-main-view',
    data: {
        authenticated: false,
        loginStatus: null,
		stateStatus: null,
		pads: []
    }
});


/*


	var button, clickStream;
	
		button = document.querySelector('button');
		// console.log(button);
		// alert(button);
		clickStream = Rx.Observable.fromEvent(button, 'click');
		

	// HERE
	// The 4 lines of code that make the multi-click logic
	var multiClickStream = clickStream
	    .buffer(function() { return clickStream.throttle(250); })
	    .map(function(list) { return list.length; })
	    .filter(function(x) { return x >= 2; });

	// Same as above, but detects single clicks
	var singleClickStream = clickStream
	    .buffer(function() { return clickStream.throttle(300); })
	    .map(function(list) { return list.length; })
	    .filter(function(x) { return x === 1; });

	// Listen to both streams and render the text label accordingly
	singleClickStream.subscribe(function (event) {
	    document.querySelector('h2.singles').textContent = 'SIngle click';
	});
	
	multiClickStream.subscribe(function (numclicks) {
	    document.querySelector('h2.multies').textContent = ''+numclicks+'x click';
	});
	Rx.Observable.merge(singleClickStream, multiClickStream)
	    .throttle(1000)
	    .subscribe(function (suggestion) {
	        document.querySelector('h2').textContent = '';
	    });
		

 */