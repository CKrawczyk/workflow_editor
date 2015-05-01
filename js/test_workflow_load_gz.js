var wf = {
  "init": {
    "question": "Is the galaxy smooth or does it have a disk??",
    "help": "",
    "required": true,
    "type": "single",
    "answers": [
      {
        "label": "Smooth",
        "next": "T5"
      },
      {
        "label": "Disk",
        "next": "T1"
      },
      {
        "label": "Star"
      }
    ]
  },
  "T1": {
    "question": "Could this be edge-on?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Yes",
        "next": "T2"
      },
      {
        "label": "No",
        "next": "T6"
      }
    ]
  },
  "T2": {
    "question": "What is the shape of the bluge?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Rounded",
        "next": "T3"
      },
      {
        "label": "Boxy",
        "next": "T3"
      },
      {
        "label": "None",
        "next": "T3"
      }
    ]
  },
  "T3": {
    "question": "Anything odd?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Yes",
        "next": "T4"
      },
      {
        "label": "No"
      }
    ]
  },
  "T4": {
    "question": "What is odd?",
    "help": "",
    "type": "multiple",
    "answers": [
      {
        "label": "Ring"
      },
      {
        "label": "Lens"
      },
      {
        "label": "Disturbed"
      },
      {
        "label": "Irregular"
      },
      {
        "label": "Other"
      },
      {
        "label": "Merger"
      },
      {
        "label": "Dust lane"
      }
    ]
  },
  "T5": {
    "question": "How rounded is it?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Round",
        "next": "T3"
      },
      {
        "label": "In between",
        "next": "T3"
      },
      {
        "label": "Cigar",
        "next": "T3"
      }
    ]
  },
  "T6": {
    "question": "Is there a bar?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Yes",
        "next": "T7"
      },
      {
        "label": "No",
        "next": "T7"
      }
    ]
  },
  "T7": {
    "question": "Are there spiral arms?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Yes",
        "next": "T8"
      },
      {
        "label": "No",
        "next": "T10"
      }
    ]
  },
  "T8": {
    "question": "How tight are they?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "Tight",
        "next": "T9"
      },
      {
        "label": "Mid",
        "next": "T9"
      },
      {
        "label": "Loose",
        "next": "T9"
      }
    ]
  },
  "T9": {
    "question": "How many arms?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "1",
        "next": "T10"
      },
      {
        "label": "2",
        "next": "T10"
      },
      {
        "label": "3",
        "next": "T10"
      },
      {
        "label": "4",
        "next": "T10"
      },
      {
        "label": "5+",
        "next": "T10"
      },
      {
        "label": "Can't tell",
        "next": "T10"
      }
    ]
  },
  "T10": {
    "question": "How big is the bluge?",
    "help": "",
    "type": "single",
    "answers": [
      {
        "label": "None",
        "next": "T3"
      },
      {
        "label": "Just noticeable",
        "next": "T3"
      },
      {
        "label": "Obvious",
        "next": "T3"
      },
      {
        "label": "Dominant",
        "next": "T3"
      }
    ]
  }
}

var pos = {
  "init": {
    "top": 24,
    "left": 190
  },
  "T1": {
    "top": 200,
    "left": 456.00001525878906
  },
  "T2": {
    "top": 260,
    "left": 1521.000015258789
  },
  "T3": {
    "top": 367,
    "left": 2353.9332427978516
  },
  "T4": {
    "top": 6,
    "left": 2709.0333404541016
  },
  "T5": {
    "top": 27,
    "left": 1516.000015258789
  },
  "T6": {
    "top": 360,
    "left": 692.0000152587891
  },
  "T7": {
    "top": 500,
    "left": 987.0000152587891
  },
  "T8": {
    "top": 387,
    "left": 1287.000015258789
  },
  "T9": {
    "top": 472,
    "left": 1641.000015258789
  },
  "T10": {
    "top": 766,
    "left": 1979.000015258789
  },
  "start": {
    "top": 267,
    "left": 10
  },
  "end": {
    "top": 342,
    "left": 3217.5333404541016
  }
}

load_workflow(wf,pos);
//load_workflow(wf,undefined);
