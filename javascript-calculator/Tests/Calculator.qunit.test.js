/// <reference path="../Source/Calculator.js" />

function calculateExpression(expression)
{
    return Calculator
                .setExpression(expression)
                .calculate();
}

test('Simple addition', function ()
{
    var result = calculateExpression('2 2 +');
    equal(result, 4, '2 2 + = 4');
});

test('Simple multiplication', function ()
{
    var result = calculateExpression('2 2 *');
    equal(result, 4, '2 2 * = 4');
});

test('Simple subtraction', function ()
{
    var result = calculateExpression('2 2 -');
    equal(result, 0, '2 2 - = 0');
});

test('Advanced subtraction', function ()
{
    var result = calculateExpression('2 1 -');
    equal(result, 1, '2 1 - = 1');
});

test('Simple division', function ()
{
    var result = calculateExpression('2 2 /');
    equal(result, 1, '2 2 / = 1');
});

test('Advanced division', function ()
{
    throws(function ()
    {
        calculateExpression('2 0 /');
    }, '2 0 / throw Error')
});

test('Advanced expression', function ()
{
    var result = calculateExpression('3 6 * 5 + 3 - 2 /');
    equal(result, 10, '3 6 * 5 + 3 - 2 / = 10');
});

test('Advanced-Master expression', function ()
{
    var result = calculateExpression('5 6 3 + * 2 /');
    equal(result, 22.5, '5 6 3 + * 2 / = 22.5');
});
