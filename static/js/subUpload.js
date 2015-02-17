(function() {
    console.log($('#exampleInputFile'));

    function processForm(e) {
    	if (e.preventDefault) e.preventDefault();
	    /* do what you want with the form */
	    console.log('uploaded');
	    // You must return false to prevent the default form behavior
	    return false;
	}

	var form = $('.my-form');
	if (form.attachEvent) {
	    form.attachEvent("submit", processForm);
	} else {
	    form.addEventListener("submit", processForm);
	}

	// $( ".exampleInputFile" ).change(function() {
	//   console.log( "Handler for .change() called." );
	// });
})();
