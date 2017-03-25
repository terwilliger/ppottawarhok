var $container = $("#container");
var $paletteArea = $("#paletteArea");
var $answerArea = $("#answerArea");
var maxAnswers = 6;
var maxAnswerSlots = 3;
var i, x, y;
var currentQuestion = 0;
var palette = [{image:"Cat", text:"Vagina"},
{image:"Tongue", text:"Tongue"},
{image:"Eggplant", text:"Penis"},
{image:"Look", text:"Inspection"},
{image:"InternalCondom", text:"Internal Condom"},
{image:"Peach", text:"Anus"},
{image:"Cucumber", text:"Bumps"},
{image:"Needle", text:"Blood Test"},
{image:"Kissing", text:"Kissing"},
{image:"Discharge", text:"Discharge"},
{image:"Hand", text:"Hand"},
{image:"DentalDam", text:"Dental Dam"},
{image:"PeeBottle", text:"Urine Test"},
{image:"Burning", text:"Burning"},
{image:"Abstinence", text:"Abstinence"},
{image:"Medicine", text:"Medication"},
{image:"Managed", text:"Managed Infection"},
{image:"Swab", text:"Swab Test"},
{image:"BodyFight", text:"Fight Infection"},
{image:"ExternalCondom", text:"External Condom"},
{image:"Lube", text:"Lube"},
{image:"Spoon", text:"Spooning"},
{image:"Communication", text:"Communication"},
{image:"NoSymptoms", text:"No Symptoms"},
{image:"Testing", text:"Testing"}];
var questions = [
	{question:"How can you get a sexually transmitted infection?",
	numAnswers:6,
	answers:[["41","41"],["41","41"],["41","41"],["12","41"],["23","41"],["34","41"]]},
	{question:"How do you get tested for sexually transmitted infections?",
	numAnswers:3,
	answers:[["41"],["12"],["23"]]},
	{question:"What if you have a sexually transmitted infection?",
	numAnswers:3,
	answers:[["53"],["53"],["13"]]},
	{question:"What are the most common symptoms of HPV?",
	numAnswers:3,
	answers:[["53"],["13"],["13"]]},
	{question:"What are the most common symptoms of herpes?",
	numAnswers:3,
	answers:[["31"],["12"],["23"]]},
	{question:"What are the most common symptoms of chlamydia and gonorrhea?",
	numAnswers:3,
	answers:[["23"],["53"],["13"]]},
	{question:"How can you reduce the risk of contracting an STI?",
	numAnswers:3,
	answers:[["23"],["53"],["13"]]},
]

function setup() {
	var i, j, x = 0, y = 0;
	//$(".paletteItem").remove();
	for (i = 0; i < palette.length; i++) {
		$("<img/>").attr("id","p"+i).attr("class","paletteItem").attr("src", "img/"+palette[i].image+".svg").attr("alt", palette[i].text)
			.appendTo($paletteArea);
	}
	for (i = 0; i < palette.length; i++) {
		x = $("#p"+i).position().left;
		y = $("#p"+i).position().top;
		$("<img/>").attr("class","box paletteItem").attr("src", "img/"+palette[i].image+".svg")
			.css({position:"absolute", left:x, top:y})
			.appendTo($paletteArea);
	}

	for (i = 0; i < maxAnswers; i++) {
		$("<div/>").attr("id","a"+i).attr("class","answerBox").appendTo($answerArea);
		for (j = 0; j < maxAnswerSlots; j++) {
			$("<div/>").attr("id","as"+i+j).attr("class","answerSlot").appendTo($("#a"+i));
		}
		$("<div/>").attr("id","as"+i+j).attr("class","answerIndicator").appendTo($("#a"+i));
	}

	//TweenLite.set($container, {height: 800, width: 600});
	//TweenLite.set(".box", {width:50, height:50});
	startQuestion(0);
}

function startQuestion(index) {
	var x, y;
	var question = questions[index];
	//$(".box").remove();
	$(".question").text(question.question);
	// Set answer boxes
	for (var i = 0; i < maxAnswers; i++) {
		if (i < question.numAnswers) {
			$("#a" + i).show();
			for (j = 0; j < maxAnswerSlots; j++) {
				if (j < question.answers[i].length)
					$("#as"+i+j).show();
				else
					$("#as"+i+j).hide();
			}
		}
		else
			$("#a" + i).hide();
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
				return endValue;//(snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
			},
			y: function(endValue) {
				return endValue;//(snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
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
