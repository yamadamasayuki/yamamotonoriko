<meta charset="utf-8">
<?php
error_reporting(-1);

$mailto = 'yama3da.210@gmail.com';
$toppage = "../";
$input = array();

foreach($_POST as $key => $value){
  #無効化
  $value = htmlentities($value, ENT_QUOTES, "UTF-8");

  #改行処理
  if($key === "comment"){
    $value = str_replace("¥r¥n", "<br>", $value);
    $value = str_replace("¥r", "<br>", $value);
    $value = str_replace("¥n", "<br>", $value);
  }else{
    $value = str_replace("¥r¥n", "", $value);
    $value = str_replace("¥r", "", $value);
    $value = str_replace("¥n", "", $value);
  }

  $input[$key]=$value;
}

if ($_POST["mode"] == "post") {
	conf_form();
} else if($_POST["mode"] == "send") {
	send_form();
}

//////////////////////////////////////////////////
// 確認画面
//////////////////////////////////////////////////

function conf_form(){
	
global $input;

  # テンプレート読み込み
  $conf = fopen("tmpl/conf.tmpl","r") or die;
  $size = filesize("tmpl/conf.tmpl");
  $data = fread($conf , $size);
  fclose($conf);

  # 文字置き換え
  $data = str_replace("!name!", $input[name], $data);
  $data = str_replace("!tel!", $input[tel], $data);
  $data = str_replace("!email!", $input[email], $data);
  $data = str_replace("!comment!", $input[comment], $data);

   # 表示
   echo $data;
   exit;
}

//////////////////////////////////////////////////
// 完了画面
//////////////////////////////////////////////////
  
  function send_form(){

	send_mail();

  # テンプレート読み込み
	$conf = fopen("tmpl/send.tmpl","r") or die;
	$size = filesize("tmpl/send.tmpl");
	$data = fread($conf , $size);
	fclose($conf);

	#文字置き換え
	global $toppage;
	$data = str_replace("!top!", $toppage, $data);
	#表示
	echo $data;
	exit;
}

//////////////////////////////////////////////////
// メール送信
//////////////////////////////////////////////////

function send_mail(){
  $date = date('Y/m/d H:i:s');
  $ip = getenv('REMOTE_ADDR');
  
  global $input;

#お客様宛

$mybody = <<< _FORM_
  フォームメールより、次の通り連絡がありました。

  日時：$date
  IP情報：$ip
  お名前：$input[name]
  電話番号：$input[tel]
  E-mail：$input[email]

  お問合わせ内容
  $input[comment]
_FORM_;

  global  $mailto;
  mb_language('japanese');
  mb_internal_encoding('UTF-8');
  $name_sendonly = 'ホームページお問い合わせ';
  $name_sendonly = mb_encode_mimeheader($name_sendonly);
  $mail_sendonly = 'info@yamamotonoriko.com';
  $mailform = 'From:'.$name_sendonly.'<'.$mail_sendonly.'>';
  $mysubject = 'フォームから連絡がありました。';
  mb_send_mail($mailto,$mysubject,$mybody,$mailform);


#スタッフ宛

  $body = <<< _FORM_
  $input[name] 様

  この度は、山本倫子のホームページよりお問合わせいただきありがとうございます。
  以下の通り承りました。

  日時：$date
  お名前：$input[name]
  電話番号：$input[tel]
  E-mail：$input[email]

  お問合わせ内容
  $input[comment]

  返答につきましては、後日メールにてお送りさせていただきます。
  尚、こちらのメールアドレスは送信専用となっているため、ご返信いただくことができません。
  今しばらくお待ちいただけますようお願い申し上げます。


  山本 倫子
_FORM_;

  mb_language('japanese');
  mb_internal_encoding('UTF-8');
  $name_sendonly = 'Photographer山本倫子';
  $name_sendonly = mb_encode_mimeheader($name_sendonly);
  $mail_sendonly = 'info@yamamotonoriko.com';
  $mailform = 'From:'.$name_sendonly.'<'.$mail_sendonlu.'>';
  $subject = '【 Photographer山本倫子 】お問い合わせいただきありがとうございます。';
  mb_send_mail($input[email], $subject, $body, $mailform);
  mb_send_mail($mailto,$mysubject,$body,$mailform);


}
