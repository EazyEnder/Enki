class Connector{

    constructor(node_parent, node_target, type, id1, id2, entry1, entry2){

        this.node_parent = node_parent;
        this.node_target = node_target;
        this.type = type;
        this.id1 = id1;
        this.id2 = id2;
        this.entry1 = entry1;
        this.entry2 = entry2;

        this.isDraw = false;

        this.value = undefined;

        if(node_parent.outputs != null && node_parent.outputs != undefined){
            if(node_parent.length >= id1+1){
                node_parent.outputs[id1] = this;
            }
        }
        if(node_target.inputs != null && node_target.inputs != undefined){
            if(node_target.length >= id2+1){
                node_target.inputs[id2] = this;
            }
        }

        this.uuid = "Connector:"+uuidv4();

    }

    launch(){
        this.node_target.loadOperation(this.id2, this.value);
    }

    draw(){

            var absolute_rect = document.getElementById(this.entry1.node_parent.uuid).getBoundingClientRect();
            var absolute_pos = [absolute_rect.x,absolute_rect.y];

            var absolute_rect_t = document.getElementById(this.entry2.node_parent.uuid).getBoundingClientRect();
            var absolute_pos_t = [absolute_rect_t.x,absolute_rect_t.y];

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = main_color;
            ctx.moveTo(absolute_pos[0]+this.entry1.pos[0],absolute_pos[1]+this.entry1.pos[1]);
            ctx.lineTo(absolute_pos_t[0]+this.entry2.pos[0],absolute_pos_t[1]+this.entry2.pos[1]);
            ctx.stroke();
            ctx.closePath();

    }

}