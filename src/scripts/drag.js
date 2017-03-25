var $container = $("#container");
var boxWidth = 50, boxHeight = 50;
var gridWidth = 196/2, gridHeight = 150, gridRows = 2, gridColumns = 8, i, x, y;
var currentQuestion = 0;
var questions = [
	{question:"How can you get an infection?",
	numAnswers:4,
	objects:["eggplant", "cat", "peach", "tongue", "hand"],
	answers:["41","12","23","34"]},
	{question:"Test question?",
	numAnswers:3,
	objects:["cat", "tongue", "eggplant", "hand"],
	answers:["41","12","23"]},
	{question:"Test question 2?",
	numAnswers:2,
	objects:["hand", "talk", "spoon", "kiss", "cat"],
	answers:["31","12","23","53","13"]},
]

function imgClicked(i) {
	console.log(i);
}

function setup() {
	var objects =["cat", "cat", "cat", "cat", "cat", "cat", "cat", "cat"];
	//loop through and create the grid (a div for each cell). Feel free to tweak the variables above
	for (i = 0; i < gridColumns; i++) {
		x = (i * gridWidth) % (gridColumns * gridWidth) + ((gridWidth - boxWidth) / 2);
		y = Math.floor(i / gridColumns) * gridHeight + ((gridHeight - boxHeight) / 2);
		$("<img/>").attr("id","i"+i).attr("src", "img/"+objects[i]+".png")
			.css({position:"absolute", top:y, left:x, width:50, height:50})
			//.click(function(x){imgClicked(x)}.bind(this, i))
			.prependTo($container);
	}
	for (i = 0; i < gridRows * gridColumns; i++) {
		x = (i * gridWidth) % (gridColumns * gridWidth) + ((gridWidth - boxWidth) / 2);
		y = Math.floor(i / gridColumns) * gridHeight + ((gridHeight - boxHeight) / 2);
		if (i < gridColumns)
			$("<div/>").attr("id","a"+(i)).css({position:"absolute", border:"3px solid #454545", width:boxWidth-1, height:boxHeight-1, top:y, left:x}).prependTo($container);
		else
			$("<div/>").attr("id","q"+(i-gridColumns)).css({position:"absolute", border:"3px solid #454545", width:boxWidth-1, height:boxHeight-1, top:y, left:x}).prependTo($container);
	}

	//set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
	TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
	TweenLite.set(".box", {width:50, height:50});
	startQuestion(0);
}

function startQuestion(index) {
	var x, y;
	var question = questions[index];
	var numObjects = questions[index].objects.length;
	//console.log(question);
	$(".box").remove();
	$(".question").text(question.question);
	// Set answer boxes
	for (var i = 0; i < gridColumns; i++) {
		x = (i * gridWidth) % (gridColumns * gridWidth) + ((gridWidth - boxWidth) / 2);
		x += (gridColumns - question.numAnswers) * gridWidth / 2;
		y = ((gridHeight - boxHeight) / 2);
		if (i < question.numAnswers)
			$("#a" + i).show().css({left:x, top:y});
		else
			$("#a" + i).hide();

		x = (i * gridWidth) % (gridColumns * gridWidth) + ((gridWidth - boxWidth) / 2);
		x += (gridColumns - numObjects) * gridWidth / 2;
		y = gridHeight + ((gridHeight - boxHeight) / 2);
		if (i < numObjects) {
			$("#q" + i).show().css({left:x, top:y});
			$("#i" + i).show().css({left:x, top:y}).attr("src", "img/"+question.objects[i]+".png").css({left:x, top:y});
			$("<img/>").attr("class","box").attr("src", "img/"+question.objects[i]+".png")
				.css({position:"absolute", top:y, left:x, width:50, height:50})
				.appendTo($container);
		}
		else {
			$("#q" + i).hide();
			$("#i" + i).hide();
		}
	}
	update();
}

//the update() function is what creates the Draggable according to the options selected (snapping).
function update() {
  var snap = false, liveSnap = false;
	Draggable.create(".box", {
		bounds:$container,
		edgeResistance:0.65,
		type:"x,y",
		throwProps:false,
		liveSnap:liveSnap,
		snap:{
			x: function(endValue) {
				return (snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
			},
			y: function(endValue) {
				return (snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
			}
		}
	});
}

function nextQuestion() {
	currentQuestion++;
	if (currentQuestion >= questions.length)
		currentQuestion = 0;
	startQuestion(currentQuestion);
}

setup();
update();
