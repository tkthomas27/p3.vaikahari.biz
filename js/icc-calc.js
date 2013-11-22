  $(function() {
	$( "#accordionone" ).accordion();
	$( "#accordiontwo" ).accordion();
	$( "#accordionthree" ).accordion();
	$( "#accordionfour" ).accordion();
	$( "#accordionfive" ).accordion();
	$( "#accordionsix" ).accordion();
  });

	$(function() {
	$( "#accordiontwo" ).accordion();
  });

   $(function() {
	$( "#sortable" ).sortable({
	  revert: true
	});
	// $( "#draggable" ).draggable({
	//   connectToSortable: "#sortable",
	//   helper: "clone",
	//   revert: "invalid"
	// });
	$( "ul, li" ).disableSelection();
  });

