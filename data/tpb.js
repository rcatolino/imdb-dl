var rows = document.getElementById('searchResult').children[1].getElementsByTagName('tr');

var entries = [];
for (var i=0; i<7; i++) {
  entries.push({
    href: rows[i].getElementsByClassName('detLink')[0].href,
    name: rows[i].getElementsByClassName('detLink')[0].textContent,
    magnet: rows[i].children[1].children[1].href,
    uploader: rows[i].getElementsByClassName('detDesc')[1].textContent,
    seeders: rows[i].children[2].textContent,
    leechers: rows[i].children[3].textContent,
    size: rows[i].getElementsByClassName('detDesc')[0].textContent.match(/\d*.\d*\s[GMTK]iB/),
  });
}
self.postMessage(entries);
