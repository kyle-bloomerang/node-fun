var csvParser = require('csv-parser');
const fs = require('fs');

const getData = () => {
    return parseSquirrelData(parsePowers())
    
}

const parsePowers = () => {
    let super_hero_powers = [];
    fs.createReadStream("./csv-data/super_hero_powers.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            super_hero_powers.push(data);
        })
        .on("end", () => {
            console.log("Parsed super hero powers")
        });
        return super_hero_powers;
}

const parseSquirrelData = (super_hero_powers) => {
    let squirrelData = [];
    let squirrelPowerMap = {};
    let index = 0;
    fs.createReadStream("./csv-data/nyc_squirrels.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            if (!squirrelPowerMap[data.unique_squirrel_id]){
                squirrelPowerMap[data.unique_squirrel_id] = index;
                index = index > super_hero_powers.length ? 0 : index + 1
            }
            data['hero_data'] = super_hero_powers[squirrelPowerMap[data.unique_squirrel_id]]
            squirrelData.push(data);
        })
        .on("end", () => {
            console.log("Parsed squirrels powers")
        });
    return squirrelData;
}

module.exports = {
    getData
}