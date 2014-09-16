


var dropCallback=function(event){
	event.preventDefault();
	var tip=document.getElementById("tip");
	var ac=document.getElementById("avatarCanvas");
	var notiNum=document.getElementById("notiNum");
	var ctx=ac.getContext("2d");
	if(event.type=="drop"){
		var files=event.dataTransfer.files;
		var avatar=files[0];
		var reader=new FileReader();
		reader.readAsDataURL(avatar);
		reader.onerror=function(){
			alert("failed to load the picture~");
		};
		reader.onload=function(){
			var imgRes=reader.result;
			var img=new Image();
			img.src=imgRes;
			img.onload=function(){
				var radius=0.25;
				var w=img.width;
				var cw=w*radius;
				var offsetX=w*radius*0.2
				ac.style.background="white";
				ac.width=w+offsetX;
				tip.width=ac.width;
				tip.left=ac.left;

				var h=img.height;	
				var ch=h*radius;
				var offsetY=h*radius*0.2	
				ac.height=h+offsetY;
				ctx.drawImage(img,0,offsetY,w,h);

				var lg=ctx.createLinearGradient(0,0,0,ch);
				lg.addColorStop(0,'rgba(255,0,0,1)');
				lg.addColorStop(1,'rgba(200,0,0,1)');

				ctx.fillStyle=lg;
				ctx.beginPath();
				ctx.arc(ac.width-ch*0.5,ch*0.5,ch*0.5,0,2*Math.PI,false);
				ctx.fill();
				ctx.fillStyle="white";
				ctx.font="bold "+(ch*0.5)+"px Consolas";
				ctx.textAlign="center";
				ctx.fillText(notiNum.value,ac.width-ch*0.5,ch*0.67);
				document.getElementById("dst").href=ac.toDataURL();
				document.getElementById("dst").download="avatar.png";
			};
		};
	}
};
document.addEventListener("dragenter",dropCallback);
document.addEventListener("dragover",dropCallback);
document.addEventListener("drop",dropCallback);

