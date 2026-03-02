export const PORT = Number(process.env.PORT) || 3977;
export const IP_SERVER = process.env.IP_SERVER || "localhost";

const dbHost = process.env.DB_HOST || "localhost:27017";
const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";

let dbUriFromParts = "";

if(dbHost === "localhost:27017") {

    dbUriFromParts = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}}?authSource=admin`;

}
else {
    dbUriFromParts = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`;       
}

export const DB_URI = dbUriFromParts;
