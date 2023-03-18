var directededges = [];
var directedcurve = [];
var directedm = 0;
var directedmnumber = 0;

for(var i = 0;i <= 22;i++)
{
    directedcurve[i] = new Array(22);
    for(var j = 0;j <= 22;j++)
        directedcurve[i][j] = 0;
}

function addDirectedEdge(n1, n2)
{
    var edge = {n1: n1, n2: n2, xc: 0, yc: 0, xm: 0, ym: 0, xa1: 0, ya1: 0, xa2: 0, ya2: 0, render: true};
    calculateDirectedEdge(edge);
    directededges.push(edge);
    directedmnumber++;
    return ++directedm;
}

function dr(x, y, xm, ym, m)
{
    return y - ym - m * x + m * xm;
}

function convertCoordinates(x, y)
{
    return [x, -y + canvas.height];
}

function getMidPointBezier(x1, y1, x2, y2, xc, yc)
{
    var t = 0.5;
    return {
        x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * xc + t * t * x2,
        y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * yc + t * t * y2
    }
}

function distance(x1, y1, x2, y2)
{
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function calculateDirectedEdge(edge)
{
    var x1 = directednodes[edge.n1 - 1].x;
    var y1 = directednodes[edge.n1 - 1].y;
    var x2 = directednodes[edge.n2 - 1].x;
    var y2 = directednodes[edge.n2 - 1].y;
    if(x1 == x2 || y1 == y2)
        return;
    var n1 = edge.n1;
    var n2 = edge.n2;
    var coord = convertCoordinates(x1, y1);
    x1 = coord[0], y1 = coord[1];
    coord = convertCoordinates(x2, y2);
    x2 = coord[0], y2 = coord[1];

    var m = (y1 - y2) / (x1 - x2);
    var d = distance(x1, y1, x2, y2);
    var dm = d * Math.sqrt(3) / 6;
    var xm = (x1 + x2) / 2;
    var ym = (y1 + y2) / 2;
    var mmed = -1/m;

    var xtemp = Math.sqrt(dm * dm / (1 + mmed * mmed));
    var ytemp = Math.sqrt(dm * dm * mmed * mmed / (1 + mmed * mmed));
    var coord1 = convertCoordinates(x1, y1);
    var coord2 = convertCoordinates(x2, y2);

    var id = 0;

    var ec = Math.abs(dr(xtemp + xm, ytemp + ym, xm, ym, mmed));
    if(ec < 0.0001 && directedcurve[n2][n1] != 1 && id == 0)
    {
        coord = convertCoordinates(xtemp + xm, ytemp + ym);
        var mij = getMidPointBezier(coord1[0], coord1[1], coord2[0], coord2[1], coord[0], coord[1]);
        id = 1;
        edge.xc = coord[0];
        edge.yc = coord[1];
        edge.xm = mij.x;
        edge.ym = mij.y;
        directedcurve[n1][n2] = id;
        calculateArrow(m, mij.x, mij.y, coord1, edge);
    }

    ec = Math.abs(dr(-xtemp + xm, ytemp + ym, xm, ym, mmed));
    if(ec < 0.0001 && directedcurve[n2][n1] != 2 && id == 0)
    {
        coord = convertCoordinates(-xtemp + xm, ytemp + ym);
        var mij = getMidPointBezier(coord1[0], coord1[1], coord2[0], coord2[1], coord[0], coord[1]);
        id = 2;
        edge.xc = coord[0];
        edge.yc = coord[1];
        edge.xm = mij.x;
        edge.ym = mij.y;
        directedcurve[n1][n2] = id;
        calculateArrow(m, mij.x, mij.y, coord1, edge);
    }

    ec = Math.abs(dr(xtemp + xm, -ytemp + ym, xm, ym, mmed));
    if(ec < 0.0001 && directedcurve[n2][n1] != 3 && id == 0)
    {
        coord = convertCoordinates(xtemp + xm, -ytemp + ym);
        var mij = getMidPointBezier(coord1[0], coord1[1], coord2[0], coord2[1], coord[0], coord[1]);
        id = 3;
        edge.xc = coord[0];
        edge.yc = coord[1];
        edge.xm = mij.x;
        edge.ym = mij.y;
        directedcurve[n1][n2] = id;
        calculateArrow(m, mij.x, mij.y, coord1, edge);
    }

    ec = Math.abs(dr(-xtemp + xm, -ytemp + ym, xm, ym, mmed));
    if(ec < 0.0001 && directedcurve[n2][n1] != 4 && id == 0)
    {
        coord = convertCoordinates(-xtemp + xm, -ytemp + ym);
        var mij = getMidPointBezier(coord1[0], coord1[1], coord2[0], coord2[1], coord[0], coord[1]);
        id = 4;
        edge.xc = coord[0];
        edge.yc = coord[1];
        edge.xm = mij.x;
        edge.ym = mij.y;
        directedcurve[n1][n2] = id;
        calculateArrow(m, mij.x, mij.y, coord1, edge);
    }
}

function calculateArrow(m, xm, ym, coord1, edge)
{
    var coord = convertCoordinates(xm, ym);
    xm = coord[0];
    ym = coord[1];
    
    var a = directeddist * Math.cos(directedtheta);
    var b = directeddist * Math.sin(directedtheta);
    var xtemp = Math.sqrt(a * a / (1 + m * m));
    var ytemp = Math.sqrt(a * a * m * m / (1 + m * m));
    var mp = - 1 / m;

    var mind = 100000000;
    var xf = 0;
    var yf = 0;

    var ec = Math.abs(dr(xtemp + xm, ytemp + ym, xm, ym, m));
    if(ec < 0.0001)
    {
        coord = convertCoordinates(xtemp + xm, ytemp + ym);
        var d = distance(coord1[0], coord1[1], coord[0], coord[1]);
        if(d < mind)
        {
            mind = d;
            xf = xtemp + xm;
            yf = ytemp + ym;
        }
    }

    ec = Math.abs(dr(-xtemp + xm, ytemp + ym, xm, ym, m));
    if(ec < 0.0001)
    {
        coord =convertCoordinates(-xtemp + xm, ytemp + ym);
        var d = distance(coord1[0], coord1[1], coord[0], coord[1]);
        if(d < mind)
        {
            mind = d;
            xf = -xtemp + xm;
            yf = ytemp + ym;
        }
    }

    ec = Math.abs(dr(xtemp + xm, -ytemp + ym, xm, ym, m));
    if(ec < 0.0001)
    {
        coord =convertCoordinates(xtemp + xm, -ytemp + ym);
        var d = distance(coord1[0], coord1[1], coord[0], coord[1]);
        if(d < mind)
        {
            mind = d;
            xf = xtemp + xm;
            yf = -ytemp + ym;
        }
    }

    ec = Math.abs(dr(-xtemp + xm, -ytemp + ym, xm, ym, m));
    if(ec < 0.0001)
    {
        coord = convertCoordinates(-xtemp + xm, -ytemp + ym);
        var d = distance(coord1[0], coord1[1], coord[0], coord[1]);
        if(d < mind)
        {
            mind = d;
            xf = -xtemp + xm;
            yf = -ytemp + ym;
        }
    }
    calculateArrowHelper(mp, xf, yf, b, edge);
}

function calculateArrowHelper(m, xa, ya, a, edge)
{
    var xtemp = Math.sqrt(a * a / (1 + m * m));
    var ytemp = Math.sqrt(a * a * m * m / (1 + m * m));
    var coorda1 = [];
    var coorda2 = [];
    var set = 0;

    var ec = Math.abs(dr(xtemp + xa, ytemp + ya, xa, ya, m));
    if(ec < 0.0001)
    {
        var coord = convertCoordinates(xtemp + xa, ytemp + ya);
        if(!set)
        {
            coorda1[0] = coord[0];
            coorda1[1] = coord[1];
            set = 1;
        }
        else
        {
            coorda2[0] = coord[0];
            coorda2[1] = coord[1];
        }
    }

    var ec = Math.abs(dr(-xtemp + xa, ytemp + ya, xa, ya, m));
    if(ec < 0.0001)
    {
        var coord = convertCoordinates(-xtemp + xa, ytemp + ya);
        if(!set)
        {
            coorda1[0] = coord[0];
            coorda1[1] = coord[1];
            set = 1;
        }
        else
        {
            coorda2[0] = coord[0];
            coorda2[1] = coord[1];
        }
    }

    var ec = Math.abs(dr(xtemp + xa, -ytemp + ya, xa, ya, m));
    if(ec < 0.0001)
    {
        var coord = convertCoordinates(xtemp + xa, -ytemp + ya);
        if(!set)
        {
            coorda1[0] = coord[0];
            coorda1[1] = coord[1];
            set = 1;
        }
        else
        {
            coorda2[0] = coord[0];
            coorda2[1] = coord[1];
        }
    }

    var ec = Math.abs(dr(-xtemp + xa, -ytemp + ya, xa, ya, m));
    if(ec < 0.0001)
    {
        var coord = convertCoordinates(-xtemp + xa, -ytemp + ya);
        if(!set)
        {
            coorda1[0] = coord[0];
            coorda1[1] = coord[1];
            set = 1;
        }
        else
        {
            coorda2[0] = coord[0];
            coorda2[1] = coord[1];
        }
    }

    edge.xa1 = coorda1[0];
    edge.ya1 = coorda1[1];
    edge.xa2 = coorda2[0];
    edge.ya2 = coorda2[1];
}

function updateDirectedEdge(delta, edge)
{
    
}


function renderDirectedEdge(context, edge)
{
    var x1 = directednodes[edge.n1 - 1].x;
    var y1 = directednodes[edge.n1 - 1].y;
    var x2 = directednodes[edge.n2 - 1].x;
    var y2 = directednodes[edge.n2 - 1].y;

    context.beginPath();
    context.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--edge_color");
    context.moveTo(x1, y1);
    context.quadraticCurveTo(edge.xc, edge.yc, x2, y2);
    context.lineWidth = 5;
    context.stroke();

    context.beginPath();
    context.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--edge_color");
    context.moveTo(edge.xm, edge.ym);
    context.lineTo(edge.xa1, edge.ya1);
    context.lineWidth = 5;
    context.stroke();

    context.beginPath();
    context.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--edge_color");
    context.moveTo(edge.xm, edge.ym);
    context.lineTo(edge.xa2, edge.ya2);
    context.lineWidth = 5;
    context.stroke();
}

function updateDirectedEdges(delta)
{
    directededges.forEach(edge =>{
        if(edge.render)
            updateDirectedEdge(delta, edge);
    });
}

function renderDirectedEdges(context)
{
    directededges.forEach(edge => {
        if(edge.render)
            renderDirectedEdge(context, edge);
    });
}

function deleteDirectedEdge(x, y)
{
    var mi = 1000000;
    var edgenr = 0;
    
    directededges.forEach(edge => 
    {
        if(edge.render)
        {
            var d = distance(edge.xm, edge.ym, x, y);

            if(d < mi)
            {
                mi = d;
                edgenr = directededges.indexOf(edge) + 1;
            }
        }
    });
    if(edgenr > 0 && distance(x, y, directededges[edgenr - 1].xm, directededges[edgenr - 1].ym) < 25)
    {
        directedcurve[directededges[edgenr - 1].n1][directededges[edgenr - 1].n2] = 0;
        directedmuchii[directededges[edgenr - 1].n1][directededges[edgenr - 1].n2] = 0;
        directededges[edgenr - 1].render = false;
        directedmnumber--;
    }
}

function deleteDirectedEdges()
{
    directededges = [];
    directedm = 0;
    directedmnumber = 0;
}