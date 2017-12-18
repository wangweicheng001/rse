var tween={
	linear:function(t,b,c,d){
		return c*t/d+b;//匀速
	},
	easeIn:function(t,b,c,d){
		return c*(t/+d)*t+b;//缓冲
	},
	strongEaseIn:function(t,b,c,d)(){
		return c*(t/=d)*t*t*t*t+b;//弹入
	},
	strongEaseOut:function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t+1)+b;//弹出
	},
	sineaseIn:function(t,b,c,d){
		return c*(t/=d)*t*t+b;//
	},
	sineaseOut:function(t,b,c,d){
		return	c*((t=t/d-1)*t*t+1)+b;//
	}
}

var Animate=function(dom){
	this.dom=dom;//动画节点
	this.startTime=0;//开始时间
	this.startPos=0;//初始位置
	this.endPos=0;//动画结束是节点位置（目标位置）
	this.propertyName=null;//dom节点需要改变css属性名
	this.easing=null;//动画算法
	this.duration=null;//动画持续时间
}
Animate.prototype.start=function(propertyName,endPos,duration,easing){
	this.startTime=+new Date;
	this.endPos=endPos;
	this.startPos=this.dom.getBoundingClientRect()[propertyName];
	this.duration=duration;
	this.easing=easing;

	var self=this;
	var timeId=setInterval(function(){
		if(self.step()===false){
			clearInterval(timeId);
		}
	},19)
}

Animate.protorype.step=function(){
	var t=+new Date;
	if(t>=this.startTime+this.duration){
		this.update(this.endPos);
		return false;
	}
	var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);
	this.update(pos);
}