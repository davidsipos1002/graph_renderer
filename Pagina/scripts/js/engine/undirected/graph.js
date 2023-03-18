var undirectedmuchii = [];
var nrComponenteUnd = 0;
var undviz = [];
var undcompcx = [];

for(var i = 0;i <= 22;i++)
{
    undirectedmuchii[i] = new Array(22);
    for(var j = 0;j <= 22;j++)
        undirectedmuchii[i][j] = 0;
}

function deleteUndirectedGraph()
{
    for(var i = 0;i <= 22;i++)
        for(var j = 0;j <= 22;j++)
            undirectedmuchii[i][j] = 0;
    deleteUndirectedNodes();
    deleteUndirectedEdges();
}

function undirectedCompConexe()
{
    nrComponenteUnd = 0;

    if(undirectedn == 0)
        return;

    for(var i = 1;i <= undirectedn;i++)
        undviz[i] = false;

    for(var i = 1;i <= undirectedn;i++)
    {
        if(!undviz[i])
        {
            nrComponenteUnd++;
            unddfs(i);
        }
    }
}

function unddfs(start)
{
    undviz[start] = true;
    undcompcx[start] = nrComponenteUnd;
    for(var i = 1;i <= undirectedn;i++)
        if(undirectedmuchii[start][i] && !undviz[i])
            unddfs(i);
}