var contentDiv = document.getElementById("cuprinsDiv");
var contentList = [];
var pages = [];
var graphtype = [];

function loadContents()
{
    contentDiv.innerHTML = "";
    var chapertUl = document.createElement('ul');
    chapertUl.classList.add("list1");

    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(contents, "text/xml");    

    var chapters = xmlDoc.getElementsByTagName("chapter");    
    for(var i = 0;i < chapters.length;i++)
    {
        var listItem = document.createElement('li');
        listItem.innerHTML = chapters[i].childNodes[1].childNodes[0].nodeValue;

        var subchapterUl = document.createElement('ul');
        subchapterUl.classList.add("list2");
        
        var subchapters = chapters[i].getElementsByTagName("subchapter");
        for(var j = 0;j < subchapters.length;j++)
        {
            var subchapterLi = document.createElement('li');
            contentList.push(subchapterLi);
            pages.push(subchapters[j].childNodes[3].childNodes[0].nodeValue);
            graphtype.push(subchapters[j].childNodes[5].childNodes[0].nodeValue);
            subchapterLi.innerHTML = subchapters[j].childNodes[1].childNodes[0].nodeValue;
            subchapterLi.style = "cursor: pointer;";
            subchapterLi.onclick = function() {
                var page = contentList.indexOf(this); 
                setPage(pages[page], graphtype[page]);
            };
            subchapterUl.appendChild(subchapterLi);

        }

        listItem.appendChild(subchapterUl);
        chapertUl.appendChild(listItem);
    }

    contentDiv.appendChild(chapertUl);
}

function setPage(page, graphtype)
{
    if(!theoryOpen)
    {
        toggleTheory();
    }
    document.getElementById("embed").src =  "res/pdfs/lorem_ipsum.pdf#page=" + page;
    if(graphtype == 0)
    {
        setUndirected();
        deleteUndirectedGraph();
    }
    else
    {
        setDirected();
        deleteGraph();
    }
    toggleContents();
}