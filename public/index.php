<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= TITLE ?></title>

    <link rel="stylesheet" href="public/css/style.css">
    <script src="public/js/game.js" defer></script>
</head>
<body>
    <main>
        <div class="score-board">
            <h1 id="score">0</h1>
        </div>
        <canvas class="frame" width="500" height="500">
            <div id="hide" class="grid"></div>
        </canvas>
    </main>
</body>
</html>