var undirectededges = [];
var undirectedm = 0;
var undirectedmnumber = 0;

function addUndirectedEdge(n1, n2)
{
    var edge = {n1: n1, n2: n2, render: true};
    undirectededges.push(edge);
    undirectedmnumber++;
    undirectedgrade[n1 - 1]++;
    undirectedgrade[n2 - 1]++;
    return ++m;
}

function updateUndirectedEdge(delta, edge)
{
   
}

function renderUndirectedEdge(context, edge)
{
    context.beginPath();
    context.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--edge_color");
    var x1 = undirectednodes[edge.n1 - 1].x;
    var y1 = undirectednodes[edge.n1 - 1].y;
    var x2 = undirectednodes[edge.n2 - 1].x;
    var y2 = undirectednodes[edge.n2 - 1].y;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function updateUndirectedEdges(delta)
{
    undirectededges.forEach(edge =>{
        if(edge.render)
            updateUndirectedEdge(delta, edge);
    });
}

function renderUndirectedEdges(context)
{
    undirectededges.forEach(edge => {
        if(edge.render)
            renderUndirectedEdge(context, edge);
    });
}

function deleteUndirectedEdge(x, y)
{
    var edgenr = 0;
    var mi = 10000000000;

    undirectededges.forEach(edge => {
        if(edge.render)
        {
            var x1 = undirectednodes[edge.n1 - 1].x;
            var y1 = undirectednodes[edge.n1 - 1].y;
            var x2 = undirectednodes[edge.n2 - 1].x;
            var y2 = undirectednodes[edge.n2 - 1].y;

            var mx = (x1 + x2) / 2;
            var my = (y1 + y2) / 2;

            var d = Math.sqrt((mx - x) * (mx - x) + (my - y) * (my - y));

            if(d < mi)
            {
                edgenr = undirectededges.indexOf(edge) + 1;
                mi = d;
            }
        }
    });

    var n1 = undirectednodes[undirectededges[edgenr - 1].n1 - 1].nr;
    var x1 = undirectednodes[undirectededges[edgenr - 1].n1 - 1].x;
    var y1 = undirectednodes[undirectededges[edgenr - 1].n1 - 1].y;
    var n2 = undirectednodes[undirectededges[edgenr - 1].n2 - 1].nr;
    var x2 = undirectednodes[undirectededges[edgenr - 1].n2 - 1].x;
    var y2 = undirectednodes[undirectededges[edgenr - 1].n2 - 1].y;

    var mx = (x1 + x2) / 2;
    var my = (y1 + y2) / 2;

    if(edgenr > 0 && distance(x, y, mx, my) < 25)
    {
        undirectedmuchii[undirectededges[edgenr - 1].n1][undirectededges[edgenr - 1].n2] = undirectedmuchii[undirectededges[edgenr - 1].n2][undirectededges[edgenr - 1].n1] = 0;
        undirectededges[edgenr - 1].render = false;
        undirectedgrade[n1 - 1]--;
        undirectedgrade[n2 - 1]--;
        undirectedmnumber--;
    }
}

function deleteUndirectedEdges()
{
    undirectededges = [];
    undirectedm = 0;
    undirectedmnumber = 0;
}