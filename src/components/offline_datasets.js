export const pac_dataset = {
	"records": {
		"69e404ac-10c8-45b3-bf08-a37ee848a729": {
			"id": "69e404ac-10c8-45b3-bf08-a37ee848a729",
			"label": "SR",
			"title": "Sustainable Reporting",
			"trust_level": "tl1",
			"oscid": {
				"codebase": "sustainablereporting-v1.0.0",
				"pac": "sustainablereporting-v1.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2019-08-14T02:38:32.921Z",
			"lot": "12345",
			"organization": {
				"id": "bc755264-4e68-433e-a431-081e79bcc81c",
				"name": "Bob's Farm"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "10",
				"units": "tons"
			},
			"certified_product": "apple",
			"attestations": {
				"balance": true
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
			"id": "5d845dc6-c4bc-427f-83b5-c9a84f206f8a",
			"label": "SF",
			"title": "Sustainable Fishing",
			"trust_level": "tl2",
			"oscid": {
				"codebase": "sustainablefishing-v1.0.0",
				"pac": "sustainablefishing-v1.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2019-08-14T02:38:32.921Z",
			"lot": "12345",
			"organization": {
				"id": "474fb52f-347a-4b86-947b-1d2f7f3f052f",
				"name": "Alice's Fishing Boat"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "25",
				"units": "tons"
			},
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
			"id": "4f2e739b-de9a-4d04-953d-4691227ae9b9",
			"label": "S3",
			"title": "Sustainable Fishing",
			"trust_level": "tl3",
			"oscid": {
				"codebase": "sustainablefishing-v2.0.0",
				"pac": "sustainablefishing-v2.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2020-03-25T02:38:32.921Z",
			"lot": "45678",
			"organization": {
				"id": "bc755264-4e68-433e-a431-081e79bcc81c",
				"name": "Bob's Farm"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "2",
				"units": "tons"
			},
			"certified_product": "salmon",
			"attestations": {
				"balance": true
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
			"id": "07fde5ad-87a6-4e81-b04a-2c83cefec408",
			"label": "S3",
			"title": "Sustainable Fishing TL3",
			"trust_level": "tl3",
			"oscid": {
				"codebase": "massbalance-v1.0.0",
				"pac": "massbalance-v1.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2019-08-14T02:38:32.921Z",
			"lot": "12345",
			"organization": {
				"id": "380f7202-2ccc-4f14-bee7-c2d55c019686",
				"name": "Bob's Fishing"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "50",
				"units": "tons"
			},
			"certified_product": "fish",
			"attestations": {
				"organic_apple": true,
				"balance": true
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
};

		/*"4f2e739b-de9a-4d04-953d-4691227ae9b9": {
			"id": "4f2e739b-de9a-4d04-953d-4691227ae9b9",
			"label": "PD",
			"title": "Planting Date Reporting",
			"trust_level": "tl1",
			"oscid": {
				"codebase": "plantingdate-v1.0.0",
				"pac": "plantingdate-v1.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2019-08-14T02:38:32.921Z",
			"lot": "12345",
			"organization": {
				"id": "bc755264-4e68-433e-a431-081e79bcc81c",
				"name": "Bob's Farm"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "25",
				"units": "tons"
			},
			"certified_product": "Corn",
			"attestations": {
				"balance": true
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
		},*/

export const osc_dataset = {
  "records": {
		
    "316c9712-5e51-4267-8891-859b6a7cc3b7": {
      "id": "316c9712-5e51-4267-8891-859b6a7cc3b7",
      "oscid": {
        "codebase": "sustainablefishing-v3.0.0",
        "pac": "sustainablefishing-v3.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "cbebb6ce455ec34d361a6c544ed6b0a350fc46113e30a73178da2c8a921e3b93",
        "alg": "SHA-256"
      },
      "label": "S3",
      "title": "Sustainable Fishing TL3",
      "date_init": "05.05.2020",
      "timestamp": "2020-05-05T02:38:32.921Z",
      "trust_level": "tl3",
       "organization": {
        "name": "Bob's Fishing"
      },
      "control_signals":{
				"osc_hash": true,
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": false,
        "private_data": "",
        "private_data_path": "",
        "token": ""
      },
      "generated_pacs": {},
      "blockchain_config": {
        "host": "string"
      }
    },
    "3ac90b25-1d17-4eb7-9c51-0f47cfb1417a": {
      "id": "3ac90b25-1d17-4eb7-9c51-0f47cfb1417a",
      "oscid": {
        "codebase": "sustainablereporting-v2.0.0",
        "pac": "sustainablereporting-v2.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "2abe617b8d05a48a7a9b5a1eb461100f548774d76daac5749a20a54b5718617c",
        "alg": "SHA-256"
      },
      "label": "SR",
      "title": "Sustainable Reporting",
      "date_init": "03.25.2020",
      "timestamp": "2020-03-25T02:38:32.921Z",
      "trust_level": "tl1",
       "organization": {
        "name": "Bob's Sustainable Reporting"
      },
      "control_signals":{
				"osc_hash": true,
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": false,
        "private_data": "",
        "private_data_path": "",
        "token": ""
      },
      "generated_pacs": {}
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
				"osc_hash": true,
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": false,
        "private_data": "",
        "private_data_path": "",
        "token": ""
      },
      "generated_pacs": {}
    }//,
    
   /* "940a25b3-da82-4013-8f4c-d18f9c30cdf6": {
      "id": "940a25b3-da82-4013-8f4c-d18f9c30cdf6",
      "oscid": {
        "codebase": "plantingdatereporting-v1.0.0",
        "pac": "plantingdatereporting-v1.0.0",
        "definition": "https://github.com/trellisfw/osc-definitions"
      },
      "osc_hash": {
        "value": "d3f1ac2f3e64562e34c381bdc6f7d3ea0a46a31f6b11c979f2bdf3929e7b0bd3",
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
				"osc_hash": false,
        "restart": false,
        "init_ra": false,
        "turnoff": false,
        "generate_pac": false,
        "private_data": "",
        "private_data_path": "",
        "token": ""
      },
      "generated_pacs": {}
    }*/
  }
};

export let local_oscs = ["316c9712-5e51-4267-8891-859b6a7cc3b7", 
                         "3ad9c594-2460-4deb-8c2f-d9e26e69d288"];

export let pac_template = {
			"id": "69e404ac-10c8-45b3-bf08-a37ee848a729",
			"label": "DE",
			"title": "Demo PAC Record",
			"trust_level": "tl1",
			"oscid": {
				"codebase": "sustainablereporting-v1.0.0",
				"pac": "sustainablereporting-v1.0.0",
				"definition": "https://github.com/trellisfw/osc-definitions"
			},
			"timestamp": "2019-08-14T02:38:32.921Z",
			"lot": "45",
			"organization": {
				"id": "bc755264-4e68-433e-a431-081e79bcc81c",
				"name": "Bob's Farm"
			},
			"certification_status": "passed",
			"certified_quantity": {
				"value": "10",
				"units": "tons"
			},
			"certified_product": "Fish",
			"attestations": {
				"balance": true,
				"temperature": true
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
				"value": "00534a6ac0c50e40a6f5293a72b8b320e637cb9a998847d19210af3ce7564eb5",
				"alg": "SHA-256"
			}
};

export let filtered_private_dataset = {
	"20c6626f-6baf-47fb-b8ed-d5f0af6f59f2": 30,
	"224a5bc4-b900-480c-9745-08414b397bab": 35,
	"9b1c8816-d1ae-453e-8314-0e1821b7b6ba": 32,
	"c5e586a3-e1c7-4574-97a9-e749d5a86414": 35,
	"17fadd78-d5a2-48c7-b5cb-629f2115082a": 40,
	"111add78-d5a2-48c7-b5cb-629f2115082a": 38,
	"2224dd78-d5a2-48c7-b5cb-629f2115082a": 37
};

export let private_dataset = {
	"records": {
  "20c6626f-6baf-47fb-b8ed-d5f0af6f59f2": {
    "id": "20c6626f-6baf-47fb-b8ed-d5f0af6f59f2",
    "label": "Apple",
    "title": "Apple's Sustainable Reporting",
    "timestamp": "2019-12-30T02:38:32.921Z",
    "lot": "1",
    "organization": {
      "id": "bc755264-4e68-433e-a431-081e79bcc81c",
      "name": "Bob's Farm"
    },
    "product": "apple",
    "temperature": 40,
    "data_hash": {
      "value": "d59eced1ded07f84c145592f65bdf854358e009c5cd705f5215bf18697fed103",
      "alg": "SHA-256"
    }
  },
  "224a5bc4-b900-480c-9745-08414b397bab": {
    "id": "224a5bc4-b900-480c-9745-08414b397bab",
    "label": "Apple",
    "title": "Apple's Sustainable Reporting",
    "timestamp": "2019-12-30T02:38:32.921Z",
    "lot": "2",
    "organization": {
      "id": "bc755264-4e68-433e-a431-081e79bcc81c",
      "name": "Bob's Farm"
    },
    "product": "apple",
    "temperature": 40,
    "data_hash": {
      "value": "d59eced1ded07f84c145592f65bdf854358e009c5cd705f5215bf18697fed103",
      "alg": "SHA-256"
    }
  },
  "9b1c8816-d1ae-453e-8314-0e1821b7b6ba": {
    "id": "9b1c8816-d1ae-453e-8314-0e1821b7b6ba",
    "label": "Apple",
    "title": "Apple's Sustainable Reporting",
    "timestamp": "2019-12-30T02:38:32.921Z",
    "lot": "3",
    "organization": {
      "id": "bc755264-4e68-433e-a431-081e79bcc81c",
      "name": "Bob's Farm"
    },
    "product": "apple",
    "temperature": 37,
    "data_hash": {
      "value": "7a61b53701befdae0eeeffaecc73f14e20b537bb0f8b91ad7c2936dc63562b25",
      "alg": "SHA-256"
    }
  },
  "c5e586a3-e1c7-4574-97a9-e749d5a86414": {
    "id": "c5e586a3-e1c7-4574-97a9-e749d5a86414",
    "label": "Apple",
    "title": "Apple's Sustainable Reporting",
    "timestamp": "2019-12-30T02:38:32.921Z",
    "lot": "4",
    "organization": {
      "id": "bc755264-4e68-433e-a431-081e79bcc81c",
      "name": "Bob's Farm"
    },
    "product": "apple",
    "temperature": 40,
    "data_hash": {
      "value": "d59eced1ded07f84c145592f65bdf854358e009c5cd705f5215bf18697fed103",
      "alg": "SHA-256"
    }
  },
  "17fadd78-d5a2-48c7-b5cb-629f2115082a": {
    "id": "17fadd78-d5a2-48c7-b5cb-629f2115082a",
    "label": "Apple",
    "title": "Apple's Sustainable Reporting",
    "timestamp": "2019-12-30T02:38:32.921Z",
    "lot": "5",
    "organization": {
      "id": "bc755264-4e68-433e-a431-081e79bcc81c",
      "name": "Bob's Farm"
    },
    "product": "apple",
    "temperature": 38,
    "data_hash": {
      "value": "aea92132c4cbeb263e6ac2bf6c183b5d81737f179f21efdc5863739672f0f470",
      "alg": "SHA-256"
    }
  }
	}
};

export let osc_template = {
      "id": "",
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
        "osc_hash":     false,
        "restart":      false,
        "init_ra":      false,
        "turnoff":      false,
        "generate_pac": false,
        "private_data": "",
        "private_data_path": "",
        "token": ""
      },
      "generated_pacs": {
        "pacrandomid1": {},
        "pacrandomid2": {}
      },
      "blockchain_config": {
        "host": "string"
      }
};
