$(document).ready(function(){

	class Player{

		constructor(hp=100,baseArmor=10,baseMaxDamage=20,baseMinDamage=10,strength=15,agility=15,intelligence=15,lvl=1){
		this.hp=hp;
		this.baseArmor=baseArmor;
		this.baseMaxDamage=baseMaxDamage;
		this.baseMinDamage=baseMinDamage;
		this.strength=strength;
		this.agility=agility;
		this.intelligence=intelligence;
		this.lvl=lvl;
		}

		baseDamage() {
			let maxDamage=this.strength+this.baseMaxDamage+this.lvl*3;
			let minDamage=this.strength+this.baseMinDamage+this.lvl*3;
			let damage=Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
			return damage;
		}

		modDamage() {
			let critObj=crit.crit();
			let ursaSwipe=ursa.furySwipes();
			let modDamageObj= {
				dmg:(ursaSwipe+this.baseDamage())*critObj.multiply,
				color: critObj.color,
				text: critObj.text
			};
			return modDamageObj;
		} 		
	}

	class Enemy {

		constructor(currentHp,maxHp,armor){
			this.currentHp=currentHp;
			this.maxHp=maxHp;
			this.armor=armor;
			this.doubleHp=this.maxHp*2;

		}

		getDamage(damage) {
			this.currentHp-=damage;
			this.updateHpBar(damage);
			return true;
		}

		reincarnation() {
			if (this.currentHp<=0){
				this.maxHp*=2;
				ursa.currentBonusDmg=0;
				this.currentHp=this.maxHp;
			}
		}

		updateHpBar(damage) {
			let barText=$(".hp"),
			    hBar=$(".health-bar"),
			    bar = hBar.find('.bar'),
			    max=`${this.maxHp}/${this.maxHp}`,
			    current=`${this.currentHp}/${this.maxHp}`,
			    currentHpPerc = (this.currentHp / this.maxHp) * 100;
			  	barText.css('width',`${hBar.width()}`);
			    barText.css('margin-left',`-${barText.width()/2}px`);
			if (currentHpPerc<=0){
				bar.css('width',"100%");
				barText.html(this.maxHp*2+"/"+this.maxHp*2);
				
			}else {
				barText.html(current);
				bar.css('width', currentHpPerc+"%"); 
				
			 }

		}

	}

	class Mechanics {
		constructor(){
			/*To do*/
		}
	}


	class CritMechanic extends Mechanics {
		
		constructor(chance,multiply){
			super();
			this.chance=chance;
			this.multiply=multiply;
		}

		isEnabled() {
			return this.enabled=$("#crit").prop("checked");
			
		}

		crit() {
			let hit = {
				multiply: 1,
				color: "#fff",
				text: "урон: "
			};

			let critHit ={
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

	class UrsaMechanic extends Mechanics {
		constructor(addDmg) {
			super();
			this.addDmg=addDmg;
			this.currentBonusDmg=0;
		}

		isEnabled() {
			return this.enabled=$("#ursa").prop("checked");
			
		}	
    /*Надо думать*/
	/*	get CurrentBonusDmg() {
			return this.currentBonusDmg;
		}

		set CurrentBonusDmg(value) {

			this.currentBonusDmg=value;
			console.log("setter вызвался");

		}*/

		furySwipes() {
			
			if(this.isEnabled()) {
				let dmg=this.addDmg;
				 this.currentBonusDmg+=dmg;
				return this.currentBonusDmg;
			} else {
				return 0;
			}
		}
	}


		let me = new Player();
		let crit=new CritMechanic(30,2);
		let ursa=new UrsaMechanic(15);
		let enemy=new Enemy(200,200,100);

    	console.log(me);
    	console.log(crit);
    	console.log(ursa);
    	

	$(".sprite").click(function(){
		let now = new Date();
		let time= now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
		let modDamageObj=me.modDamage();
		enemy.getDamage(modDamageObj.dmg);
		enemy.reincarnation();
		$(".console").prepend(`<p>${time} <span style=color:${modDamageObj.color}>${modDamageObj.text}
		 ${modDamageObj.dmg} </span></p>`);
		console.log(enemy.currentHp);
	});
let menu=document.getElementById("menu");
		sprite.onclick = function() {
let width=320,
	height=286,
	frames=14,
	currentFrame=0,
	canvas=document.getElementById("sprite"),
	ctx=canvas.getContext("2d"),
	image=new Image();
	image.src="../img/sprite.png";
	let mouseX=event.clientX-document.documentElement.clientWidth/2+width/2-83;
	let mouseY=event.clientY-height/2-35;
	let timerId = setInterval(function() {
 draw();
}, 17);
console.log(mouseX+" " +mouseY)
let draw = function() {
	ctx.clearRect(90,7,width,height);
	ctx.drawImage(image,width*currentFrame,0,width,height,mouseX,mouseY,width,height);



	if(currentFrame==frames){
		clearInterval(timerId);
		ctx.clearRect(90,7,width,height);
	} else {
		currentFrame++;
	}
}

}
});