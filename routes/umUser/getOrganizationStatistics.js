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

const belongToOrganization = (organizations, professor) => {
  if (organizations[0] === "root") {
    return true;
  }
  const org = organizations.find((org) => {
    if (org === professor.unidad_organizativa) return true;
  });
  return org;
};

const isDocente = (professor) => {
  for(let i = 0; i < teachingCategory.length; i++)
    if(professor.categoria_docente === teachingCategory[i]) return true;
  return false;
}

module.exports = {
  method: "post",
  path: "/organization-statistics",
  handler: async (ctx) => {
    const data = JSON.parse(localStorage.getItem("ASSET.json"));
    const total = {};
    
    let { organizations } = ctx.request.body;
    organizations = JSON.parse(organizations);
    let docente = 0;
    let noDocente = 0;
    let masc = 0;
    let fem = 0;
    let dpto = {};
    data.forEach((professor) => {
      
      if (belongToOrganization(organizations, professor)) {
        if(!dpto[professor.unidad_organizativa])
          dpto[professor.unidad_organizativa] = 1;
        else
          dpto[professor.unidad_organizativa] += 1;

        if(!isDocente(professor)) noDocente++;
        else docente++;

        if(professor.genero === "Masculino") masc++;
        else fem++;

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
        scientificCategory.forEach((sc) => {
          if (!total[sc]) {
            if (professor.categoria_cientifica === sc) total[sc] = 1;
          } else {
            if (professor.categoria_cientifica === sc) total[sc] += 1;
          }
        });
        total["Docente"] = docente;
        total["No Docente"] = noDocente;
        total["Masculino"] = masc;
        total["Femenino"] = fem;
        total["Departamento"] = dpto;
      }
    });

    ctx.body = total;

    ctx.status = 200;
  },
};
