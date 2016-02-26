    /* script.js, by default saved in subfolder /js */
    // now write something here, you can use jQuery or vanilla JS
    // we load the script only at the bottom of the HTML page so that we know the DOM has been loaded
    var count = 0;
    var match = [];
    var mousePressed = false;
    var drawover = true;
    var leftcol = -2;
    var leftrow = -1;
    var rightcol = -2;
    var rightrow = -1;
    var leftpicname = "";
    var rightpicname = "";
    $( document ).ready(function() {
      $('#instruction').show();
      $('#errorDiv').show();
      $('#errorMsg').show();

      var N = 2;
      var M = 4;


      var clickCounter = 0;

      var totalMatch = parseInt($('#n').val());
      //match = Array(totalMatch).fill(-1);
      //var totalLimit = 5 * totalMatch;
      //var allMatch = false;
      var url = 'http://cs3226.comp.nus.edu.sg/matching.php';

      $.getJSON(url,{cmd:'generate',N:N,M:M},function(data){
        createTable(N,M);
        $('#lastimage').on("load", function() {
          loadCanvas();
          drawLines(data);
          //InitThis();
        });
      });


      $(document).on('click','#btn',function(){
        $('#tbl').empty();
        N = $('#n').val();
        M = $('#m').val();

        $.getJSON(url,{cmd:'generate',N:N,M:M},function(data){
          createTable(N,M);
          $('#lastimage').on("load", function() {
            alert('yes');
            loadCanvas();
            alert('1');
            drawLines(data);
            alert('no');
            //InitThis();
          });
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



/*
    $(document).on('mousedown','.left',function(){
      mousePressed = true;
      drawover = false;
      clickCounter++;
      $('#counterDisplay').text(clickCounter);
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
        countExceeded(clickCounter,totalLimit);
        return false;
      }
      else {
        leftcol = newleftcol;
        leftrow = newleftrow;
      }

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




    $('.leftpic-darken').click(function(e){
      return false;
    });

    $('.rightpic-darken').click(function(e){
      return false;
    });

    });

  $(document).on('mousedown','.right',function(){
    mousePressed = true;
    drawover = false;
    clickCounter++;
    $('#counterDisplay').text(clickCounter);
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
      countExceeded(clickCounter,totalLimit);
      return false;
    }
    else {
      rightcol = newrightcol;
      rightrow = newrightrow;
    }
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


  countExceeded(clickCounter,totalLimit);

  $('.leftpic-darken').click(function(e){
    return false;
  });

  $('.rightpic-darken').click(function(e){
    return false;
  });






  });
  */





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


  function compareString(str1,str2){
      if(str1===str2)
          return true;
      else
          return false;
  }

  var leftglbarr,rightglbarr;

  function createTable(N,M) {


    var shortestCol = N;
    var longestCol = M;
    if (N>M){
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
          else if (j==shortestCol-1){
            if((N-M)<0){
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' id='lastimage' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
            }
            else {
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' id='lastimage' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
            }
          }
          else {
            $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/l" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' src='images/r" + rightarr[j] + ".png' alt='hello'/></td></tr>");
          }
      }
      for(var k=j;k<longestCol;k++){
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

  function drawStraightLine(l, r,value) {
    var canvas = $('#cvs')[0];
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    //alert(width+' '+height);
    var textSize = 0.05 * width;
    var leftText, rightText;
    var midWidth = 0.5 * width;
    var num = parseInt($('#n').val());
    var doubleDivide= height/(num*2);
    var singleDivide = height/num;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    var midHeight = startPt + ((endPt-startPt)/2) - 10;
    //alert(midHeight+' '+midWidth);
    context.beginPath();
    context.moveTo(0, startPt);
    context.lineTo(width, endPt);
    context.strokeStyle = $('#selColor').val();
    context.lineWidth = $('#selWidth').val();
    context.lineJoin = "round";
    context.font= textSize + "px Georgia";
    context.fillText(value, midWidth, midHeight);
    context.stroke();
  }

  function drawCurvyLine(l, r,value) {
    var canvas = $('#cvs')[0];
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var num = parseInt($('#n').val());
    var textSize = 0.05 * width;
    var leftText, rightText;
    var midWidth = 0.5 * width;
    var doubleDivide= height/(num*2);
    var singleDivide = height/num;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    var midHeight = startPt + ((endPt-startPt)/2) - 10;
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
    context.strokeStyle = $('#selColor').val();
    context.lineWidth = $('#selWidth').val();
    context.lineJoin = "round";
    context.font= textSize + "px Georgia";
    context.fillText(value, midWidth, midHeight);
    context.stroke();
  }

  function matchImg(leftImg,rightImg){
    var totalMatch = parseInt($('#n').val());
    $('.right').find('img[src$="'+rightImg+'"]').addClass('rightpic-darken');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').removeClass('active-right');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').addClass('right-next');
    $('.left').find('img[src$="'+leftImg+'"]').addClass('leftpic-darken');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').removeClass('active-left');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').addClass('left-next');
    //clearArea();
    drawLines(match);
    $("#errorMsg").text('Congratulations: It is a match');
    count++;
    if(count==totalMatch){
      $("#errorMsg").text('Congratulations: All Animals were correctly matched. Restart?');
      $("#gen").show();
      $('#resetbtn').hide();
      $('#cvs').css('pointer-events','none');
      return false;
    }
  }

  function Draw(x, y, isDown) {
      if (isDown) {
          ctx.beginPath();
          ctx.strokeStyle = $('#selColor').val();
          ctx.lineWidth = $('#selWidth').val();
          ctx.lineJoin = "round";
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
      }
      lastX = x; lastY = y;
  }

  function clearArea() {
      // Use the identity matrix while clearing the canvas
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
  function drawLines(data){
      //InitThis();
    var edgeList = data.E;
    var size = edgeList.length;
    var left,right,value;
    for (var i = 0; i < size; i++) {
      left = edgeList[i][0];
      right = edgeList[i][1];
      value = edgeList[i][2];
        if (Math.abs(left - right) <= 1){
          //alert('yes');
          drawStraightLine(left,right,value);
        }
        else {
          drawCurvyLine(left,right,value);
        }
    }
  }
