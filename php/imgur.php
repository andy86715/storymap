<?php
$img=$_FILES['file'];
if(isset($_POST['submit'])){ 
	if($img['name']==''){  
		echo "";
	}else{
		$filename = $img['tmp_name'];
		$client_id="342e2089e5d8bdb";
		$handle = fopen($filename, "r");
		$data = fread($handle, filesize($filename));
		$pvars   = array('image' => base64_encode($data));
		$timeout = 30;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
		curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
		$out = curl_exec($curl);
		curl_close ($curl);
		$pms = json_decode($out,true);
		$url=$pms['data']['link'];
	}
}
?>