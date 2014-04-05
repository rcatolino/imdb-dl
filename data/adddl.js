var root = document.getElementById('img_primary');

if (root) {
  var title = document.getElementById('overview-top').children[1].children[0].textContent;
  self.port.emit("gotTitle", title);
  var fragment = document.createDocumentFragment();
  var torrents = fragment.appendChild(document.createElement('ul')).
    appendChild(document.createElement('li'));
  fragment.children[0].className = 'main_nav';
  // Title
  torrents.appendChild(document.createElement('p')).textContent = 'Availble Torrents';
  torrents.children[0].className = 'navCategory singleLine';
  torrents.appendChild(document.createElement('span')).className = 'downArrow';

  // List
  var div = torrents.appendChild(document.createElement('div'));
  div.className = 'sub_nav';
  div.style = 'display: none';

  div.appendChild(document.createElement('div')).className = 'subNavListContainer';
  div.children[0].style = 'min-width: 650px; max-width: 1050px;';
  var list = div.children[0].appendChild(document.createElement('table'));
  var head = list.appendChild(document.createElement('thead')).appendChild(document.createElement('tr'));
  var th = head.appendChild(document.createElement('th'));
  th.style = 'padding-right: 15px';
  th.appendChild(document.createElement('p')).textContent = 'Uploader';

  var th = head.appendChild(document.createElement('th'));
  th.appendChild(document.createElement('p')).textContent = 'Torrent';

  var th = head.appendChild(document.createElement('th'));
  th.style = 'padding-left: 10px';
  th.appendChild(document.createElement('p')).textContent = 'Size';

  var th = head.appendChild(document.createElement('th'));
  th.style = 'padding-left: 5px; padding-right:10px';
  th.appendChild(document.createElement('p')).textContent = 'Ratio';

  var body = list.appendChild(document.createElement('tbody'));

  self.port.on('gotTorrents', function(torrents) {
    for (var i = 0; i<torrents.length; i++) {
      pushTorrent(body, torrents[i]);
    }
    root.appendChild(fragment);
    root.children[2].addEventListener('mouseenter', function() {displayOn(div);});
    root.children[2].addEventListener('mouseleave', function() {displayOff(div);});
  });
}

function pushTorrent(list, entry) {
  var row = list.appendChild(document.createElement('tr'));

  var td = row.appendChild(document.createElement('td'));
  td.style = 'padding-right: 15px';
  var uploader = td.appendChild(document.createElement('a'));
  uploader.href = entry.href;
  uploader.textContent = entry.uploader;

  var td = row.appendChild(document.createElement('td'));
  var torrent = td.appendChild(document.createElement('a'));
  torrent.href = entry.magnet;
  torrent.textContent= entry.name;

  var td = row.appendChild(document.createElement('td'));
  td.style = 'padding-left: 10px';
  var size = td.appendChild(document.createElement('p'));
  size.textContent = entry.size;

  var td = row.appendChild(document.createElement('td'));
  th.style = 'padding-left: 5px; padding-right:10px';
  var ratio = td.appendChild(document.createElement('p'));
  ratio.textContent= entry.seeders + '/' + entry.leechers;
}

function displayOn(div) {
  div.style = 'display: block';
}

function displayOff(div) {
  div.style = 'display: none';
}
