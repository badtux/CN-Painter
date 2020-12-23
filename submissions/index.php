<?php
	if(!isset($_GET['g'])){
		header('Location: /');
		exit;
	}
	
	define('UPLOAD_DIR', 'submissions/');
    define('BASE_URL', 'https://laugfs-super.prvw.ceynet.asia/');
	$files = array_diff(scandir('../'.UPLOAD_DIR), array('.', '..','index.php'));
	rsort($files);
	foreach ($files as $key => $value) { 
		$artist = explode('-', $value); ?>
		<div style="float: left; border: 1px solid;">
			<a href="<?php echo BASE_URL.'?uid='.$value; ?>">
				<span>
					<img width="250" src="<?php echo $value; ?>" />
				</span>
				<div style="text-align: center; background-color: yellow; height: 20px;">
					<pre><?php echo $artist[2].' ('.substr($artist[3],0,-4).')'; ?></pre>
				</div>
			</a>
		</div>
		<?php
	} 
	
?>