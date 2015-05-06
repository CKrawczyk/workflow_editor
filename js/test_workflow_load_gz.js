var wf = {
  "init": {
    "question": "Is the galaxy smooth or does it have a disk?",
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
    "left": 190,
    "width": 240
  },
  "T1": {
    "top": 339,
    "left": 446,
    "width": 210
  },
  "T2": {
    "top": 409.99998474121094,
    "left": 1584.1333312988281,
    "width": 198
  },
  "T3": {
    "top": 573.9999847412109,
    "left": 2700.0665588378906,
    "width": 198
  },
  "T4": {
    "top": 56,
    "left": 3078.1666564941406,
    "width": 198
  },
  "T5": {
    "top": 16,
    "left": 1481.0000305175781,
    "width": 198
  },
  "T6": {
    "top": 523.9999847412109,
    "left": 736.0000305175781,
    "width": 198
  },
  "T7": {
    "top": 747.9999847412109,
    "left": 1043.1333312988281,
    "width": 198
  },
  "T8": {
    "top": 600.9999847412109,
    "left": 1332.4000549316406,
    "width": 198
  },
  "T9": {
    "top": 666.9999847412109,
    "left": 1853.1333312988281,
    "width": 217
  },
  "T10": {
    "top": 1022.9999847412109,
    "left": 2205.9999084472656,
    "width": 238
  },
  "start": {
    "top": 267,
    "left": 10
  },
  "end": {
    "top": 619.9999847412109,
    "left": 3760.5333557128906
  }
}

load_workflow(wf,pos);
//load_workflow(wf,undefined);
