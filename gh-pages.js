const ghpages = require("gh-pages");

ghpages.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/fl4viooliveira/fl4viooliveira.github.io", // Update to point to your repository
    user: {
      name: "Flavio Oliveira", // update to use your name
      email: "fl4viooliveira@gmail.com", // Update to use your email
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
