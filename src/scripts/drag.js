var $container = $("#container");
var $paletteArea = $("#paletteArea");
var $answerArea = $("#answerArea");
var maxAnswers = 6;
var maxAnswerSlots = 3;
var i, x, y;
var currentQuestion = 0;
var currentItem = -1;
var currentSlot = "";
var palette = [{image:"Cat", text:"Vulva"},
{image:"Tongue", text:"Mouth"},
{image:"Eggplant", text:"Penis"},
{image:"Look", text:"Inspection"},
{image:"InternalCondom", text:"Internal Condom"},
{image:"Peach", text:"Anus"},
{image:"Bumps", text:"Bumps"},
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
	answers:[["Tongue","Eggplant"],["Tongue","Cat"],["Tongue","Peach"],["Eggplant","Cat"],["Cat","Cat"],["Eggplant","Peach"]]},
	{question:"How do you get tested for sexually transmitted infections?",
	numAnswers:4,
	answers:[["PeeBottle"],["Swab"],["Look"],["Needle"]]},
	{question:"What if you have a sexually transmitted infection?",
	numAnswers:3,
	answers:[["Managed"],["BodyFight"],["Medicine"]]},
	{question:"What are the most common symptoms of HPV?",
	numAnswers:3,
	answers:[["NoSymptoms"],["Bumps"],["Testing"]]},
	{question:"What are the most common symptoms of herpes?",
	numAnswers:3,
	answers:[["NoSymptoms"],["Bumps"],["Burning"]]},
	{question:"What are the most common symptoms of chlamydia and gonorrhea?",
	numAnswers:3,
	answers:[["NoSymptoms"],["Discharge"],["Burning"]]},
	{question:"How can you reduce the risk of contracting an STI?",
	numAnswers:4,
	answers:[["Abstinence"],["DentalDam"],["InternalCondom"],["ExternalCondom"]]},
]

function setup() {
	var i, j, x = 0, y = 0;
	//$(".paletteItem").remove();
	for (i = 0; i < palette.length; i++) {
		$("<img/>").attr("id","p"+i).attr("class","paletteItem nonDraggableImage").attr("src", "img/"+palette[i].image+".svg").attr("alt", palette[i].text)
			.attr("title", palette[i].text)
			.appendTo($paletteArea);
	}
	for (i = 0; i < palette.length; i++) {
		x = $("#p"+i).position().left;
		y = $("#p"+i).position().top;
		$("<img/>").attr("class","box paletteItem").attr("id",palette[i].image).attr("src", "img/"+palette[i].image+".svg")
			.attr("title", palette[i].text)
			.css({position:"absolute", left:x, top:y})
			.appendTo($paletteArea);
	}

	for (i = 0; i < maxAnswers; i++) {
		$("<div/>").attr("id","a"+i).attr("class","answerBox").appendTo($answerArea);
		for (j = 0; j < maxAnswerSlots; j++) {
			$("<div/>").attr("id","as"+i+j).attr("class","answerSlot")
				.appendTo($("#a"+i));
		}
		$("<div/>").attr("id","ai"+i).attr("class","answerIndicator").appendTo($("#a"+i));
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
				while ($("#as"+i+j).children().length > 0) {
					$("#as"+i+j).children().first().remove();
				}
 				if (j < question.answers[i].length)
					$("#as"+i+j).show();
				else
					$("#as"+i+j).hide();
			}
			$("#ai"+i).css({"content":"url('img/Blank.svg')"});
		}
		else
			$("#a" + i).hide();
	}
	update();
}

function checkAnswers() {
	var i, j, k;
	var question = questions[currentQuestion];
	var rightAnswers = Array();
	var myAnswers = Array();

	// Remove dragging and reposition
	for (i = 0; i < question.numAnswers; i++) {
		for (j = 0; j < question.answers[i].length; j++) {
			var item = $("#as"+i+j);
			if (item.children().length > 0) {
				item.children().first().removeClass("box");
				item.children().first().addClass("nonDraggableImage");
				if (Draggable.get(item.children().first()) != null)
					Draggable.get(item.children().first()).kill();
				item.children().first().css({left:item.position().left+10, top:item.position().top+10});
			}
		}
	}

	// Create answer arrays
	for (i = 0; i < question.numAnswers; i++) {
		var answers = Array();
		for (j = 0; j < question.answers[i].length; j++) {
			var item = $("#as"+i+j);
			if (item.children().length > 0) {
				answers.push(item.children().first().attr('id'));
			}
		}
		myAnswers.push(answers.sort());
	}
	for (i = 0; i < question.answers.length; i++) {
		rightAnswers.push(question.answers[i].slice().sort());
	}

	// Check answers
	for (i = 0; i < question.numAnswers; i++) {
		var blank = false, right = false, dupe = false;
		for (j = 0; j < question.answers[i].length; j++) {
			if ($("#as"+i+j).children().length == 0) {
				blank = true;
			}
		}
		if (blank == false) {
			for (j = 0; j < question.answers.length; j++) {
				if (myAnswers[i].length == rightAnswers[j].length) {
					var correct = true;
					for (k = 0; k < myAnswers[i].length; k++) {
						if (myAnswers[i][k] != rightAnswers[j][k]) {
							correct = false;
						}
					}
					if (correct == true)
						right = true;
				}
			}
			if (right == true) {
				for (j = 0; j < i; j++) {
					if ((myAnswers[i].length == myAnswers[j].length) &&
						(myAnswers[i].length == question.answers[j].length)) {
						var same = true;
						for (k = 0; k < myAnswers[i].length; k++) {
							if (myAnswers[i][k] != myAnswers[j][k]) {
								same = false;
							}
						}
						if (same == true)
							dupe = true;
					}
				}
			}
		}
		if (blank == true)
			$("#ai"+i).css({"content":"url('img/Blank.svg')"});
		else if (dupe == true)
			$("#ai"+i).css({"content":"url('img/Dupe.svg')"});
		else if (right == true)
			$("#ai"+i).css({"content":"url('img/Right.svg')"});
		else
			$("#ai"+i).css({"content":"url('img/Wrong.svg')"});
	}
}

//the update() function is what creates the Draggable according to the options selected (snapping).
function update() {
	Draggable.create(".box", {
		bounds:$container,
		edgeResistance:0.65,
		type:"x,y",
		onPress:function() {
			TweenLite.set(this.target, {width:60, height:60});
		},
		onRelease:function() {
			var slot = "";
			var x = this.pointerX, y = this.pointerY;
			var question = questions[currentQuestion];
			for (var i = 0; i < question.numAnswers; i++) {
				for (j = 0; j < question.answers[i].length; j++) {
					var item = $("#as"+i+j);
					//console.log(item.position().left, item.position().top, item.width(), item.height());
					if ((x >= item.position().left) && (y >= item.position().top) &&
						(x <= item.position().left + item.width()) && (y <= item.position().top + item.height())) {
						slot = "#as"+i+j;
					}
				}
			}
			if (slot == "") {
				TweenLite.set(this.target, {clearProps:"transform"});
				TweenLite.set(this.target, {width:40, height:40});
			}
			else {
				TweenLite.set(this.target, {clearProps:"transform"});
				while ($(slot).children().length > 0) {
					$(slot).children().first().remove();
				}
				$("#"+this.target.id).appendTo($(slot));
				checkAnswers();
				for (i = 0; i < palette.length; i++) {
					if (palette[i].image == this.target.id) {
						x = $("#p"+i).position().left;
						y = $("#p"+i).position().top;
						$("<img/>").attr("class","box paletteItem").attr("id",palette[i].image).attr("src", "img/"+palette[i].image+".svg")
							.attr("title", palette[i].text)
							.css({position:"absolute", left:x, top:y})
							.appendTo($paletteArea);
						update();
					}
				}
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
