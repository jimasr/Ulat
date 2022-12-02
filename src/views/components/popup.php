<div class="modal active">
    <div class="modal-header">
        <h1><?= TITLE ?></h1>
        <p>A snake game</p>
    </div>
    <div class="modal-body">
        <button id="play"><?= PLAY ?></button>
        <button id="mode"><?= GAME_MODE?></button>
        <button id="highscore"><?= HIGHSCORES ?></button>
    </div>
</div>
<script type="module" src="<?= PATH_JS . "components/popup.js" ?>"></script>
