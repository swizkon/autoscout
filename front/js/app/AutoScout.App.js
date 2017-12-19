/**
 * Utils dd
 */
jQuery.fn.toObservable = function (eventName, selector) {
	return Rx.Observable.fromEvent(this, eventName, selector);
};

var api = (function () {

	var baseUrl = "../data";

	baseUrl = "http://localhost:3004";

	return {
		"pads": {

			"createPad": function (title, owner) {
				var pad = {
					"id": new Date().getTime() + "-" + Math.floor(Math.random() * 1000000),
					"title": title,
					"owner": owner,
					"collaborators": [owner]
				};

				return $.ajax({
					url: baseUrl + '/books',
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify(pad)
				}).promise();
			},

			"padsByOwner": function (username) {
				return $.ajax({ url: baseUrl + '/users?key=' + encodeURI(username) }).promise();
			}
		}
	};

} ());



// Flow and such

var event$ = new Rx.Subject();

var createdPad$ = event$.filter(f => f["PadCreated"]).map(d => d["PadCreated"]);

event$.onNext({
	"PadCreated": {
		"title": "My new pad",
		"id": "12345-999"
	}
});
event$.onNext({
	"PadCreated": {
		"title": "My new pad",
		"id": "23456-666"
	}
});
event$.onNext({
	"PadCreated": {
		"title": "My new pad",
		"id": "12345-999"
	}
});

var loginView = new Vue({
	el: '#app-login-view',
	data: {
		loginRequired: true,
		loginStatus: null,
		loginHash: 'Waiting for value...',
		gravatarSrc: ''
	}
});


var usernameChange$ = $('#app-login-view form input').toObservable('keyup');

usernameChange$.delay(300)
			   .map(function(evt){
					return evt.target.value;
				})
				.distinctUntilChanged()
				.subscribe(function (d) {
					console.log(d);
					var hash = CryptoJS.MD5(d);
					loginView.gravatarSrc = 'https://www.gravatar.com/avatar/' + CryptoJS.MD5(d).toString();
					loginView.loginHash = hash.toString();
				});


var login$ = Rx.Observable.create(function (observer) {

	$('#app-login-view form').on('submit', function () {
		loginView.loginStatus = 'inprog';
		var f = this;
		var inp = $(f).find('input');

		var doley = Rx.Observable.fromPromise(api.pads.padsByOwner(inp.val()));

		doley.subscribe(function (data) {
			loginView.loginStatus = 'done';
			loginView.loginRequired = false;

			observer.onNext(data);
		});

		return false;
	});
});

login$.subscribe(function (d) {
	console.log(d);
	mainView.pads = d;
	mainView.authenticated = true;
});



var createdPad$ = Rx.Observable.create(function (observer) {

	$('#app-main-view form').on('submit', function () {
		var f = this;
		var inp = $(f).find('input');
		alert('Form');
		return false;
	});
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

var booksView = new Vue({
	el: '#app-book-view',
	data: {
		books: [],
		selectedBook: { "title": "null" }
	},
	methods: {
		selectBook: function (e) {
			console.log(e);
			this.selectedBook = this.books.filter(function (b) { return b.id === e.target.dataset["bookid"] })[0];
			console.log(this.selectedBook);
			$(document).trigger({
				"type": "bookSelected",
				"book": this.selectedBook
			});
		},
		deleteBook: function(e){
			console.log(e);
			var selectedBook = this.books.filter(function (b) { return b.id === e.target.dataset["bookid"] })[0];
			this.books = this.books.filter(function(b) {return b.id !== e.target.dataset["bookid"] });

			$(document).trigger({
				"type": "bookDeleted",
				"book": selectedBook
			});
		}
	}
});

var tick$ = Rx.Observable.interval(100)
	.take(5)
	.map(function (t) { return new Date().getTime() });

var addedBook$ = new Rx.Subject();
var removedBook$ = new Rx.Subject();

var book$ = Rx.Observable.merge(addedBook$, removedBook$);

tick$.subscribe(function (tick) {
	var id = tick.toString();
	var book = { "id": id, "title": "Book " + id };
	addedBook$.onNext(book);
});


book$.subscribe(function (book) {
	booksView.books.push(book);
});

var tick2$ = Rx.Observable.interval(2000)
	.map(function (t) { return new Date().getTime() });

var clickStream = Rx.Observable.fromEvent($(document), 'bookSelected');
clickStream.subscribe(console.log);
