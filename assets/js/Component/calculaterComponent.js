export default class CalculatorComponent {
    constructor(value) {
        this.value = value;
        this.total = 0;
        this.operation = [];
    }
    getInitValue() {
        return this.value;
    }
    getValue() {
        this.total = this.getInitValue();
        for (let i=0; i<this.operation.length; i++) {
            this.calculation(this.operation[i].ope, this.operation[i].val);
        }

        return this.total;
    }
    calculation(operation, value) {
        switch (operation) {
            case "add": this.total += value; break;
            case "sub": this.total -= value; break;
            case "mul": this.total *= value; break;
            case "div": this.total /= value; break;
        }
    }
    reset() {
        this.operation = [];
    }
    cancel() {
        this.operation.pop();
    }
    add(value) {
        this.operation.push({"ope": "add", "val": value});
    }
    sub(value) {
        this.operation.push({"ope": "sub", "val": value});
    }
    mul(value) {
        this.operation.push({"ope": "mul", "val": value});
    }
    div(value) {
        this.operation.push({"ope": "div", "val": value});
    }
}