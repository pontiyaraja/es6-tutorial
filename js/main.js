//import * as mortgage from './mortgage';
import Mortgage from './mortgage2';

//class Mortgage {
//    constructor(principal, years, rate){
//        this.principal = principal;
//        this.years = years;
//        this.rate = rate;
//    }
//
//    get monthlyPayment() {
//            let monthlyRate = this.rate / 100 / 12;
//            return this.principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate),
//                        this.years * 12)));
//    }
//
//    get amortization() {
//            let monthlyPayment = this.monthlyPayment;
//            let monthlyRate = this.rate / 100 / 12;
//            let balance = this.principal;
//            let amortization = [];
//            for (let y=0; y<this.years; y++) {
//                let interestY = 0;
//                let principalY = 0;
//                for (let m=0; m<12; m++) {
//                    let interestM = balance * monthlyRate;
//                    let principalM = monthlyPayment - interestM;
//                    interestY = interestY + interestM;
//                    principalY = principalY + principalM;
//                    balance = balance - principalM;
//                }
//                amortization.push({principalY, interestY, balance});
//            }
//            return amortization;
//    }
//
//    get calculateMonthlyPayment(){
//        let monthlyRate = 0
//        if (rate) {
//            monthlyRate = rate / 100 / 12;
//        }
//        let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
//        return {principal, years, rate, monthlyPayment, monthlyRate};;
//    }
//
//    get calculateAmortization () {
//            let {monthlyRate, monthlyPayment} = this.calculateMonthlyPayment;
//            let balance = principal;
//            let amortization = [];
//            for (let y=0; y<years; y++) {
//                let interestY = 0;  //Interest payment for year y
//                let principalY = 0; //Principal payment for year y
//                for (let m=0; m<12; m++) {
//                    let interestM = balance * monthlyRate;       //Interest payment for month m
//                    let principalM = monthlyPayment - interestM; //Principal payment for month m
//                    interestY = interestY + interestM;
//                    principalY = principalY + principalM;
//                    balance = balance - principalM;
//                }
//                amortization.push({principalY, interestY, balance});
//            }
//            return {monthlyPayment, monthlyRate, amortization};
//        }
//}

document.getElementById('calcBtn').addEventListener('click', () => {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;
    //var monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    let mortgage = new Mortgage(principal, years, rate);
    //let {monthlyPayment, monthlyRate, amortization} = mortgage.calculateAmortization(principal, years, rate);
    //let {monthlyPayment, monthlyRate, amortization} = mortgage.calculateAmortization;
    //to use from module
    //document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    //document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    //amortization.forEach(month => console.log(month));

    document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (rate / 12).toFixed(2);

    let html = "";

    mortgage.amortization.forEach((year, index) => html += `
            <tr>
                <td>${index + 1}</td>
                <td class="currency">${Math.round(year.principalY)}</td>
                <td class="stretch">
                    <div class="flex">
                        <div class="bar principal"
                             style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                        </div>
                        <div class="bar interest"
                             style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                        </div>
                    </div>
                </td>
                <td class="currency left">${Math.round(year.interestY)}</td>
                <td class="currency">${Math.round(year.balance)}</td>
            </tr>
    `);

    document.getElementById("amortization").innerHTML = html;
});