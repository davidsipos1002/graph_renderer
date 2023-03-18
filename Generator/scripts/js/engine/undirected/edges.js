var edges = [];
var m = 0;
var mnumber = 0;

function addEdge(n1, n2)
{
    var edge = {n1: n1, n2: n2, render: true};
    edges.push(edge);
    mnumber++;
    return ++m;
}

function updateEdge(delta, edge)
{
   
}

function renderEdge(context, edge)
{
    context.beginPath();
    context.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--edge_color");
    var x1 = nodes[edge.n1 - 1].x;
    var y1 = nodes[edge.n1 - 1].y;
    var x2 = nodes[edge.n2 - 1].x;
    var y2 = nodes[edge.n2 - 1].y;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = 5;
    context.stroke();
}

function updateEdges(delta)
{
    edges.forEach(edge =>{
        if(edge.render)
            updateEdge(delta, edge);
    });
}

function renderEdges(context)
{
    edges.forEach(edge => {
        if(edge.render)
            renderEdge(context, edge);
    });
}

function deleteEdge(x, y)
{
    var edgenr = 0;
    var mi = 10000000000;

    edges.forEach(edge => {
        if(edge.render)
        {
            var x1 = nodes[edge.n1 - 1].x;
            var y1 = nodes[edge.n1 - 1].y;
            var x2 = nodes[edge.n2 - 1].x;
            var y2 = nodes[edge.n2 - 1].y;

            var mx = (x1 + x2) / 2;
            var my = (y1 + y2) / 2;

            var d = Math.sqrt((mx - x) * (mx - x) + (my - y) * (my - y));

            if(d < mi)
            {
                edgenr = edges.indexOf(edge) + 1;
                mi = d;
            }
        }
    });

    var n1 = nodes[edges[edgenr - 1].n1 - 1].nr;
    var x1 = nodes[edges[edgenr - 1].n1 - 1].x;
    var y1 = nodes[edges[edgenr - 1].n1 - 1].y;
    var n2 = nodes[edges[edgenr - 1].n2 - 1].nr;
    var x2 = nodes[edges[edgenr - 1].n2 - 1].x;
    var y2 = nodes[edges[edgenr - 1].n2 - 1].y;

    var mx = (x1 + x2) / 2;
    var my = (y1 + y2) / 2;

    if(edgenr > 0 && distance(x, y, mx, my) < 25)
    {
        muchii[edges[edgenr - 1].n1][edges[edgenr - 1].n2] = muchii[edges[edgenr - 1].n2][edges[edgenr - 1].n1] = 0;
        edges[edgenr - 1].render = false;
        mnumber--;
    }
}

function deleteEdges()
{
    edges = [];
    m = 0;
    mnumber = 0;
}