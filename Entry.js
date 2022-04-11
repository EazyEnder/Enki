//Contains the entry that the user edits
var edit_entry;
var edit_entry_freeze = [0,0];


class Entry{

    constructor(node_parent,position, size, var_type, entry_type, id){

        this.node_parent = node_parent;
        this.pos = position;
        this.var_type = var_type;
        this.entry_type = entry_type;
        this.id = id;
        this.size = size;

        this.connectors = [];

    }

    enableOnUI(){
        var node_div = document.getElementById(this.node_parent.uuid);
        if(node_div != null && node_div != undefined){

            var button = document.createElement("button");
            button.id = "Entry:"+this.id;
            node_div.appendChild(button);
    
            button.style.padding = "0";
            button.style.margin = "0";
            button.style.zIndex = "2";
            button.style.position = "absolute";
            button.style.width = this.size+"px";
            button.style.height = this.size+"px";
            button.style.opacity = 0;
            button.style.left = this.pos[0]-this.size/2+"px";
            button.style.top = this.pos[1]-this.size/2+"px";

            button.style.display = "inline-block";
            button.style.borderRadius = "50%";

            var entrycop = this;

            button.addEventListener('click',function(){
                if(entrycop.entry_type == "Output"){
                    edit_entry = entrycop;
                }
                if(entrycop != edit_entry && entrycop.entry_type == "Input" && edit_entry != null && edit_entry != undefined){
                    var connect = new Connector(edit_entry.node_parent, entrycop.node_parent
                        , "", edit_entry.id, entrycop.id, edit_entry, entrycop)
                    entrycop.connectors.push(connect);
                    edit_entry.connectors.push(connect);
                }
            })

        }
    }

    drawConnectors(){
        this.connectors.forEach(element => {
            if(!element.isDraw){
            element.draw();
            element.isDraw = true;
            }
        });
    }

    disableOnUI(){

    }

    isConnected(){

    }

    

}