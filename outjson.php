<?php 

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");;
header("Content-Disposition: attachment;filename=result.json");
header("Content-Transfer-Encoding: binary ");

$array = array();
$student['storymap'] = array();
$student['storymap']['slide']['date'] = "";
$student['storymap']['slide']['location'] = array('icon'=>"", 'lat'=>"",'line'=>"",'lon'=>"",'zoom'=>"");
$student['storymap']['slide']['media'] = array('caption'=>$_POST['Caption'], 'credit'=>$_POST['Credit'], 'url'=>$_POST['url']);
$student['storymap']['slide']['text'] = array('headline'=>$_POST['title'], 'text'=>$_POST['message']); 

echo json_encode($student);

 ?>