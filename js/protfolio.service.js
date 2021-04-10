var gProjs = [
    {
        name: 'ball-board',
        title: 'This is a BALL BOARD game',
        desc: 'lorem',
        url: '/projs/ball-board'
    },
    {
        name: 'chess',
        title: 'This is a CHESS game',
        desc: 'lorem',
        url: '/projs/chess'
    },
    {
        name: 'mineswepeer',
        title: 'This is a MINESWEPPER game',
        desc: 'lorem',
        url: '/projs/mineswepeer'
    },
    {
        name: 'pacman',
        title: 'This is a PACMAN game',
        desc: 'lorem',
        url: '/projs/pacman'
    }
]

var gId = 100
createProjs();

function createProj(name, title, desc, url) {
    var proj = {
        id: gId++,
        name,
        title,
        desc,
        url,
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    };
    console.log(proj.id);
    return proj;
}

function createProjs() {
    var projs = gProjs.map(function (proj) {
        return createProj(proj.name, proj.title, proj.desc, proj.url);
    })
    gProjs = projs;
    return projs
}

function getProjs(){
    return gProjs;
}

function getProjById(projId){
    return gProjs.find(function(proj){
        return projId === proj.id;
    })
}