class Calculator{
    constructor(){
        this.clear();
    }

    clear(){
        this.tokens = [];
        this.result = null;
    }

    handleAfterResult(keepResult){
        if(this.result === null) return;
        const old = this.result;
        this.clear();
        if(keepResult && old !== "Lỗi"){
            this.tokens.push(old);
        }
    }

    calculate(){
        if(this.result !== null) return;

        while(this.tokens.length > 0 &&
              (this.isOperator(this.lastToken()) || this.lastToken() === "neg" || this.lastToken() === "(")){
            this.tokens.pop();
        }
        if(this.tokens.length === 0) return;

        this.removeTrailingDot();

        const missing = this.openParenCount();
        for(let i = 0; i < missing; i++){
            this.tokens.push(")");
        }

        const value = this.evaluate(this.tokens);
        if(value === null || !isFinite(value)) this.result = "Lỗi";
        else this.result = String(value);
    }

    deleteLast(){
        if(this.result !== null){
            this.result = null;
            return;
        }
        if(this.tokens.length === 0) return;

        const last = this.lastToken();
        if(this.isNumber(last) && !last.includes("e")){
            const shorter = last.slice(0, -1);
            if(shorter === "" || shorter === "-") this.tokens.pop();
            else this.tokens[this.tokens.length - 1] = shorter;
        }
        else{
            this.tokens.pop();
        }
    }

    getExpression(){
        if(this.tokens.length === 0) return "0";

        let text = "";
        for(const token of this.tokens){
            switch(token){
                case "+": text += " + "; break;
                case "-": text += " − "; break;
                case "*": text += " × "; break;
                case "/": text += " ÷ "; break;
                case "neg": text += "−"; break;
                default:
                    if(token.startsWith("-")) text += "−" + token.slice(1);
                    else text += token;
            }
        }
        if(this.result !== null) text += " =";
        return text;
    }

    getResult(){
        if(this.result === null) return "";
        if(this.result.startsWith("-")) return "−" + this.result.slice(1);
        return this.result;
    }

    compute(a, op, b){
        let result;
        switch(op){
            case "+": result = a + b;
            break;
            case "-": result = a - b;
            break;
            case "*": result = a * b;
            break;
            case "/":
                if(b === 0) return null;
                result = a / b
            break;
            default:return null;
        }
        return parseFloat(result.toPrecision(12));
    }

    isOperator(token){
        return token === "+" || token === "-" || token === "*" || token === "/"
    }

    precedence(ops){
        if(ops === "+" || ops === "-") return 1;
        if(ops === "*" || ops === "/") return 2;
        if(ops === "neg") return 3;
        return 0;
    }

    applyTop(nums, ops){
        const op = ops.pop();
        if(op === "neg"){
            const x = nums.pop();
            nums.push(-x);
            return true;
        }
        const b = nums.pop();
        const a = nums.pop();
        const value = this.compute(a, op, b);
        if(value === null) return false;
        nums.push(value);
        return true;
    }

    evaluate(tokens){
        const nums = [];
        const ops = [];

        for(const token of tokens){
            if(token ==="(") ops.push(token);
            else if(token === ")"){
                while(ops.length > 0 && ops[ops.length - 1] !== "("){
                    if(!this.applyTop(nums, ops)) return null;
                }
                ops.pop();
            }
            else if(token === "neg"){
                ops.push(token);
            }
            else if(this.isOperator(token)){
                while(ops.length > 0 && 
                    this.precedence(ops[ops.length - 1]) >= this.precedence(token)){
                        if(!this.applyTop(nums, ops)) return null;
                }
                ops.push(token);
            }
            else{
                nums.push(parseFloat(token));
            }
        }

        while(ops.length > 0){
            if(!this.applyTop(nums, ops)) return null;
        }
        return nums[0];
    }

    lastToken(){
        return this.tokens[this.tokens.length - 1];
    }

    isNumber(token){
        return token !== undefined &&
               !this.isOperator(token) &&
               token !== "(" &&
               token !== ")" &&
               token !== "neg"
    }

    removeTrailingDot(){
        const last = this.lastToken();
        if(this.isNumber(last) && last.endsWith(".")){
            this.tokens[this.tokens.length - 1] = last.slice(0, -1);
        }
    }

    inputDigit(digit){
        this.handleAfterResult(false);
        const last = this.lastToken();

        if(last === ")"){
            this.tokens.push("*", digit);
        }
        else if(!this.isNumber(last)){
            this.tokens.push(digit);
        }
        else if(last === "0"){
            this.tokens[this.tokens.length - 1] = digit;
        }
        else{
            if(last.length >= 15) return;
            this.tokens[this.tokens.length - 1] = last + digit;
        }
    }

    inputDot(){
        this.handleAfterResult(false);
        const last = this.lastToken();

        if(last === ")") this.tokens.push("*", "0.");
        else if(!this.isNumber(last)) this.tokens.push("0.");
        else if(last.includes(".")) return;
        else this.tokens[this.tokens.length - 1] = last + ".";
    }

    inputOperator(op){
        if(!this.isOperator(op)) return;
        this.handleAfterResult(true);

        const last = this.lastToken();
        if(last === undefined) this.tokens.push("0", op);
        else if(last === "(" || last === "neg") return;
        else if(this.isOperator(last)) this.tokens[this.tokens.length - 1] = op;
        else{
            this.removeTrailingDot();
            this.tokens.push(op);
        }

    }

    inputNegative(){
        this.handleAfterResult(false);
        const last = this.lastToken();
        if(this.isNumber(last) || last === ")"){
            this.removeTrailingDot();
            this.tokens.push("*", "neg");
        }
        else{
            this.tokens.push("neg");
        }
    }

    inputParen(paren){
        this.handleAfterResult(false);
        const last = this.lastToken();

        if(paren === "("){
            if(this.isNumber(last) || last === ")"){
                this.removeTrailingDot();
                this.tokens.push("*", "(");
            }
            else{
                this.tokens.push("(");
            }
        }
        else if(paren === ")"){
            if(this.openParenCount() <= 0) return;
            if(!this.isNumber(last) && last !== ")") return;
            this.removeTrailingDot();
            this.tokens.push(")");
        }
    }

    openParenCount(){
        let count = 0;
        for(const t of this.tokens){
            if(t === "(") count++;
            else if(t === ")") count--;
        }
        return count;
    }
}

if(typeof module !== "undefined") module.exports = Calculator;