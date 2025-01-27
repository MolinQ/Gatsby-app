exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const productTemplate = require.resolve(
    "./src/templates/productTemplate.jsx",
  );

  createPage({
    path: "/Dashboard/",
    component: productTemplate,
  });
};
