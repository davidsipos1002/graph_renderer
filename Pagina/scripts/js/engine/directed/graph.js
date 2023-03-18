var muchii = [];
var stiva = [];
var vf = 0;
var dviz = [];
var nrTareComp = 0;
var dcompcx = [];

for(var i = 0;i <= 22;i++)
{
    muchii[i] = new Array(22);
    for(var j = 0;j <= 22;j++)
        muchii[i][j] = 0;
}

function deleteGraph()
{
    for(var i = 0;i <= 22;i++)
        for(var j = 0;j <= 22;j++)
            muchii[i][j] = 0;
    deleteNodes();
    deleteEdges();
}

function push(x)
{
    stiva[++vf] = x;
}

function pop()
{
    if(vf > 0)
        return stiva[vf--];
}

function dfs1(st)
{
    dviz[st] = true;
    for(var i = 1;i <= n;i++)
    {
        if(!dviz[i] && muchii[st][i])
            dfs1(i);
    }
    push(st);
}
 
function dfs2(st)
{
    dviz[st] = true;
    for(var i = 1;i <= n;i++)
    {
        if(!dviz[i] && muchii[i][st])
            dfs2(i);
    }
    dcompcx[st] = nrTareComp;
}

	
function compTareConexe()
{

    nrTareComp = 0;

    if(n == 0)
        return;

    vf = 0;

    for(var i = 1;i <= n;i++)
        dviz[i] = false;

    for(var i = 1;i <= n;i++)
    {
        if(!dviz[i])
            dfs1(i);
    }

    for(var i = 1;i <= n;i++)
        dviz[i] = false;

    while(vf)
    {
        var curent = pop();
        if(!dviz[curent])
        {
            nrTareComp++;
            dfs2(curent);
        }
    }
}