var nodeNumber = document.getElementById("nodeNumber");
var edgeNumber = document.getElementById("edgeNumber");
var gradUl = document.getElementById("gradulNodurilor");
var matrice = document.getElementById("matrice");
var adList = document.getElementById("adiacenta");
var nrCompConexe = document.getElementById("nrCompConexe");
var conexe = document.getElementById("CompConexe");
var conexeList = document.getElementById("conexeList");
dragElement(document.getElementById("popup"));
var nrNodes = false;
var nrEdges = false;
var gra = false;
var matr = false;
var listsAd = false;
var nrCompConex = false;
var compConexe = false;

function dragElement(element)
{
    var p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;

    function dragMouseDown(e)
    {   
        e = e || window.event;
        e.preventDefault();
        p3 = e.clientX;
        p4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e)
    {
        e = e || window.event;
        e.preventDefault();

        p1 = p3 - e.clientX;
        p2 = p4 - e.clientY;
        p3 = e.clientX;
        p4 = e.clientY;

        element.style.top = (element.offsetTop - p2) + "px";
        element.style.left = (element.offsetLeft - p1) + "px";
    }

    function closeDragElement()
    {
        document.onmouseup = null;
        document.onmousemove = moveNode;
    }
}

function showPopup()
{
    if(!document.getElementById("popup").classList.contains("show"))
    {
        document.getElementById("popup").style.left = "70%";
        document.getElementById("popup").style.top = "22%";
    }
    document.getElementById("popup").classList.toggle("show");
}

function updatePopup()
{
    if(directed)
        nodeNumber.innerHTML = "Numărul de noduri " + ( nrNodes ? (": " + n) : "");
    else
        nodeNumber.innerHTML = "Numărul de noduri " + ( nrNodes ? (": " + undirectedn) : "");
    if(directed)
        edgeNumber.innerHTML = "Numărul de arce " + (nrEdges ? (": " + mnumber) : "");
    else
        edgeNumber.innerHTML = "Numărul de muchii " + (nrEdges ? (": " + undirectedmnumber) : "");

    gradUl.innerHTML = "";
    if(gra)
    {
        if(directed)
        {
            for(i = 0;i < n;i++)
            {
                listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = (i + 1) + ": extern: " + grade[i].extern + ", intern: " + grade[i].intern;
                gradUl.appendChild(listItem);
            }
        }
        else
        {
            for(i = 0;i < undirectedn;i++)
            {
                listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = (i + 1) + ": " + undirectedgrade[i];
                gradUl.appendChild(listItem);
            }
        }
    } 

    matrice.innerHTML = "";
    if(matr)
    {
        if(directed)
        {
            for(i = 1;i <= n;i++)
            {
                for(j = 1;j <= n;j++)
                    matrice.innerHTML += ((muchii[i][j] > 0) ? 1 : 0) + "&nbsp;";
                matrice.innerHTML += "<br>";
            }
        }
        else
        {
            for(i = 1;i <= undirectedn;i++)
            {
                for(j = 1;j <= undirectedn;j++)
                    matrice.innerHTML += ((undirectedmuchii[i][j] > 0) ? 1 : 0) + "&nbsp;";
                matrice.innerHTML += "<br>";
            }
        }
    }

    adList.innerHTML = "";
    if(listsAd)
    {
        if(directed)
        {
            for(i = 1;i <= n;i++)
            {
                listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = i + ": ";
                var fst = 1;
                for(j = 1;j <= n;j++)
                    if(muchii[i][j] > 0)
                    {
                        listItem.innerHTML += ((fst == 1) ? "" : ", ") + j;
                        fst = 0;
                    }
                adList.appendChild(listItem);
            }
        }
        else
        {
            for(i = 1;i <= undirectedn;i++)
            {
                listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = i + ": ";
                var fst = 1;
                for(j = 1;j <= undirectedn;j++)
                    if(undirectedmuchii[i][j] > 0)
                    {
                        listItem.innerHTML += ((fst == 1) ? "" : ", ") + j;
                        fst = 0;
                    }
                adList.appendChild(listItem);
            }
        }
    }

    if(nrCompConex || compConexe)
    {
        if(directed)
            compTareConexe();
        else
            undirectedCompConexe();
    }

    if(directed)
        conexe.innerHTML = "Componente tare conexe";
    else
        conexe.innerHTML = "Componente conexe";

    if(directed)
        if(nrCompConex)
        {
            nrCompConexe.innerHTML = "Numărul componentelor tare conexe: " + nrTareComp;
        }
        else
            nrCompConexe.innerHTML = "Numărul componentelor tare conexe";
    else
    {
        if(nrCompConex)
        {
            nrCompConexe.innerHTML = "Numărul componentelor conexe: " + nrComponenteUnd;
        }
        else
            nrCompConexe.innerHTML = "Numărul componentelor conexe";
    }

    conexeList.innerHTML = "";
    if(compConexe)
    {
        if(directed)
        {
            for(var i = 1;i <= nrTareComp;i++)
            {
                var listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = i + ": ";
                for(var j = 1; j <= n;j++)
                    if(dcompcx[j] == i)
                        listItem.innerHTML += j + ", ";
                conexeList.appendChild(listItem);
            }
        }
        else
        {
            for(var i = 1;i <= nrComponenteUnd;i++)
            {
                var listItem = document.createElement('li');
                listItem.classList.add("info");
                listItem.innerHTML = i + ": ";
                for(var j = 1; j <= undirectedn;j++)
                    if(undcompcx[j] == i)
                        listItem.innerHTML += j + ", ";
                conexeList.appendChild(listItem);
            }
        }
    }
}

function toggleNrNodes()
{
    nrNodes = nrNodes ? false : true;
    updatePopup();
}

function toggleNrEdges()
{
    nrEdges = nrEdges ? false : true;
    updatePopup();
}

function toggleGra()
{
    gra = gra ? false : true;
    updatePopup();
}

function toggleMatrix()
{
    matr = matr ? false : true;
    updatePopup();
}

function toggleLists()
{
    listsAd = listsAd ? false : true;
    updatePopup();
}

function toggleNrCompConex()
{
    nrCompConex = nrCompConex ? false : true;
    updatePopup();
}

function toggleCompConex()
{
    compConexe = compConexe ? false : true;
    updatePopup();
}