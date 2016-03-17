<?php
require_once "Google2fa.php";
if($_POST['key']){
  $key    = $_POST['key'];
  $ts     = Google2FA::get_timestamp();
  $secret = Google2FA::base32_decode($key);
  $otp    = Google2FA::oath_hotp($secret, $ts);
  $otps   =array();
  echo json_encode(array(
    "result"=>0,
    "otp"=>$otp,
    "time"=>$ts,
    "otps"=>$otps
  ));
}else{
  echo "{result:1}";
}
?>
