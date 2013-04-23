var Calculator = {
    expression: '',

    numberStack: [],

    operationFunction: {
        '+': function (a, b) { return a + b; },
        '*': function (a, b) { return a * b; },
        '-': function (a, b) { return a - b; },
        '/': function (a, b)
        {
            if (b === 0)
                throw new Error('Divisão por zero');

            return a / b;
        }
    },

    setExpression: function (value)
    {
        this.expression = value;
        return this;
    },

    calculate: function ()
    {
        this.calculateExpression();
        return this.numberStack.pop();
    },

    calculateExpression: function ()
    {
        var values = this.expression.split(' ');

        for (var i = 0, len = values.length; i < len; i++)
        {
            this.updateNumberStack(values[i]);
        }
    },

    updateNumberStack: function (value)
    {
        var operations = this.operationFunction,
            numberStack = this.numberStack,
            fnArgumentA, fnArgumentB;

        // outra forma: Object.keys(operations).indexOf(value) > -1
        if (operations.hasOwnProperty(value))
        {
            fnArgumentB = numberStack.pop();
            fnArgumentA = numberStack.pop();
            value = operations[value](fnArgumentA, fnArgumentB);
        }

        numberStack.push(+value);
    }
};
