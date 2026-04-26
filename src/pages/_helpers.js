export function elFromHTML(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  const node = t.content.firstElementChild;
  if (!node) throw new Error('Template HTML produced no element');
  return node;
}

export function pageShell({ title, lead, childrenHTML }) {
  return elFromHTML(`
    <section class="section">
      <div class="container">
        <div class="sectionHeader" data-reveal="left">
          <div>
            <div class="pill">Kolorowe Centrum</div>
            <h1 class="sectionTitle">${title}</h1>
            <p class="sectionLead">${lead}</p>
          </div>
        </div>
        ${childrenHTML}
      </div>
    </section>
  `);
}

