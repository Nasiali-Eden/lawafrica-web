export const money = n => 'KES ' + n.toLocaleString('en-KE');

// Files in public/ are served from the deployment base, not the domain root.
// BASE_URL is '/' in dev and '/lawafrica-web/' on GitHub Pages, so a path
// written as '/assets/x.jpg' resolves correctly in both.
export const asset = path => import.meta.env.BASE_URL + path.replace(/^\//, '');
