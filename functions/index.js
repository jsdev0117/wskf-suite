const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);
const uri = "https://wskf-suite.hasura.app/v1/graphql";
const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "QC5ZkgJDHuX4lZ0xX37RQ75kWLpDKhGIUYh93M2Q0u3BLfqJrDr3Q4pQ0rl9WQT8",
}

const insert_user = `
mutation fb_insert_user($objects: [users_insert_input!] = {}) {
  insert_users(objects: $objects) {
    affected_rows
  }
}
`;

exports.addUser = functions.https.onCall(async (request) => {
  let { email, name, role, password } = request;

  const user = await admin.auth().createUser({
    email,
    emailVerified: true,
    password,
    displayName: name,
    disabled: false,
    role,
  });

  if (user) {
    let customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": role,
        "x-hasura-allowed-roles": ["admin", "sensei"],
        "x-hasura-user-id": user.uid,
      },
    };
    admin.auth().setCustomUserClaims(user.uid, customClaims).then().catch((error) => {
      console.log(error);
    });

    // insertar en hasura
    const { data } = await axios.post(uri, {
      query: insert_user,
      variables: {
        objects: {
          id: user.uid,
          name,
          email,
        },
      },
    }, { headers });

    return data;
  }
});