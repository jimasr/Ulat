<?php require_once '../src/init.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= TITLE ?></title>
    <link rel="stylesheet" href="<?= PATH_CSS . 'style.css'?>">
    <link rel="stylesheet" href="<?= PATH_CSS . 'components/popup.css'?>">

    <script type="module" src="<?= PATH_JS . 'main.js' ?>" defer></script>
    <script type="module" src="<?= PATH_JS . 'components/popup.js' ?>" defer></script>

</head>
<body>
    <main class="no-scroll">
        <div class="score-board">
            <h1 id="score">0000</h1>
        </div>
        <?php require_once(PATH_COMPONENTS . 'popup.php'); ?>
        <?php require_once(PATH_COMPONENTS . 'canvas.php'); ?>
    </main>
</body>
</html>