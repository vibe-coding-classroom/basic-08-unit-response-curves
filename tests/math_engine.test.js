const MathEngine = require('../js/math_engine');

describe('MathEngine Response Curves', () => {
    let engine;

    beforeEach(() => {
        engine = new MathEngine(0.5);
    });

    test('Linear response when k=0', () => {
        engine.setK(0);
        expect(engine.calculate(0)).toBe(0);
        expect(engine.calculate(0.5)).toBe(0.5);
        expect(engine.calculate(1)).toBe(1);
        expect(engine.calculate(-0.5)).toBe(-0.5);
    });

    test('Pure cubic response when k=1', () => {
        engine.setK(1);
        expect(engine.calculate(0)).toBe(0);
        expect(engine.calculate(0.5)).toBe(0.125); // 0.5^3
        expect(engine.calculate(1)).toBe(1);
        expect(engine.calculate(-0.5)).toBe(-0.125);
    });

    test('Mixed response when k=0.5', () => {
        engine.setK(0.5);
        // y = 0.5 * x + 0.5 * x^3
        // for x = 0.5: 0.5 * 0.5 + 0.5 * 0.125 = 0.25 + 0.0625 = 0.3125
        expect(engine.calculate(0.5)).toBe(0.3125);
    });

    test('Profile naming logic', () => {
        engine.setK(0);
        expect(engine.getProfileName()).toBe('Linear');
        
        engine.setK(0.3);
        expect(engine.getProfileName()).toBe('Natural');
        
        engine.setK(0.5);
        expect(engine.getProfileName()).toBe('Precision');
        
        engine.setK(0.8);
        expect(engine.getProfileName()).toBe('Aggressive');
    });

    test('k value clamping', () => {
        engine.setK(1.5);
        expect(engine.k).toBe(1);
        
        engine.setK(-0.5);
        expect(engine.k).toBe(0);
    });
});
