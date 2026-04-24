/**
 * MathEngine - Handles response curve calculations for human-machine interaction.
 * 
 * The core formula is a mixture of linear and cubic components:
 * y = (1 - k) * x + k * x^3
 * 
 * k = 0: Pure linear response (direct control)
 * k = 1: Pure cubic response (soft center, aggressive ends)
 */
class MathEngine {
    constructor(k = 0.5) {
        this.k = k;
    }

    /**
     * Sets the sensitivity coefficient k.
     * @param {number} val - k value between 0 and 1.
     */
    setK(val) {
        this.k = Math.max(0, Math.min(1, val));
    }

    /**
     * Calculates the output based on the input and current k.
     * @param {number} x - Input value, typically between -1 and 1.
     * @returns {number} - Calculated output value.
     */
    calculate(x) {
        // preserve sign while applying cubic transformation
        const cubic = Math.pow(x, 3);
        const linear = x;
        
        return (1 - this.k) * linear + this.k * cubic;
    }

    /**
     * Get a descriptive name for the current curve profile.
     */
    getProfileName() {
        if (this.k === 0) return "Linear";
        if (this.k < 0.4) return "Natural";
        if (this.k < 0.7) return "Precision";
        return "Aggressive";
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathEngine;
} else {
    window.MathEngine = MathEngine;
}
