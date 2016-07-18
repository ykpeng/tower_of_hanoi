function HanoiView(game, $el) {
  this.game = game;
  this.$el = $el;
  this.hasClicked = false;
  this.fromTowerIdx = null;
  this.setupTowers();
  this.render();

  this.clickTower();
}

HanoiView.prototype.clickTower = function () {
  this.$el.on("click", "ul", (e)=>{
    const tower = e.currentTarget;
    let idx = this.$el.children().index(tower);
    if(this.hasClicked) {
      const toTowerIdx = idx;
      let res = this.game.move(this.fromTowerIdx, toTowerIdx);
      if (!res) {
        alert("Invalid Move!");
      } else {
        this.render();
      }
      this.hasClicked = false;

      if (this.game.isWon()) {
        $(tower).children().addClass("green");
        alert("You won!");
      }
      this.$el.children().eq(this.fromTowerIdx).toggleClass("clicked", this.hasClicked);
    } else {
      this.fromTowerIdx = idx;
      this.hasClicked = true;
      $(tower).toggleClass("clicked", this.hasClicked);
    }
  });
};

HanoiView.prototype.setupTowers = function () {
  for (let i = 0; i < 3; i++) {
    let $tower = $("<ul></ul>");
    for (let j = 0; j < 3; j++) {
      $($tower).append($("<li></li>"));
    }
    this.$el.append($tower);
  }
};

HanoiView.prototype.render = function () {
  const $towers = this.$el.children();

  const towers = this.game.towers;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let val = towers[i][j];

      let $discs = $($towers[i]).children();
      let $disc = $($discs[2 - j]);

      if (val) {
        $disc.addClass(`_${val}`);
      } else {
        $disc.removeClass();
      }
    }
  }
};


module.exports = HanoiView;
