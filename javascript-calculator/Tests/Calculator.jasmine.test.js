/// <reference path="../Source/Calculator.js" />

describe('RPN calculator', function ()
{
    function calculateExpression(expression)
    {
        return Calculator
                    .setExpression(expression)
                    .calculate();
    }

    it('Simple addition (2 2 +)', function ()
    {
        var result = calculateExpression('2 2 +');

        expect(result).toEqual(4);
    });

    it('Simple multiplication', function ()
    {
        var result = calculateExpression('2 2 *');

        expect(result).toEqual(4);
    });

    it('Simple subtraction', function ()
    {
        var result = calculateExpression('2 2 -');

        expect(result).toEqual(0);
    });

    it('Advanced subtraction', function ()
    {
        var result = calculateExpression('2 1 -');

        expect(result).toEqual(1);
    });

    it('Simple division', function ()
    {
        var result = calculateExpression('2 2 /');

        expect(result).toEqual(1);
    });

    it('Advanced division', function ()
    {
        expect(function ()
        {
            calculateExpression('2 0 /');
        }).toThrow();
    });

    it('Advanced expression', function ()
    {
        var result = calculateExpression('3 6 * 5 + 3 - 2 /');
        expect(result).toEqual(10);
    });

    it('Advanced-Master expression', function ()
    {
        var result = calculateExpression('5 6 3 + * 2 /');
        expect(result).toEqual(22.5);
    });
});