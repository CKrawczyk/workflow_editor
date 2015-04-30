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
    "left": 274.99998474121094
  },
  "T1": {
    "top": 86,
    "left": 669.6500091552734
  },
  "T2": {
    "top": 364,
    "left": 673.6500091552734
  },
  "T3": {
    "top": 90,
    "left": 1145.6499481201172
  },
  "T4": {
    "top": 367,
    "left": 1153.6499481201172
  },
  "start": {
    "top": 302,
    "left": 5
  },
  "end": {
    "top": 327,
    "left": 1694.3999481201172
  }
}

load_workflow(wf,pos);
//load_workflow(wf,undefined);
