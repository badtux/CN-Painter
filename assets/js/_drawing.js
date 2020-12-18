	//Create canvas
	var canvas = document.getElementById('myCanvas');
	var canvasOL = document.getElementById('myCanvasOL');

	//canvas.width = 903;
	//canvas.height = 657;
	var parent = document.getElementById("canvasarea");
	//canvas.width = parent.offsetWidth;
	//canvas.height = parent.offsetHeight;

	console.log('canvas '+canvas.width+ ' '+canvas.height);

	//canvasOL.width = parent.offsetWidth;;
	//canvasOL.height = parent.offsetHeight;

	console.log('canvasOL '+canvasOL.width+ ' '+canvasOL.height);

	var ctx = canvas.getContext('2d');
	var ctxOL = canvasOL.getContext('2d');

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var background = new Image();
	//background.src = "assets/images/paint.png";
	background.src = "https://images.vexels.com/media/users/3/156810/isolated/preview/dcdab5fa2f9081316ef782743b4448e6-lotus-flower-outline-icon-by-vexels.png";
	background.onload = function(){
	    ctxOL.drawImage(background,0,0,canvasOL.width, canvasOL.height);   
	}

	//Lines is default
	lines();

	function lines() {
		console.log('drawing lines');

		//Initialize mouse coordinates to 0,0
		var mouse = { x: 0, y: 0};

		//Paint includes line width, line cap, and color
		paint = function() {
			console.log('painting '+mouse.x+' '+mouse.y);
			
			ctx.lineTo(mouse.x, mouse.y);
			ctx.lineWidth = lineWidthRange();
			ctx.lineJoin = 'round';
			ctx.lineCap = brushstyle;
			ctx.strokeStyle = colors;
			ctx.stroke();
		};

		//Find mouse coordinates relative to canvas
		linesMousemove = function(e){
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
		};

		//User clicks down on canvas to trigger paint
		linesMousedown = function(){
			ctx.beginPath();
			ctx.moveTo(mouse.x, mouse.y);
			canvasOL.addEventListener('mousemove', paint, false);
		};

		//When mouse lifts up, line stops painting
		linesMouseup = function(){
			canvasOL.removeEventListener('mousemove', paint, false);
		};

		//When mouse leaves canvas, line stops painting
		linesMouseout = function() {
			canvasOL.removeEventListener('mousemove', paint, false);
		};

		//Event listeners that will trigger the paint functions when
		//mousedown, mousemove, mouseup, mouseout
		canvasOL.addEventListener('mousedown', linesMousedown, false);
		canvasOL.addEventListener('mousemove', linesMousemove, false);
		canvasOL.addEventListener('mouseup', linesMouseup, false);
		canvasOL.addEventListener('mouseout', linesMouseout, false);

	};

	//Color palette
	var colors;
	function changeColors(palette) {
		switch(palette.id) {
			case "red":
				colors = "red";
				break;
			case "red1":
				colors = "#F16161";
				break;
			case "red2":
				colors = "#F69FA0";
				break;
			case "orange":
				colors = "orange";
				break;
			case "orange1":
				colors = "#F99F62";
				break;
			case "orange2":
				colors = "#FBB57B";
				break;
			case "blue":
				colors = "#09C2DB";
				break;
			case "blue1":
				colors = "#8BD3DC";
				break;
			case "blue2":
				colors = "#B9E3E8";
				break;
			case "indigo":
				colors = "#0E38AD";
				break;
			case "indigo1":
				colors = "#546AB2";
				break;
			case "indigo2":
				colors = "#9C96C9";
				break;
			case "green":
				colors = "green";
				break;
			case "green1":
				colors = "#97CD7E";
				break;
			case "green2":
				colors = "#C6E2BB";
				break;
			case "black":
				colors = "black";
				break;
			case "black1":
				colors = "#545454";
				break;
			case "black2":
				colors = "#B2B2B2";
				break;
			case "yellow":
				colors = "yellow";
				break;
			case "yellow1":
				colors = "#F7F754";
				break;
			case "yellow2":
				colors ="#F7F4B1";
				break;
			case "purple":
				colors = "#B9509E";
				break;
			case "purple1":
				colors = "#D178B1";
				break;
			case "purple2":
				colors = "#E3ABCE";
				break;
			case "erase":
				colors = "white";
				break;
		}

		console.log(colors);
	};

	//Change brush style
	var brushstyle;
	function changeBrushStyle(obj) {
		switch(obj.id) {
			case "round":
				brushstyle = "round";
				break;

			case "square":
				brushstyle = "butt";
				break;
		}

		console.log(brushstyle);
	};

	//Change line width
	function lineWidthRange() {
	    var widthLine = document.getElementById("myRange").value;
	    return widthLine;
	};

	//Clear canvas
	function erase() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	function thankYouShareNow(){
		console.log('11');
		$('#modalThankYou').modal('show');
	}

	function submitArtwork() {
		var childName = $('#childName').val();
		var childAge = $('#childAge').val();
		var parentNo = $('#parentNo').val();

		var canvas = document.getElementById("myCanvas");
		//Convert image to 'octet-stream' (Just a download, really)
		//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
		//window.location.href = image;
		var imgBase64 = canvas.toDataURL(); 

		var fd = new FormData();
		fd.append('parentNo', parentNo);
		fd.append('childName', childName);
		fd.append('childAge', childAge);
		fd.append('painting', imgBase64);

		$.ajax({
		    type: 'POST',
		    url: 'up.php',
		    data: fd,
		    processData: false,
		    contentType: false
		}).done(function(data) {
			console.log('10');
			$('#modalSubmissionForm').modal('hide');

			var shareButton = document.getElementById('shareBtn');
			shareButton.addEventListener('click', function (e) {
				FB.ui({
				    display: 'popup',
				    method: 'share',
				    href: data.share_url,
				  }, function(response){});	
			});

			console.log('uploaded.');
		});
	}

	$(document).ready(function(){
		$.ajaxSetup({ cache: true });
		$.getScript('https://connect.facebook.net/en_US/sdk.js', function(e){
			FB.init({
				appId: '1294688194235622',
			    version: 'v2.7' // or v2.1, v2.2, v2.3, ...
			});
		});

		var button = document.getElementById('btn-finish');
		button.addEventListener('click', function (e) {
			console.log('1');
			$('#modalSubmissionForm').on('shown.bs.modal', function () {
				$('#childName').trigger('focus');
				console.log('2');
				var button = document.getElementById('submitSuperPainting');
				button.addEventListener('click', function (e) {
					console.log('3');
					submitArtwork();
				});
			});

			$('#modalSubmissionForm').modal('show');
			console.log('4');

			$('#modalSubmissionForm').on('hidden.bs.modal', function (e) {
				console.log('5');
				thankYouShareNow();
			});
		});
	});