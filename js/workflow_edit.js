var task_number = 0;

var connectorHoverStyle = {
    lineWidth: 3,
    strokeStyle: "#888",
    outlineWidth: 1.5,
    outlineColor: "white"
}

var endpointHoverStyle = {
    fillStyle: "#888",
}

var connectorPaintStyle = {
    lineWidth: 3,
    strokeStyle: "#000",
    joinstyle: "round",
    outlineColor: "white",
    outlineWidth: 1.5
}

var commonA = {
    //connector: [ "Flowchart", { stub: 30, cornerRadius: 10, alwaysRespectStubs: false, midpoint: 0.25 } ],
    //connector: ["Straight"],
    connectior: ["Bezier", { curviness: 150 }],
    //connectior: ["State Machine"],
    anchor: "Right",
    isSource: true,
    endpoint: "Dot",
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle: connectorHoverStyle,
    paintStyle: {
        fillStyle: "#000",
        radius: 5
    }
}

var commonT = {
    anchor: "Left",
    isTarget: true,
    endpoint: "Dot",
    maxConnections: -1,
    hoverPaintStyle: endpointHoverStyle,
    paintStyle: {
        fillStyle: "#000",
        radius: 7
    }
}

function popover_buttons() {
    var button = $(this);
    var pop = button.data("bs.popover").tip();
    var box = button.parent();
    var help_text = box.find(".help-text");
    var textarea = pop.find("textarea");
    textarea.val(help_text.html());
    pop.find("#save").click(function() {
        help_text.html(textarea.val());
        button.popover("toggle");
    });
    pop.find("#close").click(function() {
        button.popover("toggle");
    });
}

function make_question(parent, tn) {
    var box = $("<div>").addClass("box question-box").attr("id","task_"+tn).css("z-index",tn).appendTo(parent);
    box.resizable({ handles: 'e, w' });
    var head = $("<span>").html("Single").addClass("box-head").appendTo(box);
    var close = $('<a onclick="remove_box(this);" class="close close-box">&times;</a></br>').appendTo(box);
    var input_group1 = $("<div>").addClass("input-group task").appendTo(box);
    var span1 = $("<span>").addClass("input-group-addon task-tag").html("T "+tn).appendTo(input_group1);
    var task_input = $("<textarea>").addClass("form-control question").attr("rows","2").css("resize","none").appendTo(input_group1);
    var help_button = $("<button>").addClass("btn btn-default btn-xs add-help").attr("type", "button").html("Help Text").appendTo(box);
    help_button.popover({
        html: true,
        placement: "bottom",
        container: "body",
        content: function() {
            return  $("#help_popover").html();
        },
        title: "Help Text"
    }).on("shown.bs.popover", popover_buttons);
    var help_text = $("<div>").addClass("help-text").css("display","none").appendTo(box);
    var req_span = $("<span>").addClass("req").html("required: ").appendTo(box);
    var check = $("<input>").attr("type","checkbox").addClass("required-check").appendTo(req_span);
    $("</br>").appendTo(box);
    var ul = $("<ul>").addClass("list-unstyled").attr("id","task_"+task_number+"_answers").appendTo(box);
    var input_group2 = $("<div>").addClass("input-group answer-add").appendTo(box);
    var span2 = $("<span>").addClass("input-group-addon tag").html("A "+0).appendTo(input_group2);
    var answer_input = $("<textarea>").addClass("form-control answer-input").attr("rows","2").css("resize","none").appendTo(input_group2);
    var span3 = $("<span>").addClass("input-group-btn").appendTo(input_group2);
    var add_answer = $("<button>").addClass("btn btn-default add-answer").attr("type","button").attr("onclick","add_answer(this)").html("+").appendTo(span3);
    var ep = jsPlumb.addEndpoint("task_"+tn, commonT, {uuid: "task_"+tn});
    $(ep.canvas).css("z-index", box.css("z-index"));
    jsPlumb.draggable("task_"+tn, {
        scroll: true,
        stack: ".box",
        start: function() {
            var box_z_index = $(this).css("z-index");
            $(jsPlumb.getEndpoints(this.id)[0].canvas).css("z-index",box_z_index);
            $(this).find("li").each(function(idx,i) {
                $(jsPlumb.getEndpoints(i.id)[0].canvas).css("z-index",box_z_index);
            });
        }
    });
    return box;
}

function edit_popover_buttons() {
    var button = $(this);
    var pop = button.data("bs.popover").tip();
    var li = button.parent();
    var answer_text = li.find(".lab");
    var textarea = pop.find("textarea");
    textarea.val(answer_text.html());
    pop.find("#save").click(function() {
        answer_text.html(textarea.val());
        button.popover("toggle");
    });
    pop.find("#close").click(function() {
        button.popover("toggle");
    });
}

function add_answer(element) {
    var me = $(element);
    var answer = me.parent().parent().find(".answer-input");
    if (answer.val()) {
        var tag = me.parent().parent().find(".tag");
        var tag_split = tag.html().split(" ")[1]
        var height = me.parent().parent().parent().height();
        var task = me.parent().parent().parent().attr("id");
        var list = me.parent().parent().parent().find("ul");
        var li = $("<li>").addClass("answer-item").attr("id",task+"_answer_"+tag_split).html(tag.html()+": ").appendTo(list);
        var close = $('<a onclick="remove_answer(this);" class="close close-ans">&times;</a>').appendTo(li);
        var edit = $("<span>").addClass("glyphicon glyphicon-cog edit-icon").appendTo(li);
        edit.popover({
            html: true,
            placement: "bottom",
            container: "body",
            content: function() {
                return $("#edit_answer_popover").html();
            },
            title: "Edit answer"
        }).on("shown.bs.popover", edit_popover_buttons);
        var ans= $("<pre>").addClass("lab").html(answer.val()).appendTo(li);
        me.parent().parent().parent().height(height+li.height());
        var num = parseInt(tag_split) + 1;
        answer.val("");
        tag.html("A "+num);
        var ep = jsPlumb.addEndpoint(task+"_answer_"+tag_split, commonA, {uuid: task+"_answer_"+tag_split});
        var box_z_index = me.parent().parent().parent().css("z-index");
        $(ep.canvas).css("z-index",box_z_index);
    }
};

function load_question(parent, task, name, pos) {
    var connections = [];
    var tn = name.substring(1);
    make_question("#editor", tn);
    var box = $("#task_"+tn);
    box.find(".question").val(task["question"]);
    box.find(".help-text").html(task["help"]);
    if (task["required"]) {
        box.find(".required-check").prop("checked", true);
    }
    box_ans = box.find(".answer-input");
    box_add = box.find(".add-answer");
    $.each(task["answers"], function(idx,i) {
        box_ans.val(i["label"]);
        box_add.click();
        if (i["next"]) {
            var next_id = "task_"+i["next"].substring(1);
            connections.push([box.find("li").last().prop("id"), next_id]);
        } else {
            connections.push([box.find("li").last().prop("id"), "end"]);
        }
    });
    task_number = parseInt(tn) + 1;
    box.css(pos);
    jsPlumb.repaintEverything();
    return connections;
}

function remove_answer(element) {
    var li = $(element).parent();
    var div = li.parent().parent();
    var height = div.height();
    var li_height = li.height();
    var item = li.html();
    var number = parseInt(item.split(":")[0].split(" ")[1]);
    var lis = li.nextAll();
    div.height(height-li_height);
    jsPlumb.removeAllEndpoints(li);
    li.remove();
    lis.each(function(idx,i) {
        var me = $(i)
        var current = me.html().split(":");
        current[0] = "A "+number;
        me.html(current.join(":"));
        var id = me.attr("id");
        var id_new = id.split("_");
        id_new[3] = number+"";
        id_new = id_new.join("_")
        jsPlumb.setId(id,id_new);
        number += 1;
    });
    jsPlumb.repaintEverything();
    div.find(".tag").html("A "+number);
}


// remove box does not work
function remove_box(element) {
    var box = $(element).parent();
    var boxes = box.nextAll(".box");
    var number = parseInt(box.find(".task-tag").html().split(" ")[1]);
    jsPlumb.empty(box.attr("id")+"_answers");
    jsPlumb.removeAllEndpoints(box);
    box.remove();
    /*
    boxes.each(function(idx,i) {
        var me = $(i);
        var tag = me.find(".task-tag");
        tag.html("T "+number);
        var id = me.attr("id");
        var id_new = id.split("_");
        id_new[1] = number+"";
        id_new = id_new.join("_");
        var ul = me.find("ul");
        var ul_id = ul.attr("id");
        ul.attr("id", ul_id.replace(id,id_new));
        // jsPlumb.setId does not work correctly with draggable divs
        // workaround is to remove all endpoins from the div
        // change the id of the div and add a new endpoint
        // TODO: keep current connections
        // jsPlumb.setId(id,id_new);
        jsPlumb.removeAllEndpoints(me);
        me.attr("id",id_new);
        jsPlumb.addEndpoint(id_new, commonT);
        me.find("li").each(function(jdx,j) {
            var li = $(j);
            var li_id_old = li.attr("id");
            li_id_new = li_id_old.replace(id,id_new);
            //jsPlumb.setId(li_id_old,li_id_new);
            jsPlumb.removeAllEndpoints(li);
            me.attr("id",li_id_new);
            jsPlumb.addEndpoint(li_id_new, commonA);
        });
        jsPlumb.repaint(id_new);
        number += 1;
    });
    task_number = number;
    */
}

function make_start(parent) {
    var box = $("<div>").addClass("box-end").attr("id","start").html("Start").appendTo(parent);
    box.css({top: "50%", left: "0%"})
    jsPlumb.draggable("start", {
        scroll: true,
        stack: ".box",
        start: function() {
            var box_z_index = $(this).css("z-index");
            $(jsPlumb.getEndpoints(this.id)[0].canvas).css("z-index",box_z_index);
        }
    });
    var ep = jsPlumb.addEndpoint("start", commonA, {uuid: "start"});
    $(ep.canvas).css("z-index", box.css("z-index"));
}

function make_end(parent) {
    var box = $("<div>").addClass("box-end").attr("id","end").html("End").appendTo(parent);
    box.css({top: "50%", left: "90%"})
    jsPlumb.draggable("end", {
        scroll: true,
        stack: ".box",
        start: function() {
            var box_z_index = $(this).css("z-index");
            $(jsPlumb.getEndpoints(this.id)[0].canvas).css("z-index",box_z_index);
        }
    });
    var ep = jsPlumb.addEndpoint("end", commonT, {uuid: "end"});
    $(ep.canvas).css("z-index", box.css("z-index"));
}

function make_drawing(parent, tn) {
    var box = $("<div>").addClass("box drawing-box").attr("id","task_"+tn).css("z-index",tn).appendTo(parent);
    box.resizable({handles: 'e, w'});
    var head = $("<span>").html("Drawing").addClass("box-head").appendTo(box);
    var close = $('<a onclick="remove_box(this);" class="close close-box">&times;</a></br>').appendTo(box);
    var input_group1 = $("<div>").addClass("input-group task").appendTo(box);
    var span1 = $("<span>").addClass("input-group-addon task-tag").html("T "+tn).appendTo(input_group1);
    var task_input = $("<textarea>").addClass("form-control question").attr("rows","2").css("resize","none").appendTo(input_group1);
    var help_button = $("<button>").addClass("btn btn-default btn-xs add-help").attr("type", "button").html("Help Text").appendTo(box);
    help_button.popover({
        html: true,
        placement: "bottom",
        container: "body",
        content: function() {
            return  $("#help_popover").html();
        },
        title: "Help Text"
    }).on("shown.bs.popover", popover_buttons);
    var help_text = $("<div>").addClass("help-text").css("display","none").appendTo(box);
    var ul = $("<ul>").addClass("list-unstyled").attr("id","task_"+task_number+"_answers").appendTo(box);
    var input_group2 = $("<div>").addClass("input-group tool-add").appendTo(box);
    var span2 = $("<span>").addClass("input-group-addon tag").html("Tool "+0).appendTo(input_group2);
    var answer_input = $("<textarea>").addClass("form-control tool-input").attr("rows","2").css("resize","none").appendTo(input_group2);
    var span3 = $("<span>").addClass("input-group-btn").appendTo(input_group2);
    var add_answer = $("<button>").addClass("btn btn-default add-tool").attr("type","button").attr("onclick","add_tool(this)").html("+").appendTo(span3);
    var type_select = $("<select>").addClass("type-select").appendTo(box);
    $("<option>").html("point").attr("value","point").appendTo(type_select);
    $("<option>").html("line").attr("value","line").appendTo(type_select);
    $("<option>").html("polygon").attr("value","polygon").appendTo(type_select);
    $("<option>").html("rectangle").attr("value","rectangle").appendTo(type_select);
    $("<option>").html("circle").attr("value","circle").appendTo(type_select);
    $("<option>").html("ellipse").attr("value","ellipse").appendTo(type_select);
    var color_select = $("<select>").addClass("color-select").appendTo(box);
    $("<option>").html("red").attr("value","red").appendTo(color_select);
    $("<option>").html("yellow").attr("value","yellow").appendTo(color_select);
    $("<option>").html("green").attr("value","green").appendTo(color_select);
    $("<option>").html("blue").attr("value","blue").appendTo(color_select);
    $("<option>").html("cyan").attr("value","cyan").appendTo(color_select);
    $("<option>").html("magenta").attr("value","magenta").appendTo(color_select);
    $("<option>").html("black").attr("value","black").appendTo(color_select);
    $("<option>").html("white").attr("value","white").appendTo(color_select);
    box.width(250);
    var ep1 = jsPlumb.addEndpoint("task_"+tn, commonT, {uuid: "task_"+tn});
    var ep2 = jsPlumb.addEndpoint("task_"+tn, commonA, {uuid: "task_"+tn+"_next"});
    $(ep1.canvas).css("z-index", box.css("z-index"));
    $(ep2.canvas).css("z-index", box.css("z-index"));
    jsPlumb.draggable("task_"+tn, {
        scroll: true,
        stack: ".box",
        start: function() {
            var box_z_index = $(this).css("z-index");
            $.each(jsPlumb.getEndpoints(this.id), function(idx, i) {
                $(i.canvas).css("z-index",box_z_index);
            })
        }
    });
    return box;
}

function edit_tool_popover_buttons() {
    var button = $(this);
    var pop = button.data("bs.popover").tip();
    var li = button.parent();
    var answer_text = li.find(".lab");
    var textarea = pop.find("textarea");
    textarea.val(answer_text.html());
    var draw_type = li.find(".draw-type")
    var type_select = pop.find(".type-select2");
    type_select.val(draw_type.html());
    var draw_color = li.find(".draw-color")
    var color_select = pop.find(".color-select2");
    color_select.val(draw_color.html());
    pop.find("#save").click(function() {
        answer_text.html(textarea.val());
        draw_type.html(type_select.val());
        draw_color.html(color_select.val());
        button.popover("toggle");
    });
    pop.find("#close").click(function() {
        button.popover("toggle");
    });
}

function add_tool(element) {
    var me = $(element);
    var answer = me.parent().parent().find(".tool-input");
    if (answer.val()) {
        var type_sel = me.parent().parent().parent().find(".type-select");
        var color_sel = me.parent().parent().parent().find(".color-select");
        var tag = me.parent().parent().find(".tag");
        var tag_split = tag.html().split(" ")[1]
        var height = me.parent().parent().parent().height();
        var task = me.parent().parent().parent().attr("id");
        var list = me.parent().parent().parent().find("ul");
        var li = $("<li>").addClass("answer-item").attr("id",task+"_tool_"+tag_split).html(tag.html()+": ").appendTo(list);
        var close = $('<a onclick="remove_tool(this);" class="close">&times;</a>').appendTo(li);
        var edit = $("<span>").addClass("glyphicon glyphicon-cog edit-icon").appendTo(li);
        edit.popover({
            html: true,
            placement: "bottom",
            container: "body",
            content: function() {
                return $("#edit_tool_popover").html();
            },
            title: "Edit answer"
        }).on("shown.bs.popover", edit_tool_popover_buttons);
        var label2 = $("<span>").addClass("draw-type").html(type_sel.val()).appendTo(li);
        li.append(", ")
        var label3 = $("<span>").addClass("draw-color").html(color_sel.val()).appendTo(li);
        var label1 = $("<pre>").addClass("lab").html(answer.val()).appendTo(li);        
        var num = parseInt(tag_split) + 1;
        me.parent().parent().parent().height(height+li.height());
        answer.val("");
        tag.html("Tool "+num);
    }
}

function load_drawing(parent, task, name, pos) {
    var connections = [];
    var tn = name.substring(1);
    make_drawing("#editor", tn);
    var box = $("#task_"+tn);
    box.find(".question").val(task["question"]);
    box.find(".help-text").html(task["help"]);
    box_ans = box.find(".tool-input");
    box_type = box.find(".type-select");
    box_color = box.find(".color-select");
    box_add = box.find(".add-tool");
    if (task["next"]) {
        var next_id = "task_"+task["next"].substring(1);
        connections.push([box.prop("id")+"_next", next_id]);
    } else {
        connections.push([box.prop("id")+"_next", "end"]);
    }
    $.each(task["tools"], function(idx,i) {
        box_ans.val(i["label"]);
        box_type.val(i["type"]);
        box_color.val(i["color"]);
        box_add.click();
    });
    task_number = parseInt(tn) + 1;
    box.css(pos);
    jsPlumb.repaintEverything();
    return connections;
}

function remove_tool(element) {
    var li = $(element).parent();
    var div = li.parent().parent();
    var height = div.height();
    var li_height = li.height();
    var item = li.html();
    var number = parseInt(item.split(":")[0].split(" ")[1]);
    var lis = li.nextAll();
    div.height(height-li_height);
    li.remove();
    lis.each(function(idx,i) {
        var me = $(i)
        var current = me.html().split(":");
        current[0] = "Tool "+number;
        me.html(current.join(":"));
        var id = me.attr("id");
        var id_new = id.split("_");
        id_new[3] = number+"";
        id_new = id_new.join("_")
        me.attr("id",id_new);
        number += 1;
    });
    div.find(".tag").html("Tool "+number);
}

$('#add_question').click(function() {
    make_question("#editor", task_number);
    task_number += 1;
});

$('#add_question_multi').click(function() {
    make_question_multi("#editor", task_number);
    task_number += 1;
});

$('#add_drawing').click(function() {
    make_drawing("#editor", task_number);
    task_number += 1;
});

window.onresize = function(event) {
    jsPlumb.repaintEverything();
}

$("#get_example1").click(function() {
    $.getScript("./js/test_workflow_load_gz.js");
});

$("#get_example2").click(function() {
    $.getScript("./js/test_workflow_load.js");
});

$(document).ready(function() {
    make_start("#editor");
    make_end("#editor");
})

function get_workflow() {
    var tasks = {};
    var pos = {};
    var boxes = $(".box")
    var scroll_top = $("#editor").scrollTop();
    var scroll_left = $("#editor").scrollLeft();
    boxes.each(function(idx,i) {
        var id = i.id;
        var source = jsPlumb.getConnections({target: id});
        var source_id = "";
        var current_pos = $(i).position();
        current_pos["top"] += scroll_top;
        current_pos["left"] += scroll_left;
        current_pos["width"] = $(i).width();
        if (source.length>0) {
            source_id = source[0].sourceId;
        }
        var t = {
            "question": $(i).find(".question").val(),
            "help": $(i).find(".help-text").html(),
        }
        var req = $(i).find(".required-check").prop("checked");
        if (req) {
            t["required"] = true;
        }
        if ($(i).hasClass("question-box")) {
            t["type"] = "single";
            var answers = [];
            $(i).find("li").each(function(jdx,j) {
                var jd = j.id;
                var q = {"label": $(j).find(".lab").html()};
                var next = jsPlumb.getConnections({source: jd});
                var next_id = ""
                if (next.length>0) {
                    var next_id = next[0].targetId;
                    if (next_id!="end") {
                        q["next"] = "T"+next_id.split("_")[1];
                    }
                }
                answers.push(q);
            });
            t["answers"] = answers;
        } else if ($(i).hasClass("drawing-box")) {
            t["type"] = "drawing";
            var tools=[];
            var next = jsPlumb.getConnections({source: id});
            if (next.length>0) {
                var next_id = next[0].targetId;
                if (next_id!="end") {
                    t["next"] = "T"+next_id.split("_")[1];
                }
            }
            $(i).find("li").each(function(jdx,j) {
                var jd = j.id;
                var t_in = {
                    "label": $(j).find(".lab").html(),
                    "type": $(j).find(".draw-type").html(),
                    "color": $(j).find(".draw-color").html()
                };
                tools.push(t_in);
            });
            t["tools"] = tools;
        } else if ($(i).hasClass("multi-box")) {
            t["type"]="multiple";
            var answers = [];
            var next = jsPlumb.getConnections({source: id});
            if (next.length>0) {
                var next_id = next[0].targetId;
                if (next_id!="end") {
                    t["next"] = "T"+next_id.split("_")[1];
                }
            }
            $(i).find("li").each(function(jdx,j) {
                var q = {"label": $(j).find(".lab").html()}
                answers.push(q)
            });
            t["answers"] = answers;
        }
        if (source_id==="start") {
            tasks["init"] = t;
            pos["init"] = current_pos;
        } else {
            tasks["T"+id.split("_")[1]] = t;
            pos["T"+id.split("_")[1]] = current_pos;
        }
    });
    pos["start"] = $("#start").position();
    pos["end"] = $("#end").position();
    return [tasks, pos];
}

$('#get_workflow').click(function() {
    var wf_pos = get_workflow();
    $("#my_workflow").html(JSON.stringify(wf_pos[0], undefined, 2));
    $("#my_workflow_pos").html(JSON.stringify(wf_pos[1], undefined, 2));
});

function load_workflow(wf,pos) {
    var all_connections = []
    var default_pos = {"top": 194, "left": 139};
    $.each(wf, function(idx, i) {
        if (idx==="init") {
            idx="T0";
            if (pos) {
                pos[idx] = pos["init"]
            }
            all_connections.push(["start", "task_0"]);
        }
        if (i["type"]==="single") {
            if (pos) {
                var c = load_question("#editor", i, idx, pos[idx]);
            } else {
                var c = load_question("#editor", i, idx, default_pos);
                default_pos["left"] += 215;
            }
            all_connections = all_connections.concat(c);
        } else if (i["type"]==="drawing") {
            if (pos) {
                var c = load_drawing("#editor", i, idx, pos[idx]);
            } else {
                var c = load_drawing("#editor", i, idx, default_pos);
                default_pos["left"] += 265;
            }
            all_connections = all_connections.concat(c);
        } else if (i["type"]==="multiple") {
            if (pos) {
                var c = load_question_multi("#editor", i, idx, pos[idx]);
            } else {
                var c = load_question_multi("#editor", i, idx, default_pos);
                default_pos["left"] += 215;
            }
            all_connections = all_connections.concat(c);
        }
    });
    $.each(all_connections, function(jdx, j) {
        jsPlumb.connect({uuids: j});
    });
    if (pos) {
        $("#start").css(pos["start"]);
        $("#end").css(pos["end"]);
    } else {
        $("#end").css(default_pos);
    }
    jsPlumb.repaintEverything();
}


function make_question_multi(parent, tn) {
    var box = $("<div>").addClass("box multi-box").css("z-index",tn).attr("id","task_"+tn).appendTo(parent);
    box.resizable({handles: 'e, w'});
    var head = $("<span>").html("Multiple").addClass("box-head").appendTo(box);
    var close = $('<a onclick="remove_box(this);" class="close close-box">&times;</a></br>').appendTo(box);
    var input_group1 = $("<div>").addClass("input-group task").appendTo(box);
    var span1 = $("<span>").addClass("input-group-addon task-tag").html("T "+tn).appendTo(input_group1);
    var task_input = $("<textarea>").addClass("form-control question").attr("rows","2").css("resize","none").appendTo(input_group1);
    var help_button = $("<button>").addClass("btn btn-default btn-xs add-help").attr("type", "button").html("Help Text").appendTo(box);
    help_button.popover({
        html: true,
        placement: "bottom",
        container: "body",
        content: function() {
            return  $("#help_popover").html();
        },
        title: "Help Text"
    }).on("shown.bs.popover", popover_buttons);
    var help_text = $("<div>").addClass("help-text").css("display","none").appendTo(box);
    var req_span = $("<span>").addClass("req").html("required: ").appendTo(box);
    var check = $("<input>").attr("type","checkbox").addClass("required-check").appendTo(req_span);
    $("</br>").appendTo(box);
    var ul = $("<ul>").addClass("list-unstyled").attr("id","task_"+task_number+"_answers").appendTo(box);
    var input_group2 = $("<div>").addClass("input-group answer-add").appendTo(box);
    var span2 = $("<span>").addClass("input-group-addon tag").html("A "+0).appendTo(input_group2);
    var answer_input = $("<textarea>").addClass("form-control answer-input").attr("rows","2").css("resize","none").appendTo(input_group2);
    var span3 = $("<span>").addClass("input-group-btn").appendTo(input_group2);
    var add_answer = $("<button>").addClass("btn btn-default add-answer").attr("type","button").attr("onclick","add_answer_multi(this)").html("+").appendTo(span3);
    var ep1 = jsPlumb.addEndpoint("task_"+tn, commonT, {uuid: "task_"+tn});
    var ep2 = jsPlumb.addEndpoint("task_"+tn, commonA, {uuid: "task_"+tn+"_next"});
    $(ep1.canvas).css("z-index", box.css("z-index"));
    $(ep2.canvas).css("z-index", box.css("z-index"));
    jsPlumb.draggable("task_"+tn, {
        scroll: true,
        stack: ".box",
        start: function() {
            var box_z_index = $(this).css("z-index");
            $.each(jsPlumb.getEndpoints(this.id), function(idx, i) {
                $(i.canvas).css("z-index",box_z_index);
            })
        }
    });
    return box;
}

function add_answer_multi(element) {
    var me = $(element);
    var answer = me.parent().parent().find(".answer-input");
    if (answer.val()) {
        var tag = me.parent().parent().find(".tag");
        var tag_split = tag.html().split(" ")[1]
        var height = me.parent().parent().parent().height();
        var task = me.parent().parent().parent().attr("id");
        var list = me.parent().parent().parent().find("ul");
        var li = $("<li>").addClass("answer-item").attr("id",task+"_answer_"+tag_split).html(tag.html()+": ").appendTo(list);
        var close = $('<a onclick="remove_answer_multi(this);" class="close">&times;</a>').appendTo(li);
        var edit = $("<span>").addClass("glyphicon glyphicon-cog edit-icon").appendTo(li);
        edit.popover({
            html: true,
            placement: "bottom",
            container: "body",
            content: function() {
                return $("#edit_answer_popover").html();
            },
            title: "Edit answer"
        }).on("shown.bs.popover", edit_popover_buttons);
        var ans= $("<pre>").addClass("lab").html(answer.val()).appendTo(li);
        me.parent().parent().parent().height(height+li.height());
        var num = parseInt(tag_split) + 1;
        answer.val("");
        tag.html("A "+num);
    }
};

function load_question_multi(parent, task, name, pos) {
    var connections = [];
    var tn = name.substring(1);
    make_question_multi("#editor", tn);
    var box = $("#task_"+tn);
    box.find(".question").val(task["question"]);
    box.find(".help-text").html(task["help"]);
    if (task["required"]) {
        box.find(".required-check").prop("checked", true);
    }
    box_ans = box.find(".answer-input");
    box_add = box.find(".add-answer");
    if (task["next"]) {
        var next_id = "task_"+task["next"].substring(1);
        connections.push([box.prop("id")+"_next", next_id]);
    } else {
        connections.push([box.prop("id")+"_next", "end"]);
    }
    $.each(task["answers"], function(idx,i) {
        box_ans.val(i["label"]);
        box_add.click();
    });
    task_number = parseInt(tn) + 1;
    box.css(pos);
    jsPlumb.repaintEverything();
    return connections;
}

function remove_answer_multi(element) {
    var li = $(element).parent();
    var div = li.parent().parent();
    var height = div.height();
    var li_height = li.height();
    var item = li.html();
    var number = parseInt(item.split(":")[0].split(" ")[1]);
    var lis = li.nextAll();
    div.height(height-li_height);
    li.remove();
    lis.each(function(idx,i) {
        var me = $(i)
        var current = me.html().split(":");
        current[0] = "A "+number;
        me.html(current.join(":"));
        var id = me.attr("id");
        var id_new = id.split("_");
        id_new[3] = number+"";
        id_new = id_new.join("_")
        me.attr("id",id_new);
        number += 1;
    });
    div.find(".tag").html("A "+number);
}
