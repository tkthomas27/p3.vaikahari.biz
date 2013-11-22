$( document ).ready(function() {



//***************************************
//form
//***************************************
	

	// set sections to be accordions; collapsible means they can all be closed at once
	$(function() {
		$( "#accordioniccvar" ).accordion({
			collapsible: true
		});
		$( "#accordionwaccvar" ).accordion({
			collapsible: true
		});
		$( "#accordionwacc" ).accordion({
			collapsible: true
		});
		$( "#accordioniccoj" ).accordion({
			collapsible: true
		});
		$( "#accordioniccmpeg" ).accordion({
			collapsible: true
		});
		$( "#accordioniccg" ).accordion({
			collapsible: true
		});
	});

	// allow accordions to be sorted within their sections; placeholder displays a yellow block were an accordion can be dropped
	$(function() {
		$( "#sortablewacc" ).sortable({
			placeholder: "ui-state-highlight",
		});

		$( "#sortablewacc" ).disableSelection();


		$( "#sortableicc" ).sortable({
			placeholder: "ui-state-highlight",

		});

		$( "#sortableicc" ).disableSelection();
	});

  $(function() {
    $( "#radio" ).buttonset();
  });

//***************************************
//functionality
//***************************************

	var csshares = parseInt($('#csshares').val(), 10);
	var csprice = parseInt($('#csprice').val(), 10);
	var csct = parseInt($('#csct').val(), 10);

	var psshares = parseInt($('#psshares').val(), 10);
	var psprice = parseInt($('#psprice').val(), 10);
	var psct = parseInt($('#psct').val(), 10);

	var bshares = parseInt($('#bshares').val(), 10);
	var bprice = parseInt($('#bprice').val(), 10);
	var bct = parseInt($('#bct').val(), 10);


$("input[name='radio']").change(function () {

	if ($("#radioapple").click(function() {

		$('#csshares').val("100000");
		$('#csprice').val("100000");
		$('#csct').val("100000");

		$('#psshares').val("100000");
		$('#psprice').val("100000");
		$('#psct').val("100000");

		$('#bshares').val("100000");
		$('#bprice').val("100000");
		$('#bct').val("100000");

		var csct = parseInt($('#csct').val(), 10);
		var psct = parseInt($('#psct').val(), 10);
		var bct = parseInt($('#bct').val(), 10);
		var mvic = csct+psct+bct;
		var csctweight = parseFloat(csct/mvic).toFixed(2);
		var psctweight = parseFloat(psct/mvic).toFixed(2);
		var bctweight = parseFloat(bct/mvic).toFixed(2);

		$('#ctt').html(mvic);
		$('#csctweight').html(csctweight);
		$('#psctweight').html(psctweight);
		$('#bctweight').html(bctweight);

	}));

	if ($("#radiogoogle").click(function() {
		$('#csshares').val("200000");
		$('#csprice').val("200000");
		$('#csct').val("200000");

		$('#psshares').val("200000");
		$('#psprice').val("200000");
		$('#psct').val("200000");

		$('#bshares').val("200000");
		$('#bprice').val("200000");
		$('#bct').val("200000");

		var csct = parseInt($('#csct').val(), 10);
		var psct = parseInt($('#psct').val(), 10);
		var bct = parseInt($('#bct').val(), 10);
		var mvic = csct+psct+bct;
		var csctweight = parseFloat(csct/mvic).toFixed(2);
		var psctweight = parseFloat(psct/mvic).toFixed(2);
		var bctweight = parseFloat(bct/mvic).toFixed(2);

		$('#ctt').html(mvic);
		$('#csctweight').html(csctweight);
		$('#psctweight').html(psctweight);
		$('#bctweight').html(bctweight);

	}));

	if ($("#radiomicrosoft").click(function() {
		$('#csshares').val("300000");
		$('#csprice').val("230000");
		$('#csct').val("230000");

		$('#psshares').val("300000");
		$('#psprice').val("300000");
		$('#psct').val("300000");

		$('#bshares').val("300000");
		$('#bprice').val("300000");
		$('#bct').val("230000");

		var csct = parseInt($('#csct').val(), 10);
		var psct = parseInt($('#psct').val(), 10);
		var bct = parseInt($('#bct').val(), 10);
		var mvic = csct+psct+bct;
		var csctweight = parseFloat(csct/mvic).toFixed(2);
		var psctweight = parseFloat(psct/mvic).toFixed(2);
		var bctweight = parseFloat(bct/mvic).toFixed(2);

		$('#ctt').html(mvic);
		$('#csctweight').html(csctweight);
		$('#psctweight').html(psctweight);
		$('#bctweight').html(bctweight);

	}));

});





});



















