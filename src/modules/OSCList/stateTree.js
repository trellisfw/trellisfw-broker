let stateTree = {
  open: false,
  current: "Item 1",
	label: "SF",
  records: {
    "item 1": {
      label: "SR",
			title: "Sustainability Reporting",
			dateInit: "10.06.2019",
			trustLevel: "tl1"
    },
    "item 2": {
      label: "PD",
			title: "Planting Date Reporting",
			dateInit: "10.06.2019",
			trustLevel: "tl1"
    },
    "item 3": {
      label: "SF",
			title: "Sustainable Fishing",
			dateInit: "02.10.2019",
			trustLevel: "tl2"
    },
    "item 4": {
      label: "MB",
			title: "Organic Mass Balance",
			dateInit: "09.17.2019",
			trustLevel: "tl3"
    }
  }
};

export default stateTree;
