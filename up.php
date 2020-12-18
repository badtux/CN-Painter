<?php
	$childName = $_POST['childName'];
	$childAge = $_POST['childAge'];
	$parentNo = $_POST['parentNo'];
	$blob = $_POST['painting'];

	$childName = preg_replace('/[\W_]+/m', '-', $childName);
	$childAge = preg_replace('/[\W_]+/m', '-', $childAge);
	$parentNo = preg_replace('/[^0-9]/', '', $parentNo);

	$fileingName = date("Ymd-Gis_").$parentNo.'-'.$childName.'-'.$childAge.'.png';   
	
	define('UPLOAD_DIR', 'submissions/');
	define('SHARE_URL', 'https://laugfs-super.prvw.ceynet.asia/submissions/'.$fileingName);

	$blob = str_replace(['data:image/png;base64,',' '], ['','+'], $blob);
	$success = file_put_contents(UPLOAD_DIR . $fileingName, base64_decode($blob));
	$msg = $success ? 'Thank you'  : 'Try again';

	echo json_encode([
		'success' => 200,
		'msg' => $msg,
		'status' => (int)$success,
		'uid' => $fileingName,
		'share_url' => SHARE_URL,
		'share_msg' => $childName.' just took part in LAUGFS Super Painter contest. Login to take part in the competition and win valuable gift vouchers from Promate. http://bit.ly/LaugfsSuperPainter'
	]);

	
?>