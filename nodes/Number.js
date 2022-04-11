class Node_Number extends BlueprintNode {
    constructor(outputs,pos){
        super([],outputs,"Primitive_Value",pos,"Circle");

        this.size = 50;
        this.value = 0;

        if(this.outputs != undefined && this.outputs != null && this.outputs.length == 0){
            this.outputs = [null];
        }

        this.uuid = "Number:"+uuidv4();

        this.createUI();

        this.outputs_entry = [new Entry(this,
            [this.size*3, this.size*2/2],
            this.size/4 * 2,
            "Number",
            "Output",
            0)];

        this.outputs_entry.forEach(entry => {
            
            entry.enableOnUI();

        });



    }

    draw(){

            super.draw();
 
            ctx.beginPath();
            ctx.shadowColor = main_color;
            ctx.shadowBlur = 2;
            ctx.fillStyle = main_color;
            ctx.rect(this.pos[0],this.pos[1]-this.size, this.size*3, this.size*2);
            ctx.fill();
            ctx.strokeStyle = "rgba(0,0,0,0.5)"; 
            ctx.stroke();
            ctx.closePath();

        ctx.beginPath();
        ctx.shadowColor = main_color;
        ctx.shadowBlur = 2;
        ctx.fillStyle = main_color;
        ctx.arc(this.pos[0],this.pos[1],this.size/2,0,2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.5)"; 
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.restore();
        ctx.font = (this.size-0.1*this.size)+'px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = "white";   
        ctx.fillText("0", this.pos[0],this.pos[1]+0.7*this.size/2);
        ctx.stroke();
        ctx.closePath();
    }

    createUI(){

        var sizeoftextbox = this.size*2;

        var div = document.createElement("div");
        div.id = this.uuid;
        document.body.appendChild(div);

        div.style.padding = "0";
        div.style.margin = "0";
        div.style.zIndex = "2";
        div.style.position = "absolute";
        div.style.width = this.size*3+"px";
        div.style.height = this.size*2+"px";
        div.style.backgroundColor = "RGBa(20,20,20,0)";
        div.style.opacity = 1;
        div.style.left = this.pos[0]+"px";
        div.style.top = this.pos[1]-this.size+"px";

        div.addEventListener('mousedown',this.onMouseDown , false);
        div.addEventListener('mouseup',this.onMouseUp , false);
        div.addEventListener('mousemove',this.onMouseMove , false);
        div.addEventListener('mouseover',this.onMouseOver , false);

        div.addEventListener('dblclick',this.onDoubleClick , false);




        var input_value = document.createElement("input");
        input_value.value = 0;
        input_value.id = this.uuid+"value";
        input_value.style.position = "absolute";
        input_value.style.width = sizeoftextbox+"px";
        input_value.style.height = this.size*0.5+"px";
        input_value.style.left = this.size*3/2-sizeoftextbox/2.1+"px";
        input_value.style.top = this.size*2/2-this.size*0.5/2+"px";
        input_value.style.backgroundColor = font_color;
        div.appendChild(input_value);

        input_value.addEventListener('input',changeValue, false);

        function changeValue(event){
            var target = event.target || event.srcElement;
            var n = searchNode(target.id.substring(0,target.id.length-"value".length));
            n.value = document.getElementById(target.id).value;
        }

    }


}