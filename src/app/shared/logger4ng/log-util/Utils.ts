
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerOptions } from '../logger/logger4ng.interface';

import {Globals }     from '../logger/Globals';

// import Globals = require("../log4ts/Globals");

// Utility functions

export class Utils {

  //  export var urlEncode = encodeURIComponent;


  //  export function emptyFunction() { }
  constructor(private Globals : Globals  ) {
  }

  public  toStr(obj: any): string {
        if (obj != null && obj.toString != null) {
            return obj.toString();
        } else {
            return String(obj);
        }
    }


   public isUndefined(obj: any): obj is undefined {
        return typeof obj == "undefined";
    }


  public bool(obj: any) {
        return Boolean(obj);
    }


   public trim(str: string) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }


  public escapeNewLines(str: string) {
        return str.replace(/\r\n|\r|\n/g, "\\r\\n");
    }


   public padWithSpaces(str: string, len: number) {
        if (str.length < len) {
            var spaces = [];
            var count = Math.max(0, len - str.length);
            for (var i = 0; i < count; i++) {
                spaces[i] = " ";
            }
            str += spaces.join("");
        }
        return str;
    }


  public padWithZeroes(str: string, len: number) {
        while (str.length < len) {
            str = "0" + str;
        }
        return str;
    }


   public getExceptionMessage(ex: { message?: string; description?: string; }) {
        if (ex.message) {
            return ex.message;
        } else if (ex.description) {
            return ex.description;
        } else {
            return this.toStr(ex);
        }
    }


    // Gets the portion of the URL after the last slash
    public getUrlFileName(url: string) {
        var lastSlashIndex = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
        return url.substr(lastSlashIndex + 1);
    }


    // Returns a nicely formatted representation of an error
   public getExceptionStringRep(ex: { message?: string; description?: string; lineNumber?: string | number; fileName?: string; stack?: string; }) {
        if (ex) {
            var exStr = "Exception: " + this.getExceptionMessage(ex);
            if (ex.lineNumber) {
                exStr += " on line number " + ex.lineNumber;
            }
            if (ex.fileName) {
                exStr += " in file " + this.getUrlFileName(ex.fileName);
            }
            if (this.Globals.showStackTraces && ex.stack) {
                exStr += this.Globals.newLine + "Stack trace:" + this.Globals.newLine + ex.stack;
            }
            return exStr;
        }
        return null;
    }


    // formatObjectExpansion
  public formatObjectExpansion(obj: any, depth: number, indentation?: string) {
        var objsExpanded: any[] = [];

        function formatString(text: string, indentation: string) {
            var lines = this.splitIntoLines(text);
            for (var j = 1, jLen = lines.length; j < jLen; j++) {
                lines[j] = indentation + lines[j];
            }
            return lines.join(this.Globals.newLine);
        }

        function doFormat(obj: any, depth: number, indentation?: string): string {
            var expansion: string;

            if (!indentation) {
                indentation = "";
            }

            if (obj === null) {
                return "null";
            }
            else if (typeof obj == "undefined") {
                return "undefined";
            }
            else if (typeof obj == "string") {
                return formatString(obj, indentation);
            }
            else if (typeof obj == "object" && this.arrayContains(objsExpanded, obj)) {
                try {
                    expansion = this.toStr(obj);
                } catch (ex) {
                    expansion = "Error formatting property. Details: " +this.getExceptionStringRep(ex);
                }
                return expansion + " [already expanded]";
            }
            else if ((obj instanceof Array) && depth > 0) {
                objsExpanded.push(obj);
                expansion = "[" + this.Globals.newLine;
                var childDepth = depth - 1;
                var childIndentation = indentation + "  ";
                var childLines: string[] = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    try {
                        var childExpansion = doFormat(obj[i], childDepth, childIndentation);
                        childLines.push(childIndentation + childExpansion);
                    } catch (ex) {
                        childLines.push(childIndentation + "Error formatting array member. Details: " + this.getExceptionStringRep(ex) + "");
                    }
                }
                expansion += childLines.join("," + this.Globals.newLine) + this.Globals.newLine + indentation + "]";
                return expansion;
            }
            else if (Object.prototype.toString.call(obj) == "[object Date]") {
                return obj.toString();
            }
            else if (typeof obj == "object" && depth > 0) {
                objsExpanded.push(obj);
                expansion = "{" + this.Globals.newLine;
                var childDepth = depth - 1;
                var childIndentation = indentation + "  ";
                var childLines: string[] = [];
                for (var key in obj) {
                    try {
                        var childExpansion = doFormat(obj[key], childDepth, childIndentation);
                        childLines.push(childIndentation + key + ": " + childExpansion);
                    } catch (ex) {
                        childLines.push(childIndentation + key + ": Error formatting property. Details: " + this.getExceptionStringRep(ex));
                    }
                }
                expansion += childLines.join("," + this.Globals.newLine) + this.Globals.newLine + indentation + "}";
                return expansion;
            }
            else {
                return formatString(this.toStr(obj), indentation);
            }
        }

        return doFormat(obj, depth, indentation);
    }


   public splitIntoLines(text: string) {
        // Ensure all line breaks are \n only
        var text2 = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        return text2.split("\n");
    }


    public arrayRemove<T>(arr: T[], val: T): boolean {
        var index = -1;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === val) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }


    public arrayContains<T>(arr: T[], val: T): boolean {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
        return false;
    }


   public booleanOrDefault(param: boolean | null | undefined, defaultValue: boolean): boolean {
        if (this.isUndefined(param)) {
            return defaultValue;
        } else {
            return param;
        }
    }


   public stringOrDefault(param: string | number | null | undefined, defaultValue: string): string {
        if (this.isUndefined(param)) {
            return defaultValue;
        } else {
            return String(param);
        }
    }


   public intOrDefault(param: string | number | null | undefined, defaultValue: number): number {
        if (this.isUndefined(param)) {
            return defaultValue;
        } else {
            var value = parseInt(<string>param, 10);
            return isNaN(value) ? defaultValue : value;
        }
    }


   public funcOrDefault<T extends Function | null | undefined>(param: T, defaultValue: T): T {
        if (typeof param == "function") {
            return param;
        } else {
            return defaultValue;
        }
    }


   public isError(err: Error | any): err is Error {
        return (err instanceof Error);
    }


    // TODO pulled from ts-mortar@0.6.0
    /** Modify classChild to extend classParent via prototypal inheritance.
     * Side-effect: classChild's prototype is modified.
     * @param classChild: the sub class that inherits from {@code classParent}
     * @param classParent: the super class that {@code classChild} will inherit from
     * @param allowChildToOverride: true to keep existing {@code classChild} properties, false to overwrite
     * child properties with parent properties when classParent and classChild have properties with the same name
     */
   public extend(classChild: any, classParent: any, allowChildToOverride: boolean, deepExtend: boolean = false): void {
        if (classParent.prototype == null) {
            throw new Error(classParent + ", does not have the property '.prototype'");
        }
        var childProto = classChild.prototype;
        var newChildProto = Object.create(classParent.prototype);
        classChild.prototype = newChildProto;

        for (var key in childProto) {
            if (childProto.hasOwnProperty(key)) {
                var parentConflicts = newChildProto.hasOwnProperty(key) || (deepExtend && key in newChildProto);
                if ((parentConflicts && allowChildToOverride) || !parentConflicts) {
                    var descriptor = Object.getOwnPropertyDescriptor(childProto, key);
                    if (descriptor.get || descriptor.set) {
                        Object.defineProperty(newChildProto, key, descriptor);
                    }
                    else {
                        newChildProto[key] = childProto[key];
                    }
                }
            }
        }

        Object.defineProperty(classChild.prototype, "constructor", {
            value: classChild
        });
    }

}

