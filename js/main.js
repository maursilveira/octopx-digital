(function() {
  "use strict";

  var header = document.querySelector("#mainHeader");
  var hambMenu = header.querySelector("#hamburgerMenu > button");
  var nav = header.querySelector("#mainNav");
  var textDiv = document.querySelector("#textArea");
  var tentacle = textDiv.querySelector("#tentacle");
  var memberArea = document.querySelector("#memberRow");
  var profile = document.querySelectorAll(".profile");
  var readMore = document.querySelectorAll(".readMore");
  var goBack = document.querySelectorAll(".goBack");
  var bodyArea = document.querySelector("body");
  var servicesDiv = document.querySelector("#services");
  var projectsDiv = document.querySelector("#projects");
  var teamDiv = document.querySelector("#team");
  var contactDiv = document.querySelector("#contact");
  var menuBtn = nav.querySelectorAll("a");
  var tentacleTl = new TimelineLite({
    paused: true
  });
  var headerTl = new TimelineLite({
    paused: true
  });
  var profileMelissaTl = new TimelineLite({
    paused: true
  });
  var profileJayTl = new TimelineLite({
    paused: true
  });
  var profileShaunTl = new TimelineLite({
    paused: true
  });
  var divOffsets = textDiv.getBoundingClientRect();
  var pos = 0;
  var ticking = false;
  var isOpen = false;

  // function to calculate Y position of #textArea divYPos
  function divYPos() {
    var divY = 0;
    if(window.innerWidth < 640) { //small screen size
      divY = window.innerWidth*1.25;
    }
    else {
      if (window.innerWidth >= 1600) { //bigger than maximum width
        divY = 1067;
      }
      else { //between 640px and 1600px
        divY = window.innerWidth*0.66;
      }
    }
    return divY;
  }

  // function to check scrolling
  function checkScroll() {
    // if menu is open, close it when scroll
    if(isOpen === true) {
      menuAnimation();
    }

  	pos = window.scrollY;
  	if(!ticking) {
      // runs tentacle animation
  		window.requestAnimationFrame(function(){
  			runAnimation(pos);
  			ticking = false;
  		});
  	}
  	ticking = true;
  }

  // function to play tentacle animation
  function runAnimation(scrlpos) {
    var divPos = divYPos();
    if (scrlpos >= (divPos/2) && scrlpos < divPos) {
  		tentacleTl.play();
  	}
  	else {
  		tentacleTl.reverse();
  	}
  }

  function moveTentacle() {
    tentacleTl.to(tentacle, 3, {top: "50%", left: "50%", rotation: 0, ease: Power0.easeNone});
  }

  // function to play opening/closing animation
  function menuAnimation() {
    if (!isOpen) {
      isOpen = true;
      headerTl.play();
    }
    else {
      isOpen = false;
      headerTl.reverse();
    }
  }

  function openMenu() {
    var totalHeight = 0;
    var easeConf = 0;
    if (window.innerWidth < 640) {
      totalHeight = "14rem";
      easeConf = 2;
    }
    else {
      totalHeight = "8.5rem";
      easeConf = 4;
    }
    headerTl.to(header, 1, {height: totalHeight, ease: Back.easeOut.config(easeConf)});
    headerTl.to(nav, 1, {opacity: 1}, "-=0.7");
  }

  // function to play member profiles animation
  function selectProfile(evt) {
    evt.preventDefault();
    var winWidth = window.innerWidth;
    if (evt.currentTarget.id == "moreMelissa") {
      profile[0].style.width = winWidth+"px";
      profileMelissaTl.play();
    }
    else if (evt.currentTarget.id == "moreJay") {
      profile[1].style.width = winWidth+"px";
      profileJayTl.play();
    }
    else {
      profile[2].style.width = winWidth+"px";
      profileShaunTl.play();
    }
  }

  // function to leave extended profile and return to team area
  // it moves specific profile out and brings team area back to original position
  function backMembers(evt) {
    evt.preventDefault();
    var it = evt.currentTarget;
    // var div = 0;
    if (it.id == "backMelissa") {
      profileMelissaTl.reverse();
    }
    else if (it.id == "backJay") {
      profileJayTl.reverse();
    }
    else {
      profileShaunTl.reverse();
    }
  }

  // function to show members extended profile
  // it moves services area out and shows specific profile
  function showProfile() {
      profileMelissaTl.to(memberArea, 1, {left: "-1600px"});
      profileMelissaTl.to(profile[0], 1, {left: 0}, "-=0.7");

      profileJayTl.to(memberArea, 1, {left: "-1600px"});
      profileJayTl.to(profile[1], 1, {left: 0}, "-=0.7");

      profileShaunTl.to(memberArea, 1, {left: "-1600px"});
      profileShaunTl.to(profile[2], 1, {left: 0}, "-=0.7");
  }

  // function to scroll to selected area when menu clicked
  // scrollIntoView options do not work on Chrome (blame Google, not me)
  function scrollSection(evt) {
    evt.preventDefault();
    menuAnimation();
    if (evt.currentTarget.id == "menuHome") {
      // window.scrollTo(0, 0);
      bodyArea.scrollIntoView({behavior: "smooth"});
    }
    else if (evt.currentTarget.id == "menuServices") {
      servicesDiv.scrollIntoView({behavior: "smooth"});
    }
    else if (evt.currentTarget.id == "menuProjects") {
      projectsDiv.scrollIntoView({behavior: "smooth"});
    }
    else if (evt.currentTarget.id == "menuTeam") {
      teamDiv.scrollIntoView({behavior: "smooth"});
    }
    else {
      contactDiv.scrollIntoView({behavior: "smooth"});
    }
  }

  window.addEventListener("scroll", checkScroll, false);
  window.addEventListener("load", moveTentacle, false);
  window.addEventListener("load", openMenu, false);
  window.addEventListener("load", showProfile, false);
  hambMenu.addEventListener("click", menuAnimation, false);
  for (var i = 0; i < menuBtn.length; i++) {
    menuBtn[i].addEventListener("click", scrollSection, false);
  }
  for (var i = 0; i < readMore.length; i++) {
    readMore[i].addEventListener("click", selectProfile, false);
  }
  for (var i = 0; i < goBack.length; i++) {
    goBack[i].addEventListener("click", backMembers, false);
  }
})();
