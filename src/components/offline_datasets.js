export const pac_dataset = {
	records: {
    "69e404ac-10c8-45b3-bf08-a37ee848a729": {
			  "id":    "69e404ac-10c8-45b3-bf08-a37ee848a729",
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
    "5d845dc6-c4bc-427f-83b5-c9a84f206f8a": {
			  "id":    "5d845dc6-c4bc-427f-83b5-c9a84f206f8a",
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
    "4f2e739b-de9a-4d04-953d-4691227ae9b9": {
			  "id":    "4f2e739b-de9a-4d04-953d-4691227ae9b9",
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

    "07fde5ad-87a6-4e81-b04a-2c83cefec408": {
			  "id":    "07fde5ad-87a6-4e81-b04a-2c83cefec408",
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

export const osc_dataset = {
  "records": {
    "316c9712-5e51-4267-8891-859b6a7cc3b7": {
      "id": "316c9712-5e51-4267-8891-859b6a7cc3b7",
      "oscid": {
        "codebase": "massbalance-v1.0.0",
        "pac": "massbalance-v1.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "cbebb6ce455ec34d361a6c544ed6b0a350fc46113e30a73178da2c8a921e3b93",
        "alg": "SHA-256"
      },
      "label": "MB",
      "title": "Organic Mass Balance",
      "date_init": "09.17.2019",
      "timestamp": "2019-08-14T02:38:32.921Z",
      "trust_level": "tl3",
       "organization": {
        "name": "Bob's Mass Balance"
      },
      "control_signals":{
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": true,
        "private_data": "all",
        "token": "servio"
      },
      "generated_pacs": {
        "pacrandomid1": {},
        "pacrandomid2": {}
      },
      "blockchain_config": {
        "host": "string"
      }
    },
    "3ac90b25-1d17-4eb7-9c51-0f47cfb1417a": {
      "id": "3ac90b25-1d17-4eb7-9c51-0f47cfb1417a",
      "oscid": {
        "codebase": "sustainabilityreporting-v1.0.0",
        "pac": "sustainabilityreporting-v1.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "2abe617b8d05a48a7a9b5a1eb461100f548774d76daac5749a20a54b5718617c",
        "alg": "SHA-256"
      },
      "label": "SR",
      "title": "Sustainability Reporting",
      "date_init": "09.17.2019",
      "timestamp": "2019-08-14T02:38:32.921Z",
      "trust_level": "tl1",
       "organization": {
        "name": "Bob's Sustainability Reporting"
      },
      "control_signals":{
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": true,
        "private_data": "all",
        "token": "servio"
      },
      "generated_pacs": {
        "pacrandomid1": {},
        "pacrandomid2": {}
      }
    },
    
    "3ad9c594-2460-4deb-8c2f-d9e26e69d288": {
      "id": "3ad9c594-2460-4deb-8c2f-d9e26e69d288",
      "oscid": {
        "codebase": "sustainablefishing-v1.0.0",
        "pac": "sustainablefishing-v1.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "a5c74730d322d80826ea1f29eb92a37565385c0fdfa5b38741583399b3fea738",
        "alg": "SHA-256"
      },
      "label": "SF",
      "title": "Sustainable Fishing",
      "date_init": "09.17.2019",
      "timestamp": "2019-08-14T02:38:32.921Z",
      "trust_level": "tl2",
       "organization": {
        "name": "Bob's Sustainable Fishing"
      },
      "control_signals":{
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": true,
        "private_data": "all",
        "token": "servio"
      },
      "generated_pacs": {
        "pacrandomid1": {},
        "pacrandomid2": {}
      }
    },
    
    "940a25b3-da82-4013-8f4c-d18f9c30cdf6": {
      "id": "940a25b3-da82-4013-8f4c-d18f9c30cdf6",
      "oscid": {
        "codebase": "plantingdatereporting-v1.0.0",
        "pac": "plantingdatereporting-v1.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "a5c74730d322d80826ea1f29eb92a37565385c0fdfa5b38741583399b3fea738",
        "alg": "SHA-256"
      },
      "label": "PD",
      "title": "Planting Date Reporting",
      "date_init": "09.17.2019",
      "timestamp": "2019-08-14T02:38:32.921Z",
      "trust_level": "tl1",
       "organization": {
        "name": "Bob's Planting Date Reporting"
      },
      "control_signals":{
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": true,
        "private_data": "all",
        "token": "servio"
      },
      "generated_pacs": {
        "pacrandomid1": {},
        "pacrandomid2": {}
      }
    }
  }
};
