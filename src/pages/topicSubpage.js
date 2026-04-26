import { elFromHTML } from './_helpers.js';
import { escapeHtml } from './pdfTextHtml.js';
import { buildHomeRichPdfHtml } from './homeRichPdf.js';

function figureRow(url) {
  return `
    <figure class="topicFigure" data-reveal>
      <img class="topicFigure__img" src="${escapeHtml(url)}" alt="" loading="lazy" width="1200" height="800" />
    </figure>`;
}

/**
 * @param {object} topic — wpis z manifestu (pełny obiekt w `topics[]`)
 */
export function renderTopicSubpage(topic) {
  const pdfs = (topic.subFiles || []).filter((f) => f.type === 'pdf');
  const imgs = (topic.subFiles || []).filter((f) => f.type === 'image');

  if (!pdfs.length && imgs.length) {
    const allImgs = imgs.map((i) => figureRow(i.url)).join('');
    return elFromHTML(`
    <div>
      <section class="section" aria-label="${escapeHtml(topic.label)}">
        <div class="container">
          <div class="sectionHeader" data-reveal>
            <h1 class="sectionTitle" style="margin:0">${escapeHtml(topic.label)}</h1>
          </div>
          <div class="topicSubpageContent topicSubpageContent--imgOnly">${allImgs}</div>
        </div>
      </section>
    </div>
  `);
  }

  const hero = imgs[0]?.url;
  const galleryRest = imgs.length > 1 ? imgs.slice(1) : [];
  const linkSub = `/${escapeHtml(topic.slug)}`;

  const pdfBlocks = pdfs
    .map(
      (p) => `
    <div class="topicSubpagePdf" data-reveal>
      ${buildHomeRichPdfHtml({
        heroImageUrl: hero,
        topicLabel: topic.label,
        linkSub,
        pdfName: p.name,
        pdfUrl: p.url,
        hasSub: true,
        text: p.text || '',
        isSubpage: true,
      })}
    </div>`,
    )
    .join('');

  const imgBlocks = galleryRest.map((i) => figureRow(i.url)).join('');
  const body = pdfBlocks + (imgBlocks ? `<div class="topicSubpageMorePhotos">${imgBlocks}</div>` : '');

  if (!body.trim()) {
    return elFromHTML(`
    <div>
      <section class="section" aria-label="${escapeHtml(topic.label)}">
        <div class="container">
          <p class="muted">Brak plików w folderze <code>podstrona</code> dla tego tematu.</p>
        </div>
      </section>
    </div>
  `);
  }

  return elFromHTML(`
    <div>
      <section class="section" aria-label="${escapeHtml(topic.label)}">
        <div class="container">
          <div class="sectionHeader" data-reveal>
            <h1 class="sectionTitle" style="margin:0">${escapeHtml(topic.label)}</h1>
          </div>
          <div class="topicSubpageContent">${body}</div>
        </div>
      </section>
    </div>
  `);
}
