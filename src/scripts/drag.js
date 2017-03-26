var $container = $("#container");
var $paletteArea = $("#paletteArea");
var $answerArea = $("#answerArea");
var maxAnswers = 6;
var maxAnswerSlots = 3;
var i, x, y;
var currentQuestion = 0;
var currentItem = -1;
var currentSlot = "";
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
/*	{question:"How can you get a sexually transmitted infection?",
	numAnswers:6,
	answers:[["Tongue","Eggplant"],["Tongue","Cat"],["Tongue","Peach"],["Eggplant","Cat"],["Cat","Cat"],["Eggplant","Peach"]]},*/
	{question:"How do you get tested for sexually transmitted infections?",
	numAnswers:3,
	answers:[["PeeBottle"],["Swab"],["Look"]]},
	{question:"What if you have a sexually transmitted infection?",
	numAnswers:3,
	answers:[["Managed"],["BodyFight"],["Medicine"]]},
	{question:"What are the most common symptoms of HPV?",
	numAnswers:3,
	answers:[["NoSymptoms"],["Cucumber"],["Testing"]]},
	{question:"What are the most common symptoms of herpes?",
	numAnswers:3,
	answers:[["NoSymptoms"],["Cucumber"],["Burning"]]},
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
		$("<img/>").attr("id","p"+i).attr("class","paletteItem").attr("src", "img/"+palette[i].image+".svg").attr("alt", palette[i].text)
			.appendTo($paletteArea);
	}
	for (i = 0; i < palette.length; i++) {
		x = $("#p"+i).position().left;
		y = $("#p"+i).position().top;
		$("<img/>").attr("class","box paletteItem").attr("id",palette[i].image).attr("src", "img/"+palette[i].image+".svg")
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
	var question = questions[currentQuestion];
	for (var i = 0; i < question.numAnswers; i++) {
		var blank = true, right = false;
		for (j = 0; j < question.answers[i].length; j++) {
			var item = $("#as"+i+j);
			if (item.children().length > 0) {
				item.children().first().removeClass("box");
				if (Draggable.get(item.children().first()) != null) {
					Draggable.get(item.children().first()).kill();
				}
				item.children().first().css({left:item.position().left+10, top:item.position().top+10});
				blank = false;
				for (var k = 0; k < question.numAnswers; k++) {
					if (question.answers[k].indexOf(item.children().first().attr('id')) > -1) {
						right = true;
					}
				}
			}
		}
		if (blank == true) {
			$("#ai"+i).css({"content":"url('img/Blank.svg')"});
		}
		else {
			if (right == true)
				$("#ai"+i).css({"content":"url('img/Right.svg')"});
			else
				$("#ai"+i).css({"content":"url('img/Wrong.svg')"});
		}
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
