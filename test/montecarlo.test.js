const chai = require("chai")
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let expect = chai.expect;
let now = require("performance-now");
let timeOut = 600 * 1000;
//let times = 1000000;
const total = 10;
let tests = 1000;
let init_n = 1000000;
let ns = [];

function montecarlo_osc(n) {
 let total = 0;
  let i, count;
  let x,y,z,pi;

  count=0;
	for (i=0; i<n; i++) {
    let temp = (i + i)/n;
    let temp1 = (i + i)/n;
    x = Math.random();
    y = Math.random();
    z = x*x + y*y;
    temp += temp1;
    if (z<=1) count++;
	}
  pi = count / n*4;

	return pi;
}

describe("========================= computing montecarlo ===================", function() {
    this.timeout(timeOut);
    for(let i=0; i<total; i++){
      let times = [];
      let total = 0;
      let n = init_n * (2**i);
      ns.push(n);
      let elapsed;
				for(let j=0; j<tests; j++){
//			it(`Should compute pi. run ${i}`, async function() {
				this.timeout(timeOut);

					let start = now();
					let pi = montecarlo_osc(n);
					let end = now();
					elapsed = end-start;
					total += elapsed;
					times.push(elapsed);
  //    });//it
				}//for #2

			let mean = total / tests;
			const std = Math.sqrt(times.map(x => Math.pow(x-mean,2)).reduce((a,b)=>a+b)/n);
			console.log(`${i} iteration -> n=${ns[i]} ->-> std ${std} -> elapsed time`, mean);

       /* console.log(" PI: ", pi);
				console.log(" --> accumulator ", times*acumm);
				console.log(" --> elapsed time", end - start);
*/
     }//for #1
});
