<html lang="en">
<head>
    <meta charset="utf-8" />
    <!--meta name="viewport" content="target-densitydpi=device-dpi, initial-scale=1.0, user-scalable=no" /-->
    <title>Código del Sur</title>
    <link rel="shortcut icon" href="../Img/iconoBrowser.png">
    <!-- To allow your media queries to take full effect a typical mobile-optimized site contains something like the following: -->
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../webCDS.css">
    <!-- jQuery library (served from Google) -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>    
    <link href="../jquery.bxslider/jquery.bxslider.css" rel="stylesheet" />    
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.min.css">
	<script type="text/javascript" src="../js/unified.js"></script>
   
   
</head>
<body>
<?php include("../header.html"); ?>

<div id="divPortfolio">
        <section id="SecPortfolio">
			<div id="titles"><h2 id="Portfolio">Portfolio /</h2><h3 class="subtitle">Our excellent work...</h3></div>
			<div id="arrowsPort">
				<ul>
					<li class="btnleftPort"><a href="#"></a></li>
					<li>titulo Porfolio</li>
					<li class="btnrightPort"><a href="#"></a></li>
				</ul>
			</div>
			<div id="btnPortfolio" onload="alert('a'); getWorkContainer('filter')">
				<ul>
					<li class="btn-all"  onclick="getWorkContainer('filter')"></li>
					<li class="buttonPort btn-softw" onclick="getWorkContainer('filterSoftw')"></li>
					<li class="buttonPort btn-labs" onclick="getWorkContainer('filterLabs')"></li>
					<li class="buttonPort btn-webportfolio" onclick="getWorkContainer('filterWeb')"></li>
					<li class="buttonPort btn-game" onclick="getWorkContainer('filterGame')"></li>
					<li class="buttonPort btn-gd" onclick="getWorkContainer('filterGD')"></li>
				</ul>
			</div>						
			<div id="arrowsPort450" class="content450">						
				<a onClick="GoBackPortfolioItem()" class="btnleftPort"></a>
				<a class="btnrightPort" onClick="GoNextPortfolioItem()"></a>
				<div>
					<ul class="TitlePortfolio">
						<li id="1">Peakour</li>
						<li id="2">Skout</li>
						<li id="3">Skout2</li>
						<li id="4">Toymail</li>
						<li id="5">Scavenger Hunt</li>
						<li id="6">Iisis</li>
						<li id="7">miPlan</li>
						<li id="8">Push it Poker</li>
						<li id="9">Count the Animals!</li>
						<li id="10">Avon</li>
						<!--li id="11">Event Wizard</li-->
						<li id="11">Guess Phrase</li>
						<li id="12">Fodessa</li>
						<li id="13">Bit Kaput</li>
						<li id="14">Office Depot</li>
						<li id="15">The Sullivan Group</li>
						<li id="16">Next Generation Education</li>
						<li id="17">LiquidAdventure</li>
						<li id="18">Engle</li>
						<li id="19">Dittoze</li>
						<li id="20">Seacoast</li>
						<li id="21">Cortexa</li>
						<li id="22">Subway</li>
						<li id="23">Findstoragefast</li>
						<li id="24">Fun Time Timer</li>
						<li id="25">edMobility</li>
						<li id="26">Siffter</li>
						<li id="27">MiJay</li>
						<li id="28">Hurricane Forecaster</li>
						<li id="29">Pinpoint Parking</li>
						<li id="30">Facility Engineer</li>
						<li id="31">Anything Detector</li>
						<li id="32">Pea Yourself</li>
						<li id="33">MathSpace</li>
						<li id="34">iGrade Soccer</li>
						<li id="35">Onehub</li>
						<li id="36">Kindara</li>
						<!--li id="37">Social Coaster</li-->
						<li id="37">Storyly</li>
						<li id="38">Waltja</li>
						<li id="39">ScandLearn</li>
						<li id="40">Center for Dermatology</li>
						<li id="41">Medical Apps</li>
						<li id="42">eJudged</li>
						<li id="43">ScandLearn</li>
						<li id="44">Al Monitor</li>
						<li id="45">Auerbach</li>
						<li id="46">JSCAPE</li>
						<li id="47">Volomio</li>
						<li id="48">The Hub</li>
						<li id="49">PlayTheGrid</li>
						<li id="50">idScan GO</li>
						<li id="51">MedicScan GO</li>
						<li id="52">Live!y</li>
						<li id="53">Titan</li>
						<li id="54">Holiday Crowd</li>
						<li id="55">Weev</li>
						<li id="56">Balloons</li>
						<li id="57">Vera+ app (Antel)</li>
						<li id="58">RadU</li>
						<li id="59">Cerego</li>
						<li id="60">Common Areas</li>
						<li id="61">GoWrite</li>
						<li id="62">Broadway.org</li>
						<li id="63">Clash of Ninja</li>
						<li id="64">Agrisite</li>
						<li id="65">Produce Monkey</li>
						<li id="66">83Bar</li>
						<li id="67">Fox</li>
						<li id="68">BetSite</li>
						<li id="69">Tradebook</li>
						<li id="70">Sharalike</li>
						<li id="71">NRRB</li>
						<li id="72">YOU +</li>
						<li id="73">USG</li>
						<li id="74">Finish Agent</li>
						<li id="75">Academic Ladder</li>
					</ul>
				</div>
			</div>
			<div id="PortFolioDesc" class="contInfoDesc450">
				<ul class="InfoPortfolio"> <!-- Portfolio para devices -->
				<!--Peakour-->
					<li id="cont1">
						<img class="porfImg portFolioImg" src="img/Portfolio_ch/workPeakour01_ch.png"/>
						<p>An interactive game we developed for Gotta Pea® that represents 
						strategy on the streets. Using the techniques of Parkour, this game
						makes you think and reason while having fun! </p>
					</li>
					<!-- Solo el primer elemento es cargado, los otros items son cargados por ajax con el slider -->
				</ul>
			</div>
		    <!-- Comienzan los Trabajos del porfolio para web -->					
		    <div class="workContainer">
		    </div>
	    </section>
    </div>
    <!-- 1er triangulo-->
    <div class="triangulo">
        <img src="img/red01.png" />
    </div>
    <!-- Fin -->
</body>
</html>		