$( document ).ready(function() {



	//************************************************************************************************************************************
	//jQuery
	//************************************************************************************************************************************
	
	// set sections to be accordions; collapsible means they can all be closed at once
	$(function() {

		// set major divs as accordions; all accordions are collapsible
		$( ".accordion" ).accordion({
			collapsible: true,
			heightStyle: "content"
		});

	});

	// allow accordions to be sorted within their sections; placeholder displays a yellow block were an accordion can be dropped
	$(function() {

		//set major divs to sortable; leave a yellow placeholder for positions
		$( ".sortable" ).sortable({
			placeholder: "ui-state-highlight",
		});

	});


	//radio button functionality
	$(function() {

		$( "#radio" ).buttonset();

	});

	$(function() {

		$( ".radio" ).buttonset();

	});


	//modal box with rules 
	$(function() {

		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 600,
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});

		$( "#opener" ).click(function() {
			$( "#dialog" ).dialog( "open" );
		});
	});

	//modifies animation used below in if statements - used in order to draw attention to incorrect fields
	$.fn.animateHighlight = function(highlightColor, duration) {
		var highlightBg = highlightColor || "#FFFF9C";
		var animateMs = duration || 1500;
		var originalBg = this.css("backgroundColor");
		this.stop().css("background-color", highlightBg).animate({backgroundColor: originalBg}, animateMs);
	};

	//************************************************************************************************************************************
	//functionality
	//************************************************************************************************************************************

	//define the primary calculator
	function calc(){

			//define variables for common share component totals
			var csct = parseFloat($('#csct').val(), 10);
			//define variables for preferred share component totals
			var psct = parseFloat($('#psct').val(), 10);
			//define variables for bond component totals
			var bct = parseFloat($('#bct').val(), 10);

			//define variable for risk free rate
			var rf = parseFloat($('#rf').val(), 10);
			//define variable for equity risk premium
			var rpe = parseFloat($('#rpe').val(), 10);
			//define variable for tax rate
			var tax = parseFloat($('#tax').val(), 10);
			//define variable for the size risk premium
			var rps = parseFloat($('#rps').val(), 10);
			//define variable for industry risk premium
			var rpi = parseFloat($('#rpi').val(), 10);
			//define variable for company specific risk premium
			var rpu = parseFloat($('#rpu').val(), 10);
			//define variable for company's beta
			var beta = parseFloat($('#beta').val(), 10);
			//define variable for cumulative non-particpating dividend
			var cnd = parseFloat($('#cnd').val(), 10);
			//define variable for preferred price per share
			var pps = parseFloat($('#pps').val(), 10);
			//define variable for cost of debt
			var kdpt = parseFloat($('#kdpt').val(), 10);

			//variable for combined component totals 
			var mvic = csct+psct+bct;
			//common share weight variable
			var csctweight = parseFloat(csct/mvic).toFixed(4);
			//preferred stock weight variable
			var psctweight = parseFloat(psct/mvic).toFixed(4);
			//bond weight variable
			var bctweight = parseFloat(bct/mvic).toFixed(4);
			//variable for cost of equity in the build up model

			var kebum = parseFloat(rf+rpe+rps+rpu).toFixed(4);
			//variable for the cost of equity in the capm
			var kecapm = parseFloat(rf+(beta*rpe)+rps+rpu).toFixed(4);

			//variable for the cost of preferred equity
			var kpe = parseFloat(cnd/pps).toFixed(4);

			//icc market equity variable
			var meq = parseFloat($('#meq').val(), 10);
			//icc gamma variable
			var gamma = parseFloat($('#gamma').val(), 10);
			//icc expected earnings year one plus
			var eeone = parseFloat($('#eeone').val(), 10);
			//icc expected earnings year two plus
			var eetwo = parseFloat($('#eetwo').val(), 10);
			//icc expected earnings year three plus
			var eethree = parseFloat($('#eethree').val(), 10);
			//icc expected earnings year four plus
			var eefour = parseFloat($('#eefour').val(), 10);
			//icc expected earnings year five plus
			var eefive = parseFloat($('#eefive').val(), 10);
			//icc expected dividends year one plus
			var edone = parseFloat($('#edone').val(), 10);

			//icc calculation variables
			var oja = parseFloat(0.5*((gamma-1)+(edone/meq))).toFixed(4);
			var ojg = parseFloat(0.5*(((eethree-eetwo)/eetwo)+((eefive-eefour)/eefour))).toFixed(4);
			var icc = parseFloat(oja + Math.sqrt(Math.pow(oja,2)+(eeone/meq)*(ojg-(gamma-1)))).toFixed(4);

			//prevent blanks from being input
			if($.trim($("#csct").val()) === "" || $.trim($("#psct").val()) === "" || $.trim($("#bct").val()) === "" || $.trim($("#rf").val()) === "" || $.trim($("#rpe").val()) === "" || $.trim($("#tax").val()) === "" || $.trim($("#rps").val()) === "" || $.trim($("#rpi").val()) === "" || $.trim($("#rpu").val()) === "" || $.trim($("#beta").val()) === "" || $.trim($("#cnd").val()) === "" || $.trim($("#pps").val()) === "" || $.trim($("#kdpt").val()) === "" || $.trim($("#meq").val()) === "" || $.trim($("#gamma").val()) === "" || $.trim($("#eeone").val()) === "" || $.trim($("#eetwo").val()) === "" || $.trim($("#eethree").val()) === "" || $.trim($("#eefour").val()) === "" || $.trim($("#eefive").val()) === "" || $.trim($("#edone").val()) === "")
			{
				alert("Blanks are not allowed");
				return false;
			}

			//prevent component totals from being below zero
			if(csct<0 || psct<0 || bct<0)
			{
				alert("Component Totals cannot be below zero");
				$("#divcomponents").animateHighlight("#dd0000", 1000);
				return false;
			}

			//prevent all components from being zero
			if(csct===0 && psct===0 && bct===0)
			{
				alert("One component must be above zero!");
				$("#divcomponents").animateHighlight("#dd0000", 1000);
				return false;
			}

			//prevent icc variables from being less than zero
			if(meq<=0 || eeone<=0 || eetwo<=0 || eethree<=0 || eefour<=0 || eefive<=0 || edone<=0)
			{
				alert("ICC variables (except growth rate) cannot be below zero");
				$("#iccvarsone").animateHighlight("#dd0000", 1000);
				$("#iccvarstwo").animateHighlight("#dd0000", 1000);
				return false;
			}

			//in the preset companies, there is no prefered equity. to prevent NaN from dividing by zero, we eliminate the preferred equity component of the calculations
			if (pps===0)
			{
				var kpe = 0;
				var waccbum = parseFloat((kebum*csctweight)+(kdpt*(1-tax)*bctweight)).toFixed(4);
				var wacccapm = parseFloat((kecapm*csctweight)+(kdpt*(1-tax)*bctweight)).toFixed(4);
				$('#kpe').html(kpe);
				$('#waccbum').html(waccbum);
				$('#wacccapm').html(wacccapm);
			}

			//go as normal
			else
			{
				var waccbum = parseFloat((kebum*csctweight)+(kpe*psctweight)+(kdpt*(1-tax)*bctweight)).toFixed(4);
				var wacccapm = parseFloat((kecapm*csctweight)+(kpe*psctweight)+(kdpt*(1-tax)*bctweight)).toFixed(4);
				$('#kpe').html(kpe);
				$('#waccbum').html(waccbum);
				$('#wacccapm').html(wacccapm);
			}

			//display the results
			$('#csctweight').html(csctweight);
			$('#psctweight').html(psctweight);
			$('#bctweight').html(bctweight);

			$('#kebum').html(kebum);
			$('#kecapm').html(kecapm);

			$('#oja').html(oja);
			$('#ojg').html(ojg);
			$('#icc').html(icc);

	}

	//define a google preload function when the page is loaded
	function google(){
			//common shares component
			$('#csct').val("83");
			//preferred equity component
			$('#psct').val("0");
			//bond component
			$('#bct').val("5.2");

			//risk free rate
			$('#rf').val(".035");
			//market return
			$('#rpe').val(".1342");
			//tax rate
			$('#tax').val(".4");


			//size risk premium
			$('#rps').val("0.74");
			//industry risk premium
			$('#rpi').val(".1");

			//company spcecific risk premium
			$('#rpu').val(".052");
			//beta
			$('#beta').val(".92");
			//cumulative non participating dividend
			$('#cnd').val("0");
			//price of preferred stock
			$('#pps').val("0");
			//cost of debt
			$('#kdpt').val(".05");

			//icc variables
			$('#meq').val("353.8");
			$('#gamma').val(".03");
			$('#eeone').val("11.59");
			$('#eetwo').val("11.49");
			$('#eethree').val("11.2");
			$('#eefour').val("11.08");
			$('#eefive').val("10.8");
			$('#edone').val("15");

			//call the variables
			calc();
	}

	//when the page is loaded, load the google preset
	window.onload = function preload(){
		$("#radiogoogle").click();
	};


	//when the radio buttons are changed, change the preset values
	$("input[name='radio']").change(function () {

		if ($("#radioapple").click(function() {

			//common shares component
			$('#csct').val("123.5");
			//preferred equity component
			$('#psct').val("0");
			//bond component
			$('#bct').val("17");

			//risk free rate
			$('#rf').val(".035");
			//equity risk premium
			$('#rpe').val(".1342");
			//tax rate
			$('#tax').val(".4");

			//size risk premium
			$('#rps').val("0.74");
			//industry risk premium
			$('#rpi').val(".1");

			//company spcecific risk premium
			$('#rpu').val(".057");
			//beta
			$('#beta').val(".88");
			//cumulative non participating dividend
			$('#cnd').val("0");
			//price of preferred stock
			$('#pps').val("0");
			//cost of debt
			$('#kdpt').val(".05");

			//icc variables
			$('#meq').val("471.23");
			$('#gamma').val(".03");
			$('#eeone').val("12.59");
			$('#eetwo').val("11.49");
			$('#eethree').val("11.0");
			$('#eefour').val("10.88");
			$('#eefive').val("10.4");
			$('#edone').val("16");

			//call the variables
			calc();

		}));

		if ($("#radiogoogle").click(google()

			));

		if ($("#radiomicrosoft").click(function() {

			//common shares component
			$('#csct').val("81.6");
			//preferred equity component
			$('#psct').val("0");
			//bond component
			$('#bct').val("15.9");

			//risk free rate
			$('#rf').val(".035");
			//market return
			$('#rpe').val(".1342");
			//tax rate
			$('#tax').val(".4");

			//size risk premium
			$('#rps').val("0.74");
			//industry risk premium
			$('#rpi').val(".1");

			//company spcecific risk premium
			$('#rpu').val(".059");
			//beta
			$('#beta').val(".87");
			//cumulative non participating dividend
			$('#cnd').val("0");
			//price of preferred stock
			$('#pps').val("0");
			//cost of debt
			$('#kdpt').val(".05");

			//icc variables
			$('#meq').val("313.49");
			$('#gamma').val(".03");
			$('#eeone').val("10.29");
			$('#eetwo').val("10.09");
			$('#eethree').val("9.98");
			$('#eefour').val("9.90");
			$('#eefive').val("9.87");
			$('#edone').val("16");

			//call the variables
			calc();

		}));

	});


	$('button').click(function(){

		//perform calculation
		calc();

	});

	//************************************************************************************************************************************
	//plugins
	//************************************************************************************************************************************

	//TexoTela Numeric Plugin for preventing the entering of non-numeric inputs
	$(".inputbox").keydown(function(event) {
		// Allow: backspace, delete, tab, escape, enter, -, and .
		if ( $.inArray(event.keyCode,[46,8,9,27,13,190,109,189,45]) !== -1 ||
			// Allow: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			// Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
		}
		else {
			// Ensure that it is a number and stop the keypress
			if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				event.preventDefault();
			}
		}
	});


});