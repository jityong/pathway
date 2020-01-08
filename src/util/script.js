var xlsx = require("xlsx");
var fs = require('fs');
var wb = xlsx.readFile("../data/PricesData.xlsm");

var drugsWS = wb.Sheets["Drugs"];
var testsWS = wb.Sheets["Tests"];
var consultationWS = wb.Sheets["Consultation"]

var drugsData = xlsx.utils.sheet_to_json(drugsWS);
var testsData = xlsx.utils.sheet_to_json(testsWS);
var consultationData = xlsx.utils.sheet_to_json(consultationWS);

var newDrugsData = drugsData.map(function(data) {
    data.PCN_Price = {};
    data.PCN_Price.NON_CHAS = data.PCN_Status == "S1"
        ? "Charged at $1.40/week or "
        + xlsx.SSF.format('$0.00',data.PCN_UnitPrice * 0.75)
        + "/tablet, whichever is cheaper"
            : data.PCN_Status == "S2"
            ? data.PCN_UnitPrice * 0.5 * 0.75
        : data.PCN_UnitPrice;
    data.PCN_Price.GREEN_CHAS = data.PCN_Price.NON_CHAS;
    data.PCN_Price.ORANGE_CHAS = data.PCN_Status == "S1"
        ? "Charged at $1.40/week or " + xlsx.SSF.format('$0.00',data.PCN_UnitPrice * 0.25)
        + "/tablet, whichever is cheaper"
        : data.PCN_Status == "S2"
            ? data.PCN_UnitPrice * 0.5 * 0.25
        : data.PCN_UnitPrice;
    data.PCN_Price.BLUE_CHAS = data.PCN_Price.ORANGE_CHAS;
    data.PCN_Price.MG_CHAS = data.PCN_Status == "S1"
        ? "Charged at $1.40/week or "
        + xlsx.SSF.format('$0.00',data.PCN_UnitPrice * 0.1875)
        + "/tablet, whichever is cheaper"
            : data.PCN_Status == "S2"
            ? data.PCN_UnitPrice * 0.5 * 0.1875
        : data.PCN_UnitPrice;
    data.PCN_Price.PG_CHAS = data.PCN_Status == "S1"
        ? "Charged at $1.40/week or "
        + xlsx.SSF.format('$0.00',data.PCN_UnitPrice * 0.125)
        + "/tablet, whichever is cheaper"
            : data.PCN_Status == "S2"
            ? data.PCN_UnitPrice * 0.5 * 0.125
        : data.PCN_UnitPrice;
    data.PCN_Price.NON_SG = data.PCN_UnitPrice;

    data.Polyclinic_Price = {};
    data.Polyclinic_Price.PG = data.Polyclinic_Status =="NA" ? "NA"
        : data.Polyclinic_Status == "S1"
        ? "Charged at $0.70/week or "
        + xlsx.SSF.format('$0.00',data.Polyclinic_UnitPrice * 0.5)
        + "/tablet, whichever is cheaper"
        : data.Polyclinic_Status == "S2"
            ? data.Polyclinic_UnitPrice * 0.5 * 0.5
            : data.Polyclinic_UnitPrice;
    data.Polyclinic_Price.MG_above65 = data.Polyclinic_Status =="NA" ? "NA"
        : data.Polyclinic_Status == "S1"
        ? "Charged at $0.70/week or "
        + xlsx.SSF.format('$0.00',data.Polyclinic_UnitPrice * 0.25)
        + "/tablet, whichever is cheaper"
            : data.Polyclinic_Status == "S2"
            ? data.Polyclinic_UnitPrice * 0.5 * 0.25
        : data.Polyclinic_UnitPrice;
    data.Polyclinic_Price.MG_below65 = data.Polyclinic_Status =="NA" ? "NA"
        : data.Polyclinic_Status == "S1"
        ? "Charged at $1.40/week or "
        + xlsx.SSF.format('$0.00',data.Polyclinic_UnitPrice * 0.25)
        + "/tablet, whichever is cheaper"
            : data.Polyclinic_Status == "S2"
            ? data.Polyclinic_UnitPrice * 0.5 * 0.25
        : data.Polyclinic_UnitPrice;
    data.Polyclinic_Price.below65 = data.Polyclinic_Status =="NA" ? "NA"
        : data.Polyclinic_Status == "S1"
        ? "Charged at $1.40/week or " + xlsx.SSF.format('$0.00', data.Polyclinic_UnitPrice)
        + "/tablet, whichever is cheaper"
            : data.Polyclinic_Status == "S2"
            ? data.Polyclinic_UnitPrice * 0.5
        : data.Polyclinic_UnitPrice;
    data.Polyclinic_Price.noPG_above65 = data.Polyclinic_Status == "NA" ? "NA"
        : data.Polyclinic_Status == "S1"
        ? "Charged at $0.70/week or " + xlsx.SSF.format('$0.00', data.Polyclinic_UnitPrice)
        + "/tablet, whichever is cheaper"
            : data.Polyclinic_Status == "S2"
            ? data.Polyclinic_UnitPrice * 0.5
        : data.Polyclinic_UnitPrice;

    data.Polyclinic_Price.nonSG = data.Polyclinic_Status == "NA" ? "NA" : data.Polyclinic_UnitPrice;

    return data;

})

var newTestsData = testsData.map(function (data) {
    data.PCN_Price = {};
    data.PCN_Price.PG = data.PCN_PG_CHAS == "NA" ? "NA" : data.PCN_PG_CHAS;
    data.PCN_Price.MG = data.PCN_MG_CHAS == "NA" ? "NA" : data.PCN_MG_CHAS;
    data.PCN_Price.ORANGE_CHAS = data.PCN_Orange_CHAS == "NA" ? "NA" : data.PCN_Orange_CHAS;
    data.PCN_Price.BLUE_CHAS = data.PCN_Blue_CHAS == "NA" ? "NA" : data.PCN_Blue_CHAS;
    data.PCN_Price.GREEN_CHAS = data.PCN_Green_CHAS == "NA" ? "NA" :  data.PCN_Green_CHAS;
    data.PCN_Price.Non_CHAS = data.PCN_Non_CHAS == "NA" ? "NA" :data.PCN_Non_CHAS;
    data.PCN_Price.PR = data.PCN_PRs == "NA" ? "NA" : data.PCN_PRs;
    data.PCN_Price.NON_RESIDENT = data.PCN_NonResident == "NA" ? "NA" : data.PCN_NonResident;

    data.Polyclinic_Price = {};
    data.Polyclinic_Price.SG = data.Polyclinic_SG == "NA" ? "NA" : data.Polyclinic_SG;
    data.Polyclinic_Price.PR = data.Polyclinic_PR == "NA" ? "NA" : data.Polyclinic_PR;
    data.Polyclinic_Price.SG_CHILD_ELDERLY = data.Polyclinic_SG_Child_Elderly == "NA" ? "NA" : data.Polyclinic_SG_Child_Elderly;
    data.Polyclinic_Price.NON_RESIDENT = data.Polyclinic_NonResident == "NA" ? "NA" : data.Polyclinic_NonResident;
    return data;

})

var newConsultationData = consultationData.map(function(data) {
    data.PCN_Price = {};
    data.PCN_Price.PG = data.PCN_PG_CHAS == "NA" ? "NA" : data.PCN_PG_CHAS;
    data.PCN_Price.MG = data.PCN_MG_CHAS == "NA" ? "NA" : data.PCN_MG_CHAS;
    data.PCN_Price.ORANGE_CHAS = data.PCN_ORANGE_CHAS == "NA" ? "NA" : data.PCN_ORANGE_CHAS;
    data.PCN_Price.BLUE_CHAS = data.PCN_BLUE_CHAS == "NA" ? "NA" : data.PCN_BLUE_CHAS;
    data.PCN_Price.GREEN_CHAS = data.PCN_GREEN_CHAS == "NA" ? "NA" : data.PCN_GREEN_CHAS;
    data.PCN_Price.NON_CHAS = data.PCN_NON_CHAS == "NA" ? "NA" : data.PCN_NON_CHAS;
    data.PCN_Price.NON_RESIDENT = data.PCN_NON_CHAS == "NA" ? "NA" : data.PCN_NON_CHAS;

    data.Polyclinic_Price = {};
    data.Polyclinic_Price.SG_ADULT = data.POLYCLINIC_SG_ADULT == "NA" ? "NA" : data.POLYCLINIC_SG_ADULT;
    data.Polyclinic_Price.PR = data.POLYCLINIC_PR == "NA" ? "NA" : data.POLYCLINIC_PR;
    data.Polyclinic_Price.SG_CHILD_ELDERLY = data.POLYCLINIC_SG_CHILD_ELDERLY == "NA" ? "NA" : data.POLYCLINIC_SG_CHILD_ELDERLY;
    data.Polyclinic_Price.NON_RESIDENT = data.POLYCLINIC_NON_RESIDENT == "NA" ? "NA" : data.POLYCLINIC_NON_RESIDENT;
    data.Polyclinic_Price.PG = data.POLYCLINIC_SG_CHILD_ELDERLY == "NA" ? "NA" : data.POLYCLINIC_SG_CHILD_ELDERLY * 0.5;
    data.Polyclinic_Price.MG = data.POLYCLINIC_SG_CHILD_ELDERLY == "NA" ? "NA" : data.POLYCLINIC_SG_CHILD_ELDERLY * 0.25;
    return data;
})
// console.log(newDrugsData);
// console.log(newTestsData);

function callback() {

}
var drugPrices = {drugs: newDrugsData};
var testPrices = {tests: newTestsData};
var consultationPrices = {consultation: newConsultationData};
fs.writeFile('../data/testPrices.json', JSON.stringify(testPrices, null, 4), 'utf8', callback);
fs.writeFile('../data/drugPrices.json', JSON.stringify(drugPrices, null, 4), 'utf8', callback);
fs.writeFile('../data/consultationPrices.json', JSON.stringify(consultationPrices, null, 4), 'utf8', callback);


console.log(JSON.stringify(newTestsData, null, 4));
