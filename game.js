class MyGame extends Phaser.Scene {
    constructor() {
      super({ key: 'MyGame' });
    }
  
    preload() {
        //Font
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        WebFont.load({
            google: {
                families: ['Montserrat:semi-bold']            }
        });


        this.load.image('bg', 'assets/bg.png');
        this.load.image('stand', 'assets/stand.png');
        this.load.image('ui', 'assets/ui.png');
        this.load.image('menudown','assets/menu/menu1.png');
        this.load.image('menu1', 'assets/menu/menu1.png');
        this.load.image('menu2', 'assets/menu/menu2.png');
        this.load.image('menu3', 'assets/menu/menu1.png');
        this.load.image('menu1button', 'assets/menu/menu1button.png');
        this.load.image('menu2button', 'assets/menu/menu2button.png');
        this.load.image('menu3button', 'assets/menu/menu3button.png');
        this.load.image('tingkatkanauto', 'assets/menu/tingkatkanauto.png');
    }
  
    create() {
        //Variabel
        this.uang = 0;
        this.harga = 1;
        this.cabang = 1;
        this.auto = 0;

        var bg = this.add.image(0, 0, 'bg').setOrigin(0);
        var stand = this.add.image(250, 1080, 'stand').setOrigin(0);
        this.add.image(80, 90, 'ui').setOrigin(0);

        //Text
        this.uangText = this.add.text(210, 100, `${this.uang}`, { fontSize: '64px', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fill: '#fff' }); 
        this.hargaBeef = this.add.text(210, 205, `Harga Hot-Beef : ${this.harga}`, { fontSize: '32px', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fill: '#fff' });
        this.hargaBeef = this.add.text(210, 275, `Cabang : ${this.cabang}`, { fontSize: '32px', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fill: '#fff' });

        var link = this.add.text(800, 100, 'About Us', { fontSize: '40px', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fill: '#fff'});
        link.setInteractive();

        link.on('pointerup', function() {
            window.location.href = 'aboutus.html';
        });
        //Menu Button
        var menu1button = this.add.image(80,1785,'menu1button').setOrigin(0).setInteractive();
        var menu2button = this.add.image(420,1785,'menu2button').setOrigin(0).setInteractive();
        var menu3button = this.add.image(750,1785,'menu3button').setOrigin(0).setInteractive();

        var menudown = this.add.image(0,1770,'menudown').setOrigin(0);

        var menu1 = this.add.group();
        var menubg = menu1.create(0,1770,'menu1').setOrigin(0);
        
        
        var menu2 = this.add.group();
        var menubg2 = menu2.create(0,1770,'menu2').setOrigin(0);
        
        var tingkatkanauto = menu1.create(810,2000,'tingkatkanauto').setOrigin(0).setInteractive();

        if(this.uang >= 50){
          tingkatkanauto.on('pointerdown', function() {
            this.uang -= 50;
            this.auto += 1;
          });
        }
 
        if(this.auto == 1){
          setInterval(autoClicker, 200);
        }


      function autoClicker() {
        // execute the buy logic here...
    }

        //Animation Menu

        //Menu 1
        var hasMovedmenu1 = false;
        var hasmoved1 = false;
        var hasmoved2 = false;
        var hasmoved3 = false;

        menu1button.on('pointerdown', function() {
          if (!hasMovedmenu1) { // check if the box has already been moved
              this.scene.tweens.add({
                  targets: [menu1button,menubg,menu2button,menu3button,menubg2, tingkatkanauto],
                  y: '-=550',
                  ease: 'Power1',
                  duration: 500,
                  yoyo: false,
                  repeat: 0,
                });

                this.scene.tweens.add({
                  targets: [bg,stand],
                  y: '-=350',
                  ease: 'Power1',
                  duration: 500,
                  yoyo: false,
                  repeat: 0,
                });
                hasMovedmenu1 = true;

                menu1button.y -=35;
                hasmoved1 = true;
                hasmoved2 = false;
                hasmoved3 = false;
            }

            if(!hasmoved1){
              menu1button.y -= 35;
              hasmoved1 = true;
              menu1.setVisible(true);
              menu2.setVisible(false);
              
              if(menu2button){
                menu2button.y += 35;
                hasmoved2 = false;
              }
            }

            menu2.setVisible(false);
      }, menu1button);



      menu2button.on('pointerdown', function() {
        if (!hasMovedmenu1) { // check if the box has already been moved
            this.scene.tweens.add({
                targets: [menu1button,menubg,menu2button,menu3button,menubg2],
                y: '-=550',
                ease: 'Power1',
                duration: 500,
                yoyo: false,
                repeat: 0
            });

            this.scene.tweens.add({
              targets: [bg,stand],
              y: '-=350',
              ease: 'Power1',
              duration: 500,
              yoyo: false,
              repeat: 0,
            });
            hasMovedmenu1 = true;

            menu2button.y -=35
            hasmoved2 = true;
            hasmoved1 = false;
            hasmoved3 = false;
          }
        if(!hasmoved2){
          menu2button.y -= 35;
          hasmoved2 = true;

          menu1.setVisible(false);
          menu2.setVisible(true);
          
          if(menu1button){
            menu1button.y += 35;
            hasmoved1 = false;
          }
        }

    }, menu1button);

        //Screen Tap
        this.input.on('pointerdown', this.onClick, this);
    }

    onClick() {
        let increment = 1;
        increment = this.harga;
        increment *= this.cabang;
      
        this.uang += increment;
        this.uangText.setText(`${this.uang}`);
      }
  }
  
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1080,
    height: 1920,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: MyGame
  };
  
  const game = new Phaser.Game(config);
  