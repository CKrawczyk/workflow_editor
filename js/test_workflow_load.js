var wf = {
  "init": {
    "question": "Is it a cat or bacon?",
    "help": "",
    "required": true,
    "type": "single",
    "answers": [
      {
        "label": "cat",
        "next": "T1"
      },
      {
        "label": "bacon",
        "next": "T2"
      }
    ]
  },
  "T1": {
    "question": "Is it cute?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "yes",
        "next": "T3"
      },
      {
        "label": "no",
        "next": "T3"
      }
    ]
  },
  "T2": {
    "question": "Will you eat it?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "yes",
        "next": "T4"
      },
      {
        "label": "no",
        "next": "T4"
      }
    ]
  },
  "T3": {
    "question": "Click the cat",
    "help": "",
    "type": "drawing",
    "tools": [
      {
        "label": "CAT!",
        "type": "point",
        "color": "red"
      }
    ]
  },
  "T4": {
    "question": "Click the bacon",
    "help": "",
    "type": "drawing",
    "tools": [
      {
        "label": "BACON!",
        "type": "point",
        "color": "green"
      }
    ]
  }
}

var pos = {
  "init": {
    "top": 221,
    "left": 275,
    "width": 198
  },
  "T1": {
    "top": 86,
    "left": 669.6499938964844,
    "width": 198
  },
  "T2": {
    "top": 386,
    "left": 663.6499938964844,
    "width": 198
  },
  "T3": {
    "top": 90,
    "left": 1145.6500549316406,
    "width": 250
  },
  "T4": {
    "top": 391,
    "left": 1135.6500549316406,
    "width": 250
  },
  "start": {
    "top": 302,
    "left": 5
  },
  "end": {
    "top": 327,
    "left": 1694.4000549316406
  }
}

load_workflow(wf,pos);
//load_workflow(wf,undefined);
