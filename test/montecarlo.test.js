const chai = require("chai")
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let expect = chai.expect;
let now = require("performance-now");
let timeOut = 600 * 1000;
let times = 1000000;
const total = 10;

function trial() {

	let count = 0;
	let sum = 0;
  while (sum<=1) {
		sum += Math.random();
		count++;
	}//while
	return count;
}

function montecarlo(n) {
 let total = 0;
	for (let i=0; i<n; i++){
    total += trial();
	}

	return total/n;
}

describe("========================= computing montecarlo ===================", function() {
    this.timeout(timeOut);
    for(let i=1; i<=total; i++){

			it(`Should compute pi. run ${i}`, async function() {
				this.timeout(timeOut);
				let acumm = 2**(i-1);
				let start = now();
				montecarlo(times*(acumm));
				let end = now();
				console.log(" --> accumulator ", times*acumm);
				console.log(" --> elapsed time", end - start);
			});

    }//for
});
