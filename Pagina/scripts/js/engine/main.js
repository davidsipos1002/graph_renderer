var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var firstClick = true;
var x1 = 0, y1 = 0, nr = 0;
var rect = canvas.getBoundingClientRect();
var rect = canvas.parentNode.getBoundingClientRect();
canvas.width = 600;
canvas.height = 600;
document.onmousemove = moveNode;

window.onload = init;

function init()
{
    window.requestAnimationFrame(mainLoop);
    updatePopup();
    loadContents();
    populateExercises();
    console.log("Proiect realizat de David Oliver Șipoș și Văsuț Oana");
}

function update(delta)
{
    if(mode != 3)
    {
        if(directed)
            updateNodes(delta);
        else
            updateUndirectedNodes(delta);
    }
    if(directed)
        updateEdges(delta);
    else
        updateUndirectedEdges(delta);
}

function render()
{
    context.lineWidth = lineWidth;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--graph_background");
    context.fill();
    if(directed)
    {
        renderEdges(context);
        renderNodes(context);
    }
    else
    {
        renderUndirectedEdges(context);
        renderUndirectedNodes(context);
    }
}

var delta = 0;
var oldTimeStamp = 0;

function mainLoop(timeStamp)
{
    delta = (timeStamp - oldTimeStamp) / 1000;
    delta = Math.min(delta, 0.1);
    oldTimeStamp = timeStamp;
    console.log(1/delta);
    update(delta);
    render();

    window.requestAnimationFrame(mainLoop);
}

function closestCircle(x, y)
{
    var nr = -1;
    var mind = 100000000;
    if(directed)
    {
         nodes.forEach(node => {
            var d = distance(x, y, node.x, node.y);
            if(d < mind)
            {
                mind = d;
                nr = node.nr;
            }
        });
    }
    else
    {
        undirectednodes.forEach(node => {
            var d = distance(x, y, node.x, node.y);
            if(d < mind)
            {
                mind = d;
                nr = node.nr;
            }
        });
    }
    return nr;
}

function isAtEdges(x, y)
{
    if(x > 2 * r && x < canvas.width - 2 * r && y > 2 * r && y < canvas.height - 2 * r)
        return 0;
    return 1;
}

canvas.addEventListener("mousedown", function(e) 
{ 
    var x = e.offsetX;
    var y = e.offsetY;
    if(mode == 1)
    {
        if(directed)
        {
            if(n > 0 && n < 20)
            {
                var nodenr = closestCircle(x, y);
                var d = distance(x, y, nodes[nodenr - 1].x, nodes[nodenr - 1].y);
                if(d > 2 * r + 5 && !isAtEdges(x, y))
                {
                    addNode(x, y, false, 0, 0);
                    updatePopup();
                }
            }
            else if(n == 0 && !isAtEdges(x, y))
            {
                addNode(x, y, false, 0, 0);
                updatePopup();
            }
        }
        else
        {
            if(undirectedn > 0 && undirectedn < 20)
            {
                var nodenr = closestCircle(x, y);
                var d = distance(x, y, undirectednodes[nodenr - 1].x, undirectednodes[nodenr - 1].y);
                if(d > 2 * r + 5 && !isAtEdges(x, y))
                {
                    addUndirectedNode(x, y, false, 0, 0);
                    updatePopup();
                }
            }
            else if(undirectedn == 0 && !isAtEdges(x, y))
            {
                addUndirectedNode(x, y, false, 0, 0);
                updatePopup();
            }
        }
    }
    else if(mode == 2)
    {
        if(directed)
        {
            if(firstClick)
            {   
                nr = closestCircle(x, y);
                if(distance(x, y, nodes[nr - 1].x, nodes[nr - 1].y) < r + 5)
                {
                    nodes[nr - 1].selected = true;
                    x1 = nodes[nr - 1].x;
                    y1 = nodes[nr - 1].y;
                    firstClick = false;
                    muchie = true;
                }
            }
            else
            {
                var nodenr = closestCircle(x, y);
                if(nodenr != nr && distance(x, y, nodes[nodenr - 1].x, nodes[nodenr - 1].y) < r + 5 && muchii[nr][nodenr] == 0)
                {
                    var t = addDirectedEdge(nr, nodenr);
                    muchii[nr][nodenr] = t;
                    updatePopup();
                }
                nodes[nr - 1].selected = false;
                firstClick = true;
                muchie = false;
                x1 = 0, y1 = 0, nr = 0;
            }
        }
        else
        {
            if(firstClick)
            {
                nr = closestCircle(x, y);
                if(distance(x, y, undirectednodes[nr - 1].x, undirectednodes[nr - 1].y) < r + 5)
                {
                    undirectednodes[nr - 1].selected = true;
                    x1 = undirectednodes[nr - 1].x;
                    y1 = undirectednodes[nr - 1].y;
                    firstClick = false;
                    muchie = true;
                }
            }
            else
            {
                var nodenr = closestCircle(x, y);
                if(nodenr != nr && undirectedmuchii[nr][nodenr] == 0 && distance(x, y, undirectednodes[nodenr - 1].x, undirectednodes[nodenr - 1].y) < r + 5)
                {
                    var edgenr = addUndirectedEdge(nr, nodenr, "black");
                    undirectedmuchii[nr][nodenr] = undirectedmuchii[nodenr][nr] = edgenr;
                    updatePopup();
                }
                undirectednodes[nr - 1].selected = false;
                firstClick = true;
                muchie = false;
                x1 = 0, y1 = 0, nr = 0;
            }
        }
    }
    else if(mode == 3)
    {
        if(directed)
        {
            if(!edit)
            {
                nr = closestCircle(x, y);
                if(distance(x, y, nodes[nr - 1].x, nodes[nr - 1].y) < r + 5)
                {
                    nodes[nr - 1].selected = true;
                    edit = true;
                }
            }
            else
            {
                var nodenr = 0;
                var mind = 100000000;
                nodes.forEach(node => {
                    var d = distance(x, y, node.x, node.y);
                    if(d < mind && node.nr != nr)
                    {
                        mind = d;
                        nodenr = node.nr;
                    }
                });
                if(mind > 2 * r + 5 && !isAtEdges(x, y)) 
                {
                    nodes[nr - 1].selected = false;
                    edit = false;
                    nr = 0;
                }
            }
        }
        else
        {
            if(!edit)
            {
                nr = closestCircle(x, y);
                if(distance(x, y, undirectednodes[nr - 1].x, undirectednodes[nr - 1].y) < r + 5)
                {
                    undirectednodes[nr - 1].selected = true;
                    edit = true;
                }   
            }
            else
            {
                var nodenr = 0;
                var mind = 100000000;
                undirectednodes.forEach(node => {
                    var d = distance(x, y, node.x, node.y);
                    if(d < mind && node.nr != nr)
                    {
                            mind = d;
                            nodenr = node.nr;
                    }
                });
                if(mind > 2 * r + 5 && !isAtEdges(x, y)) 
                {
                    undirectednodes[nr - 1].selected = false;
                    edit = false;
                    nr = 0;
                }
            }
        }
    }
    else if(mode == 4)
    {
        if(directed)
            deleteDirectedEdge(x, y);
        else
            deleteUndirectedEdge(x, y);
        updatePopup();
    }
});

function moveNode(e)
{
    if(directed)
    {
        if(mode == 3 && edit && nr != 0)
        {
            var x = e.offsetX 
            var y = e.offsetY;
            for(var i = 1;i <= n;i++)
            {
                if(muchii[nr][i])
                {
                    calculateDirectedEdge(edges[muchii[nr][i] - 1]);
                }
                if(muchii[i][nr])
                {
                    calculateDirectedEdge(edges[muchii[i][nr] - 1]);
                }   
            }
            nodes[nr - 1].x = x;
            nodes[nr - 1].y = y;
        }
    }
    else
    {
        if(mode == 3 && edit && nr != 0)
        {
            var x = e.offsetX;
            var y = e.offsetY
            for(var i = 1;i <= n;i++)
            {
                if(undirectedmuchii[nr][i])
                {
                    if(undirectededges[undirectedmuchii[nr][i] - 1].x1 == undirectednodes[nr - 1].x && undirectededges[undirectedmuchii[nr][i] - 1].y1 == undirectednodes[nr - 1].y)
                    {
                        undirectededges[undirectedmuchii[nr][i] - 1].x1 = x;
                        undirectededges[undirectedmuchii[nr][i] - 1].y1 = y;
                    }
                    else
                    {
                        undirectededges[undirectedmuchii[nr][i] - 1].x2 = x;
                        undirectededges[undirectedmuchii[nr][i] - 1].y2 = y;
                    }
                }
            }
            undirectednodes[nr - 1].x = x;
            undirectednodes[nr - 1].y = y;
        }
    }
}