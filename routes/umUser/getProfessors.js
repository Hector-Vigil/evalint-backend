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
        categoria_docente: professor.categoria_docente,
        categoria_cientifica: professor.categoria_cientifica,
        cargo_ocupacional: professor.cargo_ocupacional,
        tipo_de_contrato: professor.tipo_de_contrato,
        genero: professor.genero,
      });
    });

    ctx.body = professors;

    ctx.status = 200;
  },
};
