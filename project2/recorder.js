// place your javascript code here

'use strict';
window.onload = main;

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    getData() {
        return this.data;
    }

}

class LinkedList {
    constructor(compareFunc) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.compareFunc = compareFunc;
    }

    prepend(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size += 1;
        return;
    }

    append(data) {
        let node = new Node(data);
        if (this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size += 1;
        return;
    }

    insert(data, index) {
        if (index < 0 || index > this.size) {
            return;
        }

        if (index === 0) {
            this.prepend(data);
            return;
        }

        if (index === this.size) {
            this.append(data);
            return;
        }

        let node = new Node(data);
        let count = 0, prev, curr = this.head;
        while (count < index) {
            prev = curr;
            curr = curr.next;
            count += 1;
        }
        node.next = curr;
        prev.next = node;
        this.size += 1;
        return;
    }

    find(nodeData) {
        let index = 0, curr = this.head;

        while (index < this.size) {
            if (curr.data == nodeData) {
                return index;
            }
            curr = curr.next;
            index += 1;
        }
        return null;
    }

    size() {
        return this.size;
    }

}


let recordList = new LinkedList(0);
let isRecording = false;
let ctx;
let color = "black";
let strokeSize = 5; // default

class Recorder {
    constructor(name) {
        this.name = name;
    }

    startRecording() {
        ctx.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
        isRecording = true;
        let c = document.getElementById("canvas");
        c.onmousedown = function (evt) {
            if (evt.buttons !== 1) return;
            let x = evt.offsetX, y = evt.offsetY;
            ctx.fillStyle = color;
            ctx.arc(x, y, strokeSize, 0, Math.PI * 2);
            recordList.append([x, y, color, strokeSize]);
        }
        c.onmousemove = function (evt) {
            if (evt.buttons !== 1) return;
            let x = evt.offsetX, y = evt.offsetY;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, strokeSize, strokeSize);
            recordList.append([x, y, color, strokeSize]);
        }
        return;
    }

    stopRecording() {
        isRecording = false;
        return;
    }

    play() {
        if (isRecording) {
            alert("Still Recording!");
            return;
        }
        // clear canvas
        ctx.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
        // play recordings
        this.playHelper();
        return;
    }

    playHelper() {
        let ctx = document.getElementById("canvas").getContext("2d");
        let h = recordList.head;
        setInterval(() => {
            let arr = h.data;
            ctx.fillStyle = arr[2];
            ctx.fillRect(arr[0], arr[1], arr[3], arr[3]);
            h = h.next;
        }, 10);
        return;
    }

    clear() {
        if (isRecording) {
            alert("Still Recording!!");
        }

        ctx.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
        recordList = new LinkedList();
        isRecording = false;
        return;
    }

    save() {
        window.localStorage.setItem("record", JSON.stringify(recordList));
    }

    retrieve() {
        recordList = JSON.parse(window.localStorage.getItem("record"));
    }

    changeColor() {
        let c = document.getElementById("color");
        color = c.options[c.selectedIndex].value;
    }

    erase() {
        color = "white";
    }

    pen() {
        let c = document.getElementById("color");
        color = c.options[c.selectedIndex].value;
    }

    setStroke() {
        let s = document.getElementById("stroke");
        strokeSize = s.value;
    }

}

function main() {
    let r = new Recorder("recorder");

    ctx = document.getElementById("canvas").getContext("2d");

    document.getElementById("start").onclick = function () {
        r.startRecording();
    };
    document.getElementById("stop").onclick = function () {
        r.stopRecording();
    };
    document.getElementById("play").onclick = function () {
        r.play();
    };
    document.getElementById("clear").onclick = function () {
        r.clear();
    };
    document.getElementById("save").onclick = function () {
        r.save();
    };
    document.getElementById("retrieve").onclick = function () {
        r.retrieve();
    };
    document.getElementById("changecolor").onclick = function () {
        r.changeColor();
    };
    document.getElementById("erase").onclick = function () {
        r.erase();
    };
    document.getElementById("stroke").onchange = function () {
        r.setStroke();
    };
    document.getElementById("pen").onclick = function () {
        r.pen();
    };
}
