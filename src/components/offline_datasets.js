export const pac_dataset = {
	records: {
    "item0": {
			  "id":    "random id",
			  "label": "SR",
			  "title": "Sustainable Reporting",
			  "trust_level" : "tl1",
				"oscid": {
					"codebase": "sustainablereporting-v1.0.0",
					"pac": "sustainablereporting-v1.0.0",
					"definition": "https://github.com/trellisfw/osc-definitions"
				},
				"timestamp": "2019-08-14T02:38:32.921Z",
				"lot": "12345",
				"organization": {
					"name": "Bob's Farm"
				},
				"certification_status": "passed",
				"certified_quantity": { "value": "25", "units": "tons" },
				"certified_product": "apple", 
				"attestations": {
					"caught_within_sustainable_boundaries": true
				},
				"signatures": [
					 {
						 "quote": {
							 "report": "<base64 encoded report>",
							 "mrsigner": "<base64 encoded mrsigner>",
							 "mrenclave": "<base64 encoded mrenclave",
							 "user_data": "<base64 encoded user data, understood to be hash of PAC> ",
							 "value": "<base64 encoded entire quote>"
						 }
					 }
				],
				"data_hash": {
					"value": "e493999f59c6537c3bc674fb5d5fac6d6437e546fe202025591dee0625ee9bc9",
					"alg": "SHA-256"
				}
			},
    "item1": {
			  "id":    "random id",
			  "label": "SF",
			  "title": "Sustainable Fishing",
			  "trust_level" : "tl1",
				"oscid": {
					"codebase": "sustainablefishing-v1.0.0",
					"pac": "sustainablefishing-v1.0.0",
					"definition": "https://github.com/trellisfw/osc-definitions"
				},
				"timestamp": "2019-08-14T02:38:32.921Z",
				"lot": "12345",
				"organization": {
					"name": "Bob's Fishing Boat"
				},
				"certification_status": "passed",
				"certified_quantity": { "value": "25", "units": "tons" },
				"certified_product": "tuna", 
				"attestations": {
					"caught_within_sustainable_boundaries": true
				},
				"signatures": [
					 {
						 "quote": {
							 "report": "<base64 encoded report>",
							 "mrsigner": "<base64 encoded mrsigner>",
							 "mrenclave": "<base64 encoded mrenclave",
							 "user_data": "<base64 encoded user data, understood to be hash of PAC> ",
							 "value": "<base64 encoded entire quote>"
						 }
					 }
				],
				"data_hash": {
					"value": "e493999f59c6537c3bc674fb5d5fac6d6437e546fe202025591dee0625ee9bc9",
					"alg": "SHA-256"
				}
			},
    "item2": {
			  "id":    "random id 2",
			  "label": "PD",
			  "title": "Planting Date Reporting", 
			  "trust_level" : "tl2",
				"oscid": {
					"codebase": "plantingdate-v1.0.0",
					"pac": "plantingdate-v1.0.0",
					"definition": "https://github.com/trellisfw/osc-definitions"
				},
				"timestamp": "2019-08-14T02:38:32.921Z",
				"lot": "12345",
				"organization": {
					"name": "Bob's Farm"
				},
				"certification_status": "passed",
				"certified_quantity": { "value": "25", "units": "tons" },
				"certified_product": "tuna", 
				"attestations": {
					"caught_within_sustainable_boundaries": true
				},
				"signatures": [
					 {
						 "quote": {
							 "report": "<base64 encoded report>",
							 "mrsigner": "<base64 encoded mrsigner>",
							 "mrenclave": "<base64 encoded mrenclave",
							 "user_data": "<base64 encoded user data, understood to be hash of PAC> ",
							 "value": "<base64 encoded entire quote>"
						 }
					 }
				],
				"data_hash": {
					"value": "e493999f59c6537c3bc674fb5d5fac6d6437e546fe202025591dee0625ee9bc9",
					"alg": "SHA-256"
				}
			},

    "item3": {
			  "id":    "random id 3",
			  "label": "MB",
        "title": "Mass Balance",
			  "trust_level" : "tl3",
				"oscid": {
					"codebase": "massbalance-v1.0.0",
					"pac": "massbalance-v1.0.0",
					"definition": "https://github.com/trellisfw/osc-definitions"
				},
				"timestamp": "2019-08-14T02:38:32.921Z",
				"lot": "12345",
				"organization": {
					"name": "Bob's Fishing Boat"
				},
				"certification_status": "passed",
				"certified_quantity": { "value": "25", "units": "tons" },
				"certified_product": "tuna", 
				"attestations": {
					"caught_within_sustainable_boundaries": true
				},
				"signatures": [
					 {
						 "quote": {
							 "report": "<base64 encoded report>",
							 "mrsigner": "<base64 encoded mrsigner>",
							 "mrenclave": "<base64 encoded mrenclave",
							 "user_data": "<base64 encoded user data, understood to be hash of PAC> ",
							 "value": "<base64 encoded entire quote>"
						 }
					 }
				],
				"data_hash": {
					"value": "e493999f59c6537c3bc674fb5d5fac6d6437e546fe202025591dee0625ee9bc9",
					"alg": "SHA-256"
				}
			}
	}
}
