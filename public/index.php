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

            <div class="mute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <g fill="#000">
                        <polygon points="14.025,38.004 14.025,61.993 31.548,61.993 55.537,85.982 55.537,14.018 31.552,38.004"></polygon>
                        <path d="M67.41,34.095l-4.243,4.239c6.43,6.432,6.43,16.896,0,23.324L67.41,65.9C76.179,57.129,76.179,42.864,67.41,34.095z"></path>
                        <path d="M75.89,25.616l-4.241,4.239c11.105,11.105,11.105,29.176,0,40.284l4.241,4.241C89.337,60.934,89.337,39.06,75.89,25.616z"></path>
                    </g>
                </svg>
            </div>
        </div>
        <?php require_once(PATH_COMPONENTS . 'popup.php'); ?>
        <?php require_once(PATH_COMPONENTS . 'canvas.php'); ?>
    </main>
</body>
</html>