var nodes = [];
var n = 0;
var r = 20;

function addNode(x, y, selected, speedX, speedY)
{
    var node = {x : x, y : y, nr : ++n, selected, speedX: speedX, speedY: speedY};
    nodes.push(node);
}

function updateNode(delta, node)
{
    node.x += (node.speedX * delta);
    node.y += (node.speedY * delta);
}

function renderNode(context, node)
{
    context.beginPath();
    context.arc(node.x, node.y, r, 0, 2 * Math.PI);
    if(node.selected)
        context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_selected_color");
    else
        context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_color");
    context.fill();
    context.font = "20px AlfaSlabOne";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--node_text_color");
    context.fillText(node.nr + "", node.x, node.y);
}

function renderNodes(context)
{
    nodes.forEach(node => {
        renderNode(context, node);
    });
}

function updateNodes(delta)
{
    nodes.forEach(node =>{
        updateNode(delta, node);
    });
}

function deleteNodes()
{
    nodes = [];
    n = 0;
}