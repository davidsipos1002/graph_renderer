var chapters = [];
var chapterId = 0;
var currentSelected = 0;
var newChapter = document.getElementById("newChapter");
var chapterSelect = document.getElementById("chapterSelect");
var saveChapter = document.getElementById("saveChapter");
var chapterTitle = document.getElementById("chapterTitle");
var newSubchapter = document.getElementById("newSubchapter");
var subchapterOl = document.getElementById("subchapterOl");
var generateContents = document.getElementById("generateContents");
var contentSelector = document.getElementById("content-selector");
var contentsXml = "";

newChapter.onclick = function ()
{
    var subchapter = [];
    var subchapterInput = [];
    var chapter = {id: chapterId++, title: "Capitol nou", numberOfSubchapters: 0, subchapters: subchapter, numberOfSubchapterInputs: 0, subchapterInputs: subchapterInput};
    chapters.push(chapter);
    updateChapterSelect();
    currentSelected = chapter.id;
    chapterSelect.value = currentSelected;
    chapterTitle.value = chapters[currentSelected].title;
    updateSubchapterOl();
}

saveChapter.onclick = function ()
{
    var selected = chapterSelect.value;
    chapters[chapterSelect.value].title = chapterTitle.value;
    chapters[currentSelected].subchapters = [];
    chapters[currentSelected].numberOfSubchapters = 0;
    for(var i = 0;i < chapters[currentSelected].numberOfSubchapterInputs;i++)
    {
        if(chapters[currentSelected].subchapterInputs[i].title.value != "" && chapters[currentSelected].subchapterInputs[i].page.value > 0)
        {
            var subchapter = {title: chapters[currentSelected].subchapterInputs[i].title.value, page: chapters[currentSelected].subchapterInputs[i].page.value, graph: chapters[currentSelected].subchapterInputs[i].graph.checked};
            chapters[currentSelected].subchapters.push(subchapter);
            chapters[currentSelected].numberOfSubchapters++;
        }
    }
    updateChapterSelect();
    chapterSelect.value = selected;
}

chapterSelect.onchange = function ()
{
    currentSelected = chapterSelect.value;
    chapterTitle.value = chapters[currentSelected].title;
    updateSubchapterOl();
}

newSubchapter.onclick = function ()
{
    var subchapterTitle = document.createElement('input');
    subchapterTitle.type = "text";
    subchapterTitle.id = "subchapterTitle" + chapters[currentSelected].numberOfSubchapterInputs;
    subchapterTitle.name = "subchapterTitle" + chapters[currentSelected].numberOfSubchapterInputs;

    var subchapterPage = document.createElement('input');
    subchapterPage.type = "number";
    subchapterPage.id = "subchapterPage" + chapters[currentSelected].numberOfSubchapterInputs;
    subchapterPage.name = "subchapterPage" + chapters[currentSelected].numberOfSubchapterInputs;

    var subchapterGraph = document.createElement("input");
    subchapterGraph.type = "checkbox";
    subchapterGraph.id = "subChapterGraph" + chapters[currentSelected].numberOfSubchapterInputs;
    subchapterGraph.name = "subchapterGraph" + chapters[currentSelected].numberOfSubchapterInputs++;

    var subchapterInput = {title: subchapterTitle, page: subchapterPage, graph: subchapterGraph};
    chapters[currentSelected].subchapterInputs.push(subchapterInput);
    updateSubchapterOl();
}

generateContents.onclick = function()
{
    contentsXml = "var contents =\n`\n";
    contentsXml += "<contents>\n";
    for(var i = 0;i < chapterId;i++)
    {
        contentsXml += "\t<chapter>\n";
        contentsXml += "\t\t<title>" + chapters[i].title + "</title>\n";
        for(var j = 0;j < chapters[i].numberOfSubchapters;j++)
        {
            console.log(chapters[i].numberOfSubchapters);
            contentsXml += "\t\t<subchapter>\n"
            contentsXml += "\t\t\t<title>" + chapters[i].subchapters[j].title + "</title>\n";
            contentsXml += "\t\t\t<page>" + chapters[i].subchapters[j].page + "</page>\n";
            contentsXml += "\t\t\t<graph>" + ((chapters[i].subchapters[j].graph == true) ? 1 : 0) + "</graph>\n";
            contentsXml += "\t\t</subchapter>\n";
        }
        contentsXml += "\t</chapter>\n";
    }
    contentsXml += "</contents>\n";
    contentsXml += "`;"
    download("contents-data.js", contentsXml);
}

function updateChapterSelect()
{
    chapterSelect.innerHTML = "";
    for(var i = 0;i < chapterId;i++)
    {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(chapters[i].title) );
        opt.value = chapters[i].id; 
        chapterSelect.appendChild(opt); 
    }
}

function updateSubchapterOl()
{
    subchapterOl.innerHTML = "";
    for(var i = 0;i < chapters[currentSelected].numberOfSubchapterInputs;i++)
    {
        var listItem = document.createElement('li');
        listItem.appendChild(chapters[currentSelected].subchapterInputs[i].title);
        var pagina = document.createElement('label');
        pagina.innerHTML = "&nbsp;&nbsp;pagina&nbsp;&nbsp;";
        listItem.appendChild(pagina);
        listItem.appendChild(chapters[currentSelected].subchapterInputs[i].page);
        var graff = document.createElement('label');
        graff.innerHTML = "&nbsp;&nbsp;Graf orientat&nbsp;&nbsp;";
        listItem.appendChild(graff);
        listItem.appendChild(chapters[currentSelected].subchapterInputs[i].graph);
        subchapterOl.appendChild(listItem); 
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function loadContents(contents)
{
    chapterId = 0;
    chapters = [];
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(contents, "text/xml");    

    var chaptersd = xmlDoc.getElementsByTagName("chapter");    
    for(var i = 0;i < chaptersd.length;i++)
    {
        var subchapter = [];
        var subchapterInput = [];
        var chapter = {id: chapterId++, title: chaptersd[i].childNodes[1].childNodes[0].nodeValue, numberOfSubchapters: 0, subchapters: subchapter, numberOfSubchapterInputs: 0, subchapterInputs: subchapterInput};
        chapters.push(chapter);

        var subchapters = chaptersd[i].getElementsByTagName("subchapter");
        for(var j = 0;j < subchapters.length;j++)
        {

            var subchapterTitle = document.createElement('input');
            subchapterTitle.type = "text";
            subchapterTitle.id = "subchapterTitle" + chapters[chapterId - 1].numberOfSubchapterInputs;
            subchapterTitle.name = "subchapterTitle" + chapters[chapterId - 1].numberOfSubchapterInputs;
            subchapterTitle.value = subchapters[j].childNodes[1].childNodes[0].nodeValue;

            var subchapterPage = document.createElement('input');
            subchapterPage.type = "number";
            subchapterPage.id = "subchapterPage" + chapters[chapterId - 1].numberOfSubchapterInputs;
            subchapterPage.name = "subchapterPage" + chapters[chapterId - 1].numberOfSubchapterInputs;
            subchapterPage.value = subchapters[j].childNodes[3].childNodes[0].nodeValue;

            var subchapterGraph = document.createElement("input");
            subchapterGraph.type = "checkbox";
            subchapterGraph.id = "subChapterGraph" + chapters[chapterId - 1].numberOfSubchapterInputs;
            subchapterGraph.name = "subchapterGraph" + chapters[chapterId - 1].numberOfSubchapterInputs++;
            subchapterGraph.checked = (subchapters[j].childNodes[5].childNodes[0].nodeValue == 1) ? true : false;

            var subchapterInput = {title: subchapterTitle, page: subchapterPage, graph: subchapterGraph};
            chapters[chapterId - 1].subchapterInputs.push(subchapterInput);
        }

        chapters[chapterId - 1].subchapters = [];
        chapters[chapterId - 1].numberOfSubchapters = 0;
        for(var k = 0;k < chapters[chapterId - 1].numberOfSubchapterInputs;k++)
        {
            if(chapters[chapterId - 1].subchapterInputs[k].title.value != "" && chapters[chapterId - 1].subchapterInputs[k].page.value > 0)
            {
                var subchapter = {title: chapters[chapterId - 1].subchapterInputs[k].title.value, page: chapters[chapterId - 1].subchapterInputs[k].page.value, graph: chapters[chapterId - 1].subchapterInputs[k].graph.checked};
                chapters[chapterId - 1].subchapters.push(subchapter);
                chapters[chapterId - 1].numberOfSubchapters++;
            }
        }

    }
    updateChapterSelect();
    currentSelected = 0;
    chapterTitle.value = chapters[currentSelected].title;
    updateSubchapterOl();
}

contentSelector.addEventListener('change', (event) => {
    var files = event.target.files;;
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function()
    {
        loadContents(reader.result.slice(18, reader.result.length - 2));
    }
});