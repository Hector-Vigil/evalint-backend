const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/organization-tree",
  handler: async (ctx) => {
    
    const data = JSON.parse(localStorage.getItem("ASSET.json"));

    const firstLevel = {};
    const secondLevel = {};
    const tree = {
      id: 'root',
      name: 'Organizaciones',
      children: [],
    };

    data.forEach((professor, index) => {

       if (professor["codigo_unidad_organizativa"].length === 4) {

        if (!firstLevel[professor["codigo_unidad_organizativa"]]) {
          firstLevel[professor["codigo_unidad_organizativa"]] = professor["unidad_organizativa"];
          const node = {
            id: index,
            name: professor["unidad_organizativa"],
            children: [],
          }
          tree.children.push(node);
        }
        
      }
      if (professor["codigo_unidad_organizativa"].length === 6) {

        if (!secondLevel[professor["codigo_unidad_organizativa"]]) {
            secondLevel[professor["codigo_unidad_organizativa"]] = professor["unidad_organizativa"];

            const organization = Object.keys(firstLevel).find(code => {
                  return professor["codigo_unidad_organizativa"].includes(code);
            });
            const suborganization = {
              id: index,
              name: professor["unidad_organizativa"],
              children: [],
            };
            tree.children.find(org => {
              if (org.name === firstLevel[organization]) {
                  org.children.push(suborganization);
                  return true; 
                }
            });
        }
        
      }
   
    
    });

    ctx.body = tree;

    ctx.status = 200;
  },
};