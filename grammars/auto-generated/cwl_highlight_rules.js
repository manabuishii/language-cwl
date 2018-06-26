define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var CWLHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "string.quoted.single.cwl",
            regex: /'/,
            push: [{
                token: "string.quoted.single.cwl",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.cwl",
                regex: /\./
            }, {
                defaultToken: "string.quoted.single.cwl"
            }]
        }, {
            token: "string.quoted.double.cwl",
            regex: /"/,
            push: [{
                token: "string.quoted.double.cwl",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.cwl",
                regex: /\./
            }, {
                defaultToken: "string.quoted.double.cwl"
            }]
        }, {
            token: "keyword.control.cwl",
            regex: /\b(?:inputs|outputs|steps|id|requirements|hints|label|doc|secondaryFiles|streamable|outputBinding|format|outputSource|linkMerge|type|glob|loadContents|outputEval|merge_nested|merge_flattened|location|path|basename|dirname|nameroot|nameext|checksum|size|format|contents|listing|fields|symbols|items|in|out|run|scatter|scatterMethod|source|default|valueFrom|expressionLib|types|linkMerge|inputBinding|position|prefix|separate|itemSeparator|valueFrom|shellQuote|packages|package|version|specs|entry|entryname|writable|baseCommand|arguments|stdin|stderr|stdout|successCodes|temporaryFailCodes|permanentFailCodes|dockerLoad|dockerFile|dockerImport|dockerImageId|dockerOutputDirectory|envDef|envName|envValue|coresMin|coresMax|ramMin|ramMax|tmpdirMin|tmpdirMax|outdirMin|outdirMax)(?=:)/
        }, {
            token: "cwlVersion.keyword.control.cwl",
            regex: /cwlVersion:/,
            push: [{
                token: "cwlVersion.definition.string.end.cwl",
                regex: /$/,
                next: "pop"
            }, {
                token: "storage.constant.cwl",
                regex: /\b(?:draft-2|draft-3.dev1|draft3-dev2|draft3-dev3|draft3-dev4|draft3-dev5|draft3|draft4.dev1|draft4.dev2|draft4.dev3|v1.0.dev4|v1.0)\b/
            }, {
                defaultToken: "cwlVersion.cwl"
            }]
        }, {
            token: "dockerPull.keyword.control.cwl",
            regex: /dockerPull:/,
            push: [{
                token: "dockerPull.definition.string.end.cwl",
                regex: /$/,
                next: "pop"
            }, {
                token: "storage.variable.cwl",
                regex: /\b.*$/
            }, {
                defaultToken: "dockerPull.cwl"
            }]
        }, {
            token: "class.keyword.control.cwl",
            regex: /class:/,
            push: [{
                token: "class.definition.string.end.cwl",
                regex: /$/,
                next: "pop"
            }, {
                token: "support.type.cwl",
                regex: /\b(?:CommandLineTool|ExpressionTool|Workflow|InlineJavascriptRequirement|SchemaDefRequirement|DockerRequirement|SoftwareRequirement|InitialWorkDirRequirement|EnvVarRequirement|ShellCommandRequirement|ResourceRequirement)\b/
            }, {
                defaultToken: "class.cwl"
            }]
        }, {
            token: "storage.type.cwl",
            regex: /:\s+(?:null|boolean|int|long|float|double|string|File|Directory)\b/
        }, {
            token: "comment.line.number-sign.cwl",
            regex: /#.*$/
        }]
    }
    
    this.normalizeRules();
};

CWLHighlightRules.metaData = {
    fileTypes: ["cwl"],
    name: "CWL",
    scopeName: "source.cwl"
}


oop.inherits(CWLHighlightRules, TextHighlightRules);

exports.CWLHighlightRules = CWLHighlightRules;
});
