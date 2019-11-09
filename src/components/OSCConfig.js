import { green } from '@material-ui/core/colors';

export const useStyles = theme => ({
  container: {
    paddingTop: '5px'
  },
  card: {
    flexGrow: 1,
    background: '#E9E8E8',
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
});

export const backColor = {
  "tl1": "#FF3333",
  "tl2": "#FF9933",
  "tl3": "#00CC66"
};

export const CardEnum = Object.freeze({
             "OSC": "Oblivious Smart Contract",
             "Set": "Settings",
             "Run": "Running since ",
             "VerCode": "Verified Code",
             "VerUser": "Verified User",
             "Blockchain": "Blockchain Connected"});

