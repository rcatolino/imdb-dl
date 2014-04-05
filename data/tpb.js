var rows = document.getElementById('searchResult').children[1].getElementsByTagName('tr');

var entries = [];
for (var i=0; i<7; i++) {
  // Verify that the torrent exists, has a magnet link and is not anonymous:
  if (rows[i] == undefined) {
    break;
  }

  var link = rows[i].children[1].children[1];
  var user = rows[i].getElementsByClassName('detDesc')[1];
  if (link == undefined || user == undefined) {
    continue;
  }

  entries.push({
    href: rows[i].getElementsByClassName('detLink')[0].href,
    name: rows[i].getElementsByClassName('detLink')[0].textContent,
    magnet: link.href,
    uploader: user.textContent,
    seeders: rows[i].children[2].textContent,
    leechers: rows[i].children[3].textContent,
    size: rows[i].getElementsByClassName('detDesc')[0].textContent.match(/\d*.\d*\s[GMTK]iB/),
  });
}
self.postMessage(entries);
