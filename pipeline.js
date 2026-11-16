'use strict';

const stages = new Map([
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['discovery', 'Discovery'],
  ['proposal', 'Proposal sent'],
  ['won', 'Won'],
  ['lost', 'Lost'],
]);

const samples = [
  { id: 'northbank', company: 'Northbank Bakes', work: 'CRM setup', value: 850, stage: 'new' },
  { id: 'rowan', company: 'Rowan Ledger Studio', work: 'Client onboarding review', value: 1200, stage: 'contacted' },
  { id: 'quay', company: 'Quayfield Finance', work: 'Sales pipeline design', value: 2500, stage: 'discovery' },
  { id: 'fern', company: 'Fernbridge Advisory', work: 'Lead tracking pilot', value: 1800, stage: 'proposal' },
  { id: 'mill', company: 'Millway Workspace', work: 'Contact migration', value: 900, stage: 'won' },
];

const currency = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const board = document.querySelector('#board');
const feedback = document.querySelector('#feedback');
let leads;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function leadCard(lead) {
  const card = element('li', undefined, 'lead');
  const label = element('label', 'Move lead to');
  const select = element('select');
  select.id = 'stage-' + lead.id;
  select.setAttribute('aria-label', 'Move ' + lead.company + ' to');
  for (const [key, name] of stages) {
    const option = element('option', name);
    option.value = key;
    select.append(option);
  }
  select.value = lead.stage;

  select.addEventListener('change', () => {
    lead.stage = select.value;
    render();
    document.getElementById(select.id).focus();
    feedback.textContent = lead.company + ' moved to ' + stages.get(lead.stage) + '.';
  });

  label.append(select);
  card.append(
    element('h3', lead.company),
    element('p', lead.work),
    element('p', currency.format(lead.value)),
    label,
  );
  return card;
}

function render() {
  const open = leads.filter(lead => lead.stage !== 'won' && lead.stage !== 'lost');
  const won = leads.filter(lead => lead.stage === 'won');
  const total = group => group.reduce((sum, lead) => sum + lead.value, 0);

  document.querySelector('#open-count').textContent = open.length;
  document.querySelector('#open-value').textContent = currency.format(total(open));
  document.querySelector('#won-value').textContent = currency.format(total(won));

  const columns = [];
  for (const [key, name] of stages) {
    const matching = leads.filter(lead => lead.stage === key);
    const column = element('section', undefined, 'stage');
    const heading = element('h2', name + ' (' + matching.length + ')');
    column.dataset.stage = key;
    column.append(heading);

    if (matching.length) {
      const list = element('ul');
      list.append(...matching.map(leadCard));
      column.append(list);
    } else {
      column.append(element('p', 'No leads in this stage.', 'empty'));
    }
    columns.push(column);
  }
  board.replaceChildren(...columns);
}

function resetDemo() {
  leads = samples.map(lead => ({ ...lead }));
  render();
}

document.querySelector('#reset').addEventListener('click', () => {
  resetDemo();
  feedback.textContent = 'Sample pipeline restored.';
});
resetDemo();
