<?php




	if (count($_GET)==3){
		if($_GET["cmd"]==="generate"){
			$leftRow = $_GET["N"];
			$rightRow = $_GET["M"];
			$maxEdges = $leftRow * $rightRow;
			$noOfEdges = mt_rand(1,$maxEdges);
			$edgeList = array();
			for($x=0;$x<$noOfEdges;$x++){
				$edge = array(mt_rand(0,$leftRow-1),mt_rand(0,$rightRow-1),mt_rand(1,100));
				array_push($edgeList,$edge);
			}
			$finalArr = array();
			$finalArr['N'] = $leftRow;
			$finalArr['M'] = $rightRow;
			$finalArr['E'] = $edgeList;
			$test = ['2'];
			echo json_encode($finalArr);

		}

	}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function test_function(){
  $return = $_POST;

  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";

  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>
