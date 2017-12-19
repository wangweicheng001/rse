var tween={
	linear: function( t, b, c, d ){
		return c*t/d + b; 
	},
	easeIn: function( t, b, c, d ){ 
		return c * ( t /= d ) * t + b;
	},
	strongEaseIn: function(t, b, c, d){
		return c * ( t /= d ) * t * t * t*t+b;
	},
	strongEaseOut: function(t, b, c, d){
		return c * ( ( t = t / d - 1) * t*t*t*t+1)+b
	},
	sineaseIn: function( t, b, c, d ){
		return c * ( t /= d) * t * t + b; 
	},
	sineaseOut: function(t,b,c,d){
		return c * ( ( t = t / d - 1) * t*t+1)+b;
	} 
};
	 

var Animate=function(dom){
	this.dom=dom;//动画节点
	this.startTime=0;//开始时间
	this.startPos=0;//初始位置
	this.endPos=0;//动画结束是节点位置（目标位置）
	this.propertyName=null;//dom节点需要改变css属性名
	this.easing=null;//动画算法
	this.duration=null;//动画持续时间
}

Animate.prototype.update=function(pos){
	this.dom.style[this.propertyName]=pos+'px';
}

Animate.prototype.step=function(){
	var t=+new Date;
	if(t>=this.startTime+this.duration){
		this.update(this.endPos);
		return false;
	}
	var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);
	this.update(pos);
}

Animate.prototype.start=function(propertyName,endPos,duration,easing){
	this.startTime=+new Date;
	this.endPos=endPos;
	this.startPos=this.dom.getBoundingClientRect()[propertyName];
	this.propertyName=propertyName;
	this.duration=duration;
	this.easing=tween[easing];

	var self=this;
	var timeId=setInterval(function(){
		if(self.step()===false){
			clearInterval(timeId);
			// self.dom.parentNode.removeChild(self.dom);
			
		}
	},19)
}







