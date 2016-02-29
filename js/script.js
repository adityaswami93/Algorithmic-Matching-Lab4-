    /* script.js, by default saved in subfolder /js */
    // now write something here, you can use jQuery or vanilla JS
    // we load the script only at the bottom of the HTML page so that we know the DOM has been loaded
    var count = 0;
    var match = [];
    var score = [];
    var totalMatch = 0;
    var totalScore = 0;

    var mousePressed = false;
    var drawover = true;
    var leftcol = -2;
    var leftrow = -1;
    var rightcol = -2;
    var rightrow = -1;
    var leftpicname = "";
    var rightpicname = "";
    var edgeList,longestCol;
    var jsonStr;
    $( document ).ready(function() {
      $('#instruction').show();
      $('#errorDiv').show();
      $('#errorMsg').show();

      var N = $('#n').val();
      var M = $('#m').val();


      var clickCounter = 0;


      /*
      for(var j=0;j<totalLeft;j++){
        var info = {};
        info.matched = new Array(totalRight).fill(-1);
        info.score = new Array(totalRight).fill(-1);
        match[j] = info;
      }
      */

      //alert(match[0].matched[0]);
      //match = Array(totalMatch).fill(-1);
      //var totalLimit = 5 * totalMatch;
      //var allMatch = false;
      var urlSolve = 'http://cs3226.comp.nus.edu.sg/matching.php';
      var urlReset = 'http://localhost/lab4/matching.php';
      //var urlReset = 'http://cs3226-1.comp.nus.edu.sg/~a0100248/lab4/matching.php'
      $.getJSON(urlReset,{cmd:'generate',N:N,M:M},function(data){
        jsonStr = JSON.stringify(data);
        edgeList = data.E;
        createTable(N,M);
        $('#lastimage').on("load", function() {
          loadCanvas();
          updateMatch(N,M);
          drawLines();
          //InitThis();
        });
      });


      $(document).on('click','#btn',function(){
        $('#tbl').empty();
        $('#errorMsg').empty();
        $('#errorMsg').append('<br>');
        totalMatch = 0;
        totalScore = 0;
        leftcol = -2;
        leftrow = -1;
        rightcol = -2;
        rightrow = -1;
        leftpicname = "";
        rightpicname = "";
        //edgeList = [];

        N = $('#n').val();
        M = $('#m').val();



        $.getJSON(urlReset,{cmd:'generate',N:N,M:M},function(data){
          jsonStr = JSON.stringify(data);
          edgeList = data.E;
          createTable(N,M);
          $('#lastimage').on("load", function() {
            loadCanvas();
            updateMatch(N,M);
            drawLines();

            //InitThis();
          });
        });
      });
      $(document).on('click','#solveBtn',function(){

        //edgeList = [];

        N = $('#n').val();
        M = $('#m').val();
        /*
        alert(jsonStr.E);
        $.ajax({
          dataType: "json",
          url: url,
          data: {cmd:'solve',graph:jsonStr},
          success: alert(data.match_score)
        });
        */


        $.getJSON(urlSolve,{cmd:'solve',graph:jsonStr},function(dataSolve){
          //alert(jsonStr);
          //alert(dataSolve.match_score);
          correctAnswer(dataSolve);
        });

      });

        /*
        $('#totalLimit').text(totalLimit);
        $("#gen").hide();
        $('#errorMsg').empty();
        $('#errorMsg').append('<br>');
        $("#msgHome").hide();
        $('#instruction').show();
        $('#resetbtn').show();
        $('#tbl').empty();
        leftcol = -2;
        leftrow = -1;
        rightcol = -2;
        rightrow = -1;
        leftpicname = "";
        rightpicname = "";

        clickCounter = 0;

        count = 0;
        totalMatch = parseInt($('#n').val());
        totalLimit = 5 * totalMatch;
        match = Array(totalMatch).fill(-1);
        createTable();

        $('#lastimage').on("load", function() {
          loadCanvas();
          //InitThis();
        });
          //canvas.setAttribute('height',centreColHeight+"px");
          //canvas.setAttribute('width',centreColWidth+"px");
      });

      $(document).on('click','#clearbtn',function(){
        clearArea();
        return false;
      });
      */




    $(document).on('mousedown','.left',function(){
      //mousePressed = true;
      //drawover = false;
      //clickCounter++;
      //$('#counterDisplay').text(clickCounter);
      $(this).toggleClass('active-left');
      leftpicname = $(this).find('.leftpic').attr('src');
      var newleftcol = $(this).parent().children().index($(this));
      var newleftrow = $(this).parent().parent().children().index($(this).parent());
      if ((newleftcol==leftcol)&&(newleftrow!=leftrow)) {
        $("#errorMsg").text('Both cells selected from the left column.');
        $('.left').removeClass('active-left');
        leftcol = -1;
        newleftcol = -2;
        leftpicname = "";
        //countExceeded(clickCounter,totalLimit);
        return false;
      }
      else {
        leftcol = newleftcol;
        leftrow = newleftrow;
      }
      if((leftrow>-1)&&(rightrow>-1)){
        if(match[leftrow][rightrow]==1){
          match[leftrow][rightrow] = 2;
          totalScore += score[leftrow][rightrow];
          totalMatch += 1;
          matchImg(leftpicname,rightpicname);
          //$("#errorMsg").text("Yoh have matched "+totalMatch" aniamls with the current score "+totalScore);
          leftcol = -2;
          rightcol = -2;
          leftpicname = "";
          rightpicname = "";
          leftrow = -2;
          rightrow = -2;
        }
        else if((leftpicname != "")&&(rightpicname != "")){
          $("#errorMsg").text('The pictures do not have a connecting line');
          clearArea();
          drawLines(match);
          $('.right').find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
          $(this).find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
          //countExceeded(clickCounter,totalLimit);
          leftcol = -2;
          rightcol = -2;
          leftpicname = "";
          rightpicname = "";
          leftrow = -2;
          rightrow = -2;

        }
      }


      /*
      if (compareString(leftpicname,rightpicname)){
        match[leftrow]=rightrow;
        matchImg(leftpicname,rightpicname);
        countExceeded(clickCounter,totalLimit);

        leftcol = -2;
        rightcol = -2;
        leftpicname = "";
        rightpicname = "";
      }
      else if((leftpicname != "")&&(rightpicname != "")){
        $("#errorMsg").text('The pictures do not match. Try again!');
        clearArea();
        drawLines(match);
        $('.right').find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
        $(this).find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
        countExceeded(clickCounter,totalLimit);
        leftcol = -2;
        rightcol = -2;
        leftpicname = "";
        rightpicname = "";

      }
      countExceeded(clickCounter,totalLimit);
      */



    $('.leftpic-darken').click(function(e){
      return false;
    });

    $('.rightpic-darken').click(function(e){
      return false;
    });

    });




  $(document).on('mousedown','.right',function(){
    //mousePressed = true;
    //drawover = false;
    //clickCounter++;
    //$('#counterDisplay').text(clickCounter);
    $(this).toggleClass('active-right');
    rightpicname = $(this).find('.rightpic').attr('src');
    var newrightcol = $(this).parent().children().index($(this));
    var newrightrow = $(this).parent().parent().children().index($(this).parent());
    if ((newrightcol==rightcol)&&(newrightrow!=rightrow)) {
      $("#errorMsg").text('Both cells selected from the right column.');
      $('.right').removeClass('active-right');
      rightcol = -1;
      newrightcol = -2;
      rightpicname = "";
      leftrow = -2;
      rightrow = -2;
      //countExceeded(clickCounter,totalLimit);
      return false;
    }
    else {
      rightcol = newrightcol;
      rightrow = newrightrow;
    }
    if((leftrow>-1)&&(rightrow>-1)){
      if(match[leftrow][rightrow]==1){
        match[leftrow][rightrow] = 2;
        totalScore += score[leftrow][rightrow];
        totalMatch += 1;
        matchImg(leftpicname,rightpicname);
        //$("#errorMsg").text("Yoh have matched "+totalMatch" animals with the current score "+totalScore);
        leftcol = -2;
        rightcol = -2;
        leftpicname = "";
        rightpicname = "";
        leftrow = -2;
        rightrow = -2;
      }
      else if((leftpicname != "")&&(rightpicname != "")){
        $("#errorMsg").text('The pictures do not have a connecting line');
        clearArea();
        drawLines(match);
        $(this).find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
        $('.left').find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
        //countExceeded(clickCounter,totalLimit);
        leftcol = -2;
        rightcol = -2;
        leftrow = -2;
        rightrow = -2;
        leftpicname = "";
      }
      /*
      else if(match[leftrow][rightrow]==2){
        $("#errorMsg").text('The picture has already been matched');
        $(this).find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
        $('.left').find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
        leftcol = -2;
        rightcol = -2;
        leftrow = -2;
        rightrow = -2;
        leftpicname = "";

      }
      */


    }


    /*
    if ((compareString(leftpicname,rightpicname))&&(rightpicname!="")){
      match[leftrow] = rightrow;
      matchImg(leftpicname,rightpicname);
      countExceeded(clickCounter,totalLimit);
      leftcol = -2;
      rightcol = -2;
      leftpicname = "";
      rightpicname = "";
    }
    else if((leftpicname != "")&&(rightpicname != "")){
      $("#errorMsg").text('The pictures do not match. Try again!');
      clearArea();
      drawLines(match);
      $(this).find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
      $('.left').find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
      countExceeded(clickCounter,totalLimit);
      leftcol = -2;
      rightcol = -2;
      leftpicname = "";
      rightpicname = "";

    }
    */


  //countExceeded(clickCounter,totalLimit);

  $('.leftpic-darken').click(function(e){
    return false;
  });

  $('.rightpic-darken').click(function(e){
    return false;
  });






  });







  });





  function countExceeded(count,totalLimit){
      if (count==totalLimit){
          $("#errorMsg").text('The number of click has exceeded 20. The game will restart!');
          $("#gen").show();
          $('#resetbtn').hide();
          $('.left').off('click');
          $('.right').off('click');

          return true;
      }
      return false;
  }

  function updateMatch(totalLeft,totalRight){
    var size = edgeList.length;
    for(var j=0;j<totalLeft;j++){
      match[j] = new Array(totalRight).fill(-1);
      score[j] = new Array(totalRight).fill(0);
    }
    var left,right, value;
    for(var j=0;j<size;j++){
      left = edgeList[j][0];
      right = edgeList[j][1];
      value = edgeList[j][2];
      match[left][right] = 1;
      score[left][right] = value;
      //alert(match[left].score[right]);
    }
    //alert(match);
  }

  function compareString(str1,str2){
      if(str1===str2)
          return true;
      else
          return false;
  }

  var leftglbarr,rightglbarr;

  function createTable(N,M) {


    var shortestCol = N;
    longestCol = M;

    if (N-M>0){
      shortestCol = M;
      longestCol = N;
    }

      //var num = $('#n').val();
      var randLeft=[];
      var randRight=[];

      for (var i = 1;i<11;i++){
          randLeft[i-1]=i;
          randRight[i-1]=i;
        }
      randLeft = shuffle(randLeft);
      randRight = shuffle(randRight);

      var leftarr = randLeft.slice(0,N);
      var rightarr = randRight.slice(0,M);
      //leftarr = shuffle(leftarr);
      //rightarr = shuffle(rightarr);

      /*
      var permutation = false;
      var k = 0;
      while (permutation == false){
          if(leftarr[k]==rightarr[k]){
              k = 0;
              leftarr = shuffle(leftarr);
              rightarr = shuffle(rightarr);
              permutation = false;
              continue;
          }
          if (k==num-1)
              permutation = true;
          k++;
      }
      */

      $('#tbl').show();
      var j = 0;
      for (j = 0; j < shortestCol; j++) {
          if (j==0){
            //alert('yes ' + shortestCol );
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td id='centrecol' rowspan = " + longestCol + "><canvas id='cvs'></canvas></td><td class = 'right'><img class='rightpic img-responsive' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
          }
          else {
            if((j==shortestCol-1)&&(shortestCol==longestCol)){
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img id='lastimage' class='rightpic img-responsive' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
            }
            else {
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
            }
          }
      }
      //alert(shortestCol);
      //alert(j);

      for(var k=j;k<longestCol;k++){
        //alert('yes');
        if((N-M)>0){
          if(k==longestCol-1){
            $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' id='lastimage' src='images/l" + leftarr[k] + ".png' alt='hello'/></td><td/></td></tr>");
          } else {
            $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[k] + ".png' alt='hello'/></td><td></td></tr>");
          }
        }
        else {
          if(k==longestCol-1){
            $('#tbl').append("<tr><td></td><td class = 'right'><img class='rightpic img-responsive' id='lastimage' src='images/r" + rightarr[k] + ".png' alt='hello'/></td></tr>");
          } else {
            $('#tbl').append("<tr><td></td><td class = 'right'><img class='rightpic img-responsive' src='images/r" + rightarr[k] + ".png' alt='hello'/></td></tr>");
          }
        }
      }
      //loadCanvas();
      //drawLines(data);
      leftglbarr = leftarr;
      rightglbarr = rightarr;
      /*
      else if (j==(num-1)) {
        $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' id='lastimage' src='images/" + rightarr[j] + ".png' alt='hello'/></td></tr>");
      }
      */
  }

  function correctAnswer(data){
    var size = data.match.length;
    var correctMatch = parseInt(data.num_match);
    var correctScore = parseInt(data.match_score);
    var left,right;
    for (var i = 0; i < size; i++) {
      left = data.match[i][0];
      right = data.match[i][1];
      match[left][right] = 3;
    }
    drawLines();
    //alert(totalMatch+' '+totalScore);
    //alert(correctMatch+' '+correctScore);
    if((totalMatch==correctMatch)&&(totalScore==correctScore)){
      $("#errorMsg").text('Congratulations: You get the correct answer of '+correctMatch+' with a score of '+correctScore+' .Restart?');
    }
    else{
      $("#errorMsg").text('More animals ('+data.num_match+') could be matched. Optimal answer in blue. Reset and Try again!');

    }
    $('.left').css('pointer-events','none');
    $('.right').css('pointer-events','none');
  }


  /*
  $(window).on("load", function() {

    var canvas = $('#cvs')[0];
    alert($('#centrecol').width()+' '+$('#centrecol').height());
    canvas.width = parseInt($('#centrecol').width())-10;
    canvas.height = $('#centrecol').height();
    alert($('#centrecol').width()+' '+$('#centrecol').height());
    alert(canvas.width+' '+canvas.height);

    //canvas.setAttribute('height',centreColHeight+"px");
    //canvas.setAttribute('width',centreColWidth+"px");
  });
  */
  function loadCanvas(){
    //alert('lastimage');
    var canvas = $('#cvs')[0];
    canvas.width = parseInt($('#centrecol').width());
    canvas.height = $('#centrecol').height();
    /*
    if ($(window).width() > 991) {
     canvas.width = 1.1 * canvas.width;
   }
   */
    //alert(canvas.width+' '+canvas.height);
    //canvas.width = 1.1 * canvas.width;
    //alert(canvas.width+' '+canvas.height);
  }


  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  var offset = 10;
  function drawStraightLine(turn,l, r,value) {
    //alert('yes');
    var canvas = $('#cvs')[0];
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    //alert(width+' '+height);
    var textSize = 0.05 * width;
    var leftText, rightText;
    var midWidth = 0.5 * width;
    //var num = parseInt($('#n').val());
    var doubleDivide= height/(longestCol*2);
    var singleDivide = height/longestCol;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    var midHeight = startPt + ((endPt-startPt)/2);
    //alert(midHeight+' '+midWidt
    context.beginPath();
    context.moveTo(0, startPt);
    context.lineTo(width, endPt);
    if (match[l][r]==2){
      context.strokeStyle = '#ff0000';
      context.lineWidth = 3;
    }
    else if (match[l][r]==3) {
      context.strokeStyle = '#0000FF';
      context.lineWidth = 5;
    }
    else {
      context.strokeStyle = '#000000';
      context.lineWidth = 1;
    }
    //context.strokeStyle = $('#selColor').val();
    //context.lineWidth = $('#selWidth').val();
    context.lineJoin = "round";
    context.font= textSize + "px Georgia";
    context.fillText(value, 5,startPt+5);
    /*
    if(turn%2==0){
      context.fillText(value, midWidth-offset, midHeight-offset);
    }
    else {
      context.fillText(value, midWidth+offset, midHeight+offset);
    }
    */
    context.stroke();
  }

  function drawCurvyLine(turn,l, r,value) {
    var canvas = $('#cvs')[0];
    //alert(l+' '+r+' '+value);
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    //var num = parseInt($('#n').val());
    var textSize = 0.05 * width;
    var leftText, rightText;
    var midWidth = 0.5 * width;
    var doubleDivide= height/(longestCol*2);
    var singleDivide = height/longestCol;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    var midHeight = startPt + ((endPt-startPt)/2);
    /*
    context.beginPath();
    context.moveTo(0, startPt);
    context.lineTo(width, endPt);
    context.lineWidth = 0;
    context.lineCap = 'square';
    context.stroke();
    */
    context.beginPath();
    context.moveTo(0, startPt);
    if(l<r){
      context.bezierCurveTo(100, startPt-5, width-100, endPt+5, width, endPt);
    } else {
      context.bezierCurveTo(100, startPt+5, width-100, endPt-5, width, endPt);
    }
    if (match[l][r]==2){
      context.strokeStyle = '#ff0000';
      context.lineWidth = 3;
    }
    else if (match[l][r]==3) {
      context.strokeStyle = '#0000FF';
      context.lineWidth = 5;
    }
    else {
      context.strokeStyle = '#000000';
      context.lineWidth = 1;
    }
    context.lineJoin = "round";
    context.font= textSize + "px Georgia";
    offset = 0;
    context.fillText(value, 5,startPt+5);

    /*
    if(turn%2==0){
      context.fillText(value, midWidth-offset, midHeight-offset);
    }
    else {
      context.fillText(value, midWidth+offset, midHeight+offset);
    }
    */
    context.stroke();
  }


  function matchImg(leftImg,rightImg){
    //var totalMatch = parseInt($('#n').val());
    $('.right').find('img[src$="'+rightImg+'"]').addClass('rightpic-darken');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').removeClass('active-right');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').addClass('right-next');
    $('.left').find('img[src$="'+leftImg+'"]').addClass('leftpic-darken');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').removeClass('active-left');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').addClass('left-next');
    clearArea();
    //alert('yes');
    drawLines();
    //$("#errorMsg").text('Congratulations: It is a match');
    $("#errorMsg").text("Yoh have matched "+totalMatch + " animals with the current score of "+totalScore);

    //count++;
    /*
    if(count==totalMatch){
      $("#errorMsg").text('Congratulations: All Animals were correctly matched. Restart?');
      $("#gen").show();
      $('#resetbtn').hide();
      $('#cvs').css('pointer-events','none');
      return false;
    }
    */
  }




  function clearArea() {
      // Use the identity matrix while clearing the canvas
      var canvas = $('#cvs')[0];
      //canvas.text('january');
      var ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  /*
  function drawLines(match){
    for (var i = 0; i < match.length; i++) {
      if (match[i]!=-1){
        //alert(match);
        if (Math.abs(i - match[i]) <= 1){
          //alert('yes');
          drawStraightLine(i,match[i]);
        }
        else {
          drawCurvyLine(i,match[i]);
        }
      }
    }
  }
  */
  function drawLines(){
      //InitThis();
    var size = edgeList.length;
    var left,right,value;
    for (var i = 0; i < size; i++) {
      left = edgeList[i][0];
      right = edgeList[i][1];
      value = edgeList[i][2];
      alert('yes');
      //alert(i);
        if (Math.abs(left - right) <= 1){
          //alert('yes');
          drawStraightLine(i,left,right,value);
        }
        else {
          drawCurvyLine(i,left,right,value);
        }
    }
  }
