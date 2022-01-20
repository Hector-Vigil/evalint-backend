const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const teachingCategory = ["Asistente", "Instructor", "Titular", "Auxiliar"];

const scientificCategory = ["Master", "Doctor"];

const occupationalPosition = ["T", "CS", "S", "A", "O"];

const contractType = [
  "Indeterminado",
  "Determinado",
  "Adiestrado",
  "Jubilado",
  "V",
  "P",
  "1",
];

module.exports = {
  method: "post",
  path: "/users-statistics",
  handler: async (ctx) => {
    // const data = JSON.parse(localStorage.getItem("ASSET.json"));
    const total = {};

    let { professors } = ctx.request.body;
    professors = JSON.parse(professors);

    professors.forEach((professor) => {
      
        teachingCategory.forEach((tc) => {
            if (!total[tc]) {
            if (professor.categoria_docente === tc) total[tc] = 1;
            } else {
            if (professor.categoria_docente === tc) total[tc] += 1;
            }
            scientificCategory.forEach((sc) => {
            if (!total[`${tc} ${sc}`]) {
                if (
                professor.categoria_docente === tc &&
                professor.categoria_cientifica === sc
                )
                total[`${tc} ${sc}`] = 1;
            } else {
                if (
                professor.categoria_docente === tc &&
                professor.categoria_cientifica === sc
                )
                total[`${tc} ${sc}`] += 1;
            }
            occupationalPosition.forEach((op) => {
                if (!total[`${tc} ${sc} ${op}`]) {
                if (
                    professor.categoria_docente === tc &&
                    professor.categoria_cientifica === sc &&
                    professor.cargo_ocupacional === op
                )
                    total[`${tc} ${sc} ${op}`] = 1;
                } else {
                if (
                    professor.categoria_docente === tc &&
                    professor.categoria_cientifica === sc &&
                    professor.cargo_ocupacional === op
                )
                    total[`${tc} ${sc} ${op}`] += 1;
                }
                contractType.forEach((ct) => {
                if (!total[`${tc} ${sc} ${op} ${ct}`]) {
                    if (
                    professor.categoria_docente === tc &&
                    professor.categoria_cientifica === sc &&
                    professor.cargo_ocupacional === op &&
                    professor.tipo_de_contrato === ct
                    )
                    total[`${tc} ${sc} ${op} ${ct}`] = 1;
                } else {
                    if (
                    professor.categoria_docente === tc &&
                    professor.categoria_cientifica === sc &&
                    professor.cargo_ocupacional === op &&
                    professor.tipo_de_contrato === ct
                    )
                    total[`${tc} ${sc} ${op} ${ct}`] += 1;
                }
                });
            });
            });
        });      
    });

    ctx.body = total;

    ctx.status = 200;
  },
};
