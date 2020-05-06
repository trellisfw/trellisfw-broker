import { green } from "@material-ui/core/colors";

export const useStyles = theme => ({
	progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
      }
  },
	hidden: {
	  display: "none"
	},
	pill: {
    textAlign: "center",
		padding: "1px",
		marginTop: "1px",
		marginBottom: "5px",
		alignItems: "center",
		borderRadius: "3px",
		color: "#5c8a8a",
		textShadow: "1px 1px #000000",
	},
	paccontent: {
    textAlign: "left",
		padding: "1px",
		marginTop: "1px",
		marginBottom: "2px",
		alignItems: "left",
		borderRadius: "3px",
		color: "#5c8a8a",
		textShadow: "1px 1px #000000",
	},
  container: {
    paddingTop: '5px'
  },
  card: {
    flexGrow: 1,
    background: '#E9E8E8'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
	pacList: {
	  width: '100%',
		paddingTop: '2px',
		maxWidth: 375,
		borderRadius: "3px",
		borderColor: "#000000"
	},
	button: {
		margin: theme.spacing(1)
	}
});

export const backColor = {
  "tl1": "#FF3333",
  "tl2": "#FF9933",
  "tl3": "#00CC66"
};

// pastel colors, red, orange, green
export const backColorList = {
  "tl1": "#F9B7B2",
  "tl2": "#FCDAC1",
  "tl3": "#E2EFCB"
};

export const backColorGrayList = {
  "tl1": "#788696",
  "tl2": "#475D6F",
  "tl3": "#1A324B"
};


export const CardEnum = Object.freeze({
             "OSC": "Oblivious Smart Contract",
             "Set": "Settings",
             "Run": "Running since ",
             "VerCode": "Verified Code",
             "VerUser": "Verified User",
             "Blockchain": "Blockchain Connected"});

		//backgroundColor: theme.palette.background.paper
