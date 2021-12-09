const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/professors-list",
  handler: async (ctx) => {
    const data = JSON.parse(localStorage.getItem("ASSET.json"));
    let professors = [];

    data.forEach((professor) => {
      professors.push({
        nombre: professor.nombre,
        expediente: professor.expediente,
        departamento: professor.unidad_organizativa,
      });
    });

    ctx.body = professors;

    ctx.status = 200;
  },
};
