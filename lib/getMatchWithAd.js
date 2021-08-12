const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const fs = require("fs");
const axios = require("axios");


const usersSIGENU = {
  data: JSON.parse(localStorage.getItem("SIGENU.json")),
};
const usersAD = {
  data: JSON.parse(localStorage.getItem("AD.json")),
};

const MatchWithAD = async () => {
  /* const usersSIGENU = await axios.get(
    "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
  );
  const usersAD = await axios.get(
    "http://directoriounico.umcc.cu/api/getData.php?f=json&t=AD"
  );*/

  let total = 0;
  let registeredCounter = {};
  usersSIGENU.data.map((userSIGENU) => {
    let normalizedUserSIGENU = (userSIGENU.nombre + userSIGENU.apellidos)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("")
      .toLowerCase();

    usersAD.data.find((userAD) => {
      let normalizedUserAD = userAD.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
        .toLowerCase();
      if (
        normalizedUserSIGENU === normalizedUserAD ||
        userSIGENU.identidad === userAD.identidad
      ) {
        total++;

        if (!registeredCounter[userSIGENU.facultad_filial]) {
          registeredCounter[userSIGENU.facultad_filial] = {
            counter: 1,
            total: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial].counter += 1;
          registeredCounter[userSIGENU.facultad_filial].total += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera]
        ) {
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera] = {
            counter: 1,
            total: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.carrera
          ].counter += 1;
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.carrera
          ].total += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ]
        ) {
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ] = {
            counter: 1,
            total: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ].counter += 1;
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ].total += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ][userSIGENU.ano_de_estudio]
        ) {
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ][userSIGENU.ano_de_estudio] = {
            counter: 1,
            total: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ][userSIGENU.ano_de_estudio].counter += 1;
          registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
            userSIGENU.tipo_de_curso
          ][userSIGENU.ano_de_estudio].total += 1;
        }
      }

      return normalizedUserSIGENU === normalizedUserAD;
    });
    if (!registeredCounter[userSIGENU.facultad_filial]) {
      registeredCounter[userSIGENU.facultad_filial] = {
        total: 1,
        counter: 0,
      };
    } else {
      registeredCounter[userSIGENU.facultad_filial].total += 1;
    }
    if (!registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera]) {
      registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera] = {
        total: 1,
        counter: 0,
      };
    } else {
      registeredCounter[userSIGENU.facultad_filial][
        userSIGENU.carrera
      ].total += 1;
    }
    if (
      !registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ]
    ) {
      registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ] = {
        total: 1,
        counter: 0,
      };
    } else {
      registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ].total += 1;
    }
    if (
      !registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ][userSIGENU.ano_de_estudio]
    ) {
      registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ][userSIGENU.ano_de_estudio] = {
        total: 1,
        counter: 0,
      };
    } else {
      registeredCounter[userSIGENU.facultad_filial][userSIGENU.carrera][
        userSIGENU.tipo_de_curso
      ][userSIGENU.ano_de_estudio].total += 1;
    }
  });
  const matchInformation = {
    total,
    registeredCounter,
  };

  fs.writeFile(
    "./scratch/matchInformation.json",
    JSON.stringify(matchInformation, null, 4),
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = MatchWithAD;
