const WikimediaStream = require("wikimedia-streams").default;
const stream = new WikimediaStream("page-links-change");

stream.on("open", () => {
  console.info("Opened connection.");
});
stream.on("error", (event) => {
  console.error("Encountered error", event);
});
stream.on("page-links-change", (data, event) => {
  if (data.page_namespace === 0 && "added_links" in data) {
    // Output page title
    //console.log(data.added_links);
    for (const added in data.added_links) {
      if (data.added_links[added].external) {
        let site = data.database;
        let link = data.added_links[added].link;
        let revision = data.rev_id;
        console.log(site + ": " + link + " added in " + revision);
      }
    }
  }
});
