new Vue ({
    el : "#exercise",
    data : {
        game_is_on : false,
        playerHealth : 100,
        monsterHealth : 100,
        logs : []
    },
    
    methods : {
        startGame: function() {
            this.game_is_on = !this.game_is_on
        },
        attack: function() {
           var point = Math.ceil(Math.random() * 10);
           this.monsterHealth-=point;
           this.monsterAttack();
           this.add_to_log({turn : "p" , text : "Attack ( " + point + ")"})

        },

        specialAttack: function() {
           var point = Math.ceil(Math.random() * 25);
           this.monsterHealth-=point;
           this.monsterAttack();
           this.add_to_log({ turn : "p" , text : "Special Attack ( " + point + ")" })
        },

        healUp: function(){
            var point = Math.ceil(Math.random() * 20);
            this.playerHealth+=point;
            this.monsterAttack();
            this.add_to_log({ turn : "p" , text : "Heal Up ( " + point + ")" })
         },
        
        giveUp: function (){
            this.playerHealth = 0;
            this.add_to_log({ turn : "p" , text : "Give Up"})
        },

        monsterAttack: function(){
           var point = Math.ceil(Math.random() * 15);
           this.playerHealth-=point;
           this.add_to_log({ turn : "m" , text : "Monster Attack ( " + point + ")" })
        },

        add_to_log: function (log){
            this.logs.push(log)
        }
    },

    watch: {
        playerHeal: function(value){
            if (value <= 0) {
                this.playerHealth = 0;
                if(confirm("You lost the game. Do you want to try again?")){
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.playerHealth = 100;
            } 
        },

        monsterHeal: function(value){
            if (value < 0) {
                this.monsterHeal = 0;
                if(confirm("You win the game. Congratulations!")){
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                }
            }
        }
    },

    computed: {
        playerProgress: function() {
            return{
                width: this.playerHealth + '%'
            }
        },

        monsterProgress: function() {
            return{
                width: this.monsterHealth + '%'

            }
        }
    }
});