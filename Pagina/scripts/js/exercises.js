var currentEx = 0;
var exDoc;
var exercisesDOM;
var exText = document.getElementById("exText");
var subUl = document.getElementById("exSub");
var contentDiv = document.getElementById("cuprinsDiv");
var exLis = [];

function generateRandomUndirectedGraph()
{
    deleteUndirectedGraph();
    var nodeNumber = Math.floor(Math.random() * 5) + 4;

    var i = 0, x, y;
    while(true)
    {
        x = Math.floor(Math.random() * 600) + 1;
        y = Math.floor(Math.random() * 600) + 1;
        if(!isAtEdges(x, y))
        {
            addUndirectedNode(x, y, false, 0, 0);
            i++;
            break;
        }
    }

    while(i < nodeNumber)
    {
        x = Math.floor(Math.random() * 600) + 1;
        y = Math.floor(Math.random() * 600) + 1;
        if(!isAtEdges(x, y))
        {
            var clsNode = closestNode(x, y);
            if(distance(x, y, undirectednodes[clsNode - 1].x, undirectednodes[clsNode - 1].y) > 6 * r + 5)
            {
                addUndirectedNode(x, y, false, 0, 0);
                i++;
            }

        }
    }

    var edgeNumber = Math.floor(Math.random() * (combinari(nodeNumber) / 4)) + 3;
    var ok = true;
    for(var n1 = 1;n1 <= nodeNumber && edgeNumber;n1++)
    {
        ok = true;
        for(var n2 = n1 + 1;n2 < nodeNumber && edgeNumber && ok;n2++)
        {
            var edgenr = addUndirectedEdge(n1, n2);
            undirectedmuchii[n1][n2] = undirectedmuchii[n2][n1] = edgenr;
            ok = false;
            edgeNumber--;
        }
    }
    updatePopup();
}

function generateRandomDirectedGraph()
{
    deleteGraph();
    var nodeNumber = Math.floor(Math.random() * 7) + 4;
    
    var i = 0, x, y;
    while(true)
    {
        x = Math.floor(Math.random() * 600) + 1;
        y = Math.floor(Math.random() * 600) + 1;
        if(!isAtEdges(x, y))
        {
            addNode(x, y, false, 0, 0);
            i++;
            break;
        }
    }

    while(i < nodeNumber)
    {
        x = Math.floor(Math.random() * 600) + 1;
        y = Math.floor(Math.random() * 600) + 1;
        if(!isAtEdges(x, y))
        {
            var clsNode = closestNode(x, y);
            if(distance(x, y, nodes[clsNode - 1].x, nodes[clsNode - 1].y) > 6 * r + 5)
            {
                addNode(x, y, false, 0, 0);
                i++;
            }

        }
    }

    var edgeNumber = Math.floor(Math.random() * (combinari(nodeNumber) / 2)) + 3;
    var ok = true;
    for(var n1 = 1;n1 <= nodeNumber && edgeNumber;n1++)
    {
        ok = true;
        for(var n2 = n1 + 1;n2 < nodeNumber && edgeNumber && ok;n2++)
        {
            var edgenr = addDirectedEdge(n1, n2);
            muchii[n1][n2] = edgenr;
            ok = false;
            edgeNumber--;
        }
    }
    updatePopup();
}

function populateExercises()
{
    var parser = new DOMParser();
    exDoc = parser.parseFromString(exercises, "text/xml");
    exercisesDOM = exDoc.getElementsByTagName("exercise");
    
   if(exercisesDOM.length > 0)
    {
        var exUl = document.createElement('ul');
        exUl.classList.add("list1");
        var listi = document.createElement('li');
        listi.innerHTML = "Exerciții";
        var exSubUl = document.createElement('ul');
        exSubUl.classList.add("list2");

        for(var i = 0;i < exercisesDOM.length;i++)
        {
            var listItem = document.createElement('li');
            listItem.innerHTML = exercisesDOM[i].childNodes[5].childNodes[0].nodeValue;
            listItem.style = "cursor: pointer;";
            exLis.push(listItem);
            listItem.onclick = function() {
                if(theoryOpen)
                    toggleTheory();
                if(contentsOpen)
                    toggleContents();
                currentEx = exLis.indexOf(this); 
                loadExercise();
                if(!(document.getElementById("expopup").classList.contains("show")))
                    exshowPopup();
                if(!document.getElementById("popup").classList.contains("show"))
                    showPopup();
            };
            exSubUl.appendChild(listItem);
        }

        listi.appendChild(exSubUl);
        exUl.appendChild(listi);
        contentDiv.appendChild(exUl);
    }
}

function loadExercise()
{
    exText.innerHTML = "";
    subUl.innerHTML = "";

    var type = exercisesDOM[currentEx].children[0].childNodes[0].nodeValue;
    var directed = (exercisesDOM[currentEx].children[1].childNodes[0].nodeValue == 1 ? true : false);
    var title = exercisesDOM[currentEx].children[2].childNodes[0].nodeValue;
    var load = (exercisesDOM[currentEx].children[3].childNodes[0].nodeValue == 1 ? true : false);
    var text = exercisesDOM[currentEx].children[4].childNodes[0].nodeValue;

    if(type == 1)
    {
        exText.innerHTML = text;
        var subs = exercisesDOM[currentEx].getElementsByTagName("sub");
        for(var i = 0;i < subs.length;i++)
        {
            var listItem = document.createElement('li');
            listItem.innerHTML = subs[i].childNodes[0].nodeValue + "<br>";
            var textBox = document.createElement('input');
            textBox.setAttribute("type", "text");
            textBox.setAttribute("autocomplete", "off");
            listItem.appendChild(textBox);
            subUl.appendChild(listItem);
        }
        
    }
    else if(type == 2)
    {
        exText.innerHTML = text;
        var subs = exercisesDOM[currentEx].getElementsByTagName("sub");
        for(var i = 0;i < subs.length;i++)
        {
            var listItem = document.createElement('li');
            listItem.innerHTML = subs[i].childNodes[0].nodeValue + "<br>";
            subUl.appendChild(listItem);
        }
    }
    
    if(load)
    {
        var graph = exercisesDOM[currentEx].getElementsByTagName("graph")[0];
        var nodeNumber = graph.children[0].childNodes[0].nodeValue;
        var edgeNumber = graph.children[1].childNodes[0].nodeValue;
        var nodes = graph.getElementsByTagName("nodes")[0];
        var edges = graph.getElementsByTagName("edges")[0];
        if(directed)
        {
            setDirected();
            deleteGraph();
            for(var i = 0;i < nodeNumber;i++)
            {
                var x = parseInt(nodes.children[i].children[0].childNodes[0].nodeValue);
                var y = parseInt(nodes.children[i].children[1].childNodes[0].nodeValue);
                addNode(x, y, false, 0, 0);
            }

            for(var i = 0;i < edgeNumber;i++)
            {
                var n1 = parseInt(edges.children[i].children[0].childNodes[0].nodeValue);
                var n2 = parseInt(edges.children[i].children[1].childNodes[0].nodeValue);
                var edgenr = addDirectedEdge(n1, n2);
                muchii[n1][n2] = edgenr;
            }

            updatePopup();
        }
        else
        {
            setUndirected();
            deleteUndirectedGraph();
            for(var i = 0;i < nodeNumber;i++)
            {
                var x = parseInt(nodes.children[i].children[0].childNodes[0].nodeValue);
                var y = parseInt(nodes.children[i].children[1].childNodes[0].nodeValue);
                addUndirectedNode(x, y, false, 0, 0);
            }

            for(var i = 0;i < edgeNumber;i++)
            {
                var n1 = parseInt(edges.children[i].children[0].childNodes[0].nodeValue);
                var n2 = parseInt(edges.children[i].children[1].childNodes[0].nodeValue);
                var edgenr = addUndirectedEdge(n1, n2);
                undirectedmuchii[n1][n2] = undirectedmuchii[n2][n1] = edgenr;
            }

            updatePopup();
        }
    }
    else
    {
        if(type == 1)
            if(directed)
            {
                setDirected();
                generateRandomDirectedGraph();
            }
            else
            {
                setUndirected();
                generateRandomUndirectedGraph();
            }
    }
}

function prevEx()
{
    if(currentEx > 0)
        currentEx--;
    else if(currentEx == 0)
        currentEx = exercisesDOM.length - 1;
    loadExercise();
}

function nextEx()
{
    if(currentEx < exercisesDOM.length - 1)
        currentEx++;
    else if(currentEx == exercisesDOM.length - 1)
        currentEx = 0;
    loadExercise();
}

function closestNode(x, y)
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

function combinari(n)
{
    return n * (n - 1) / 2;
}