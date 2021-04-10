console.log('Starting up');




var gId = 100
createProjs();
renderProjs();

function renderProjs() {
    var projs = getProjs();
    var strHtml = projs.map(function (proj) {
        console.log(proj);
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick = "renderModal(${proj.id})">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/04-thumbnail.jpg" >
        </a>
        <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
        </div>
        </div>
        `
    })
    $('.items-list').html(strHtml);
}

function renderModal(projId) {
    var currProj = getProjById(projId);
    var strHtml = `
        <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${currProj.name}</h2>
                <p class="item-intro text-muted">${currProj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
                <p>${currProj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${currProj.publishedAt}</li>
                  <li>Client: Threads</li>
                  <li>Category: Illustration</li>
                </ul>
                <button class="btn btn-primary" type="button" onclick="onGameClicked(${currProj.id})">
                Start Game</button>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`
    $('.portfolio-modal').html(strHtml);
}

function onGameClicked(projId) {
    var currProj = getProjById(projId);
    window.open(`http://127.0.0.1:5500/ca-gallery-master${currProj.url}/index.html`);
}