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
    "question": "What is the shape of the bulge?",
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
    "question": "How big is the bulge?",
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

var pos = 

{
  "init": {
    "top": 113,
    "left": 169,
    "width": 238
  },
  "T1": {
    "top": 336,
    "left": 475.00001525878906,
    "width": 208
  },
  "T2": {
    "top": 420,
    "left": 1480.1333770751953,
    "width": 196
  },
  "T3": {
    "top": 347,
    "left": 2736.0667266845703,
    "width": 196
  },
  "T4": {
    "top": 43,
    "left": 3083.1665802001953,
    "width": 196
  },
  "T5": {
    "top": 1,
    "left": 1478.9999542236328,
    "width": 196
  },
  "T6": {
    "top": 525,
    "left": 737.0000152587891,
    "width": 196
  },
  "T7": {
    "top": 826.0000152587891,
    "left": 997.1333160400391,
    "width": 196
  },
  "T8": {
    "top": 659.0000152587891,
    "left": 1265.3999786376953,
    "width": 196
  },
  "T9": {
    "top": 741.0000152587891,
    "left": 1842.1333770751953,
    "width": 215
  },
  "T10": {
    "top": 1045.000015258789,
    "left": 2209.0000762939453,
    "width": 236
  },
  "start": {
    "top": 301,
    "left": 1
  },
  "end": {
    "top": 677.0000152587891,
    "left": 3484.6333770751953
  }
}


load_workflow(wf,pos);
//load_workflow(wf,undefined);
