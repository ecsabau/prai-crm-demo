# PRAI CRM Demo

An offline sales pipeline demo with fictional leads. Move a lead between New, Contacted, Discovery, Proposal sent, Won and Lost. The stage counts and values update as you work.

## Run on Windows

1. Right-click the ZIP and select **Extract All**.
2. Open the extracted `prai-crm-demo` folder.
3. Double-click `index.html` to open it in Edge or Chrome.

The demo needs no installation, server, credentials, environment files or PowerShell session. Lead changes last until you refresh the page or select **Reset demo**. All company names and amounts are sample data.

## Try a lead move

1. Find **Fernbridge Advisory** under **Proposal sent**.
2. In **Move lead to**, select **Won**.
3. Check that Fernbridge Advisory moved to **Won**. Open leads should drop from 4 to 3, open pipeline value from £6,350 to £4,550, and won value from £900 to £2,700.
4. Select **Reset demo** to restore the starting pipeline.

## Add to GitHub

Create an empty public repository called `prai-crm-demo`. Leave the README, licence and gitignore settings unset. Use **uploading an existing file** to upload these five files from the extracted folder, then commit them.

| File | Purpose |
| --- | --- |
| `index.html` | Dashboard layout |
| `styles.css` | Responsive styles |
| `pipeline.js` | Sample leads, stage changes and value calculations |
| `README.md` | Setup and demo walkthrough |
| `.gitignore` | Common local credential and backup paths to ignore in Git |

Suggested repository description

> Offline CRM portfolio demo with fictional leads, six sales stages and live pipeline totals.

Use the extracted demo folder as your upload source. Keep production code, client records, credentials and backups outside it.
