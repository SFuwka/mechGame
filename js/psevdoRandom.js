$(document).ready(function(){

	class Player{

		constructor(hp,baseMaxDamage,baseMinDamage,strength,agility,intelligence,lvl){
		this.hp=hp||100;
		this.baseMaxDamage=baseMaxDamage || 20;
		this.baseMinDamage=baseMinDamage || 10;
		this.strength=strength || 15;
		this.agility=agility || 15;
		this.intelligence=intelligence || 15;
		this.lvl=lvl || 1;
		}

		baseDamage() {
			var maxDamage=this.strength+this.baseMaxDamage+this.lvl*3;
			var minDamage=this.strength+this.baseMinDamage+this.lvl*3;
			var damage=Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
			return damage;
		}

		modDamage() {
			var critObj=crit.crit();
			var modDamageObj= {
				dmg:this.baseDamage()*critObj.multiply,
				color: critObj.color,
				text: critObj.text
			};
			return modDamageObj;
		} 
		

		hit() {

		}
	}

	class Enemy {

		constructor(currentHp,maxHp,armor){
			this.currentHp=currentHp;
			this.maxHp=maxHp;
			this.armor=armor;
		}

		getDamage(damage) {
			this.currentHp-=damage;
			this.updateHpBar(damage);
			return true;
		}

		reincarnation() {
			if (this.currentHp<=0){
				this.maxHp*=2;
				this.currentHp=this.maxHp;
			}
		}

		updateHpBar(damage) {
			var hBar=$(".health-bar"),
			    bar = hBar.find('.bar');

			var currentHpPerc = (this.currentHp / this.maxHp) * 100;
			if (currentHpPerc<=0){
				bar.css('width',"100%")
			}else {
				bar.css('width', currentHpPerc+"%"); 
			 }

		}

	}


	class Crit {
		
		constructor(chance,multiply){
			this.chance=chance;
			this.multiply=multiply;
		}

		isEnabled() {
			return this.enabled=$("#crit").prop("checked");
			
		}

		crit() {
			var hit = {
				multiply: 1,
				color: "#fff",
				text: "урон: "
			};

			var critHit ={
				multiply: this.multiply,
				color: "#FF0000",
				text: "критический урон: "
			};
			if(this.isEnabled()) {
			if (Math.floor(Math.random() * 101)>this.chance){
				return hit;
			} else return critHit;
			} return hit;
		}	
	}


		var me = new Player();
		var crit=new Crit(30,2);
		var enemy=new Enemy(200,200,100);

    	console.log(me);
    	console.log(crit);
    	

	$(".regularRandom").click(function(){
		var now = new Date();
		var time= now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
		var modDamageObj=me.modDamage();
		enemy.getDamage(modDamageObj.dmg);
		enemy.reincarnation();
		$(".console").prepend("<p>"+time+"&nbsp "+"<span style="+"color:"+modDamageObj.color+">"+modDamageObj.text+modDamageObj.dmg+" </p>");
		console.log(enemy.currentHp);
	});
});