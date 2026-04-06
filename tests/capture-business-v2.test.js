const assert = require('node:assert/strict');

const {
    BUSINESS_TAGS,
    DEFAULT_CAPTURE_OPTIONS,
    getBusinessV2OutputPath,
    getBusinessTemplateUrl,
    resolveCapturePlan,
} = require('../scripts/capture-business-v2');

function runTest(name, fn) {
    try {
        fn();
        console.log(`PASS ${name}`);
    } catch (error) {
        console.error(`FAIL ${name}`);
        throw error;
    }
}

runTest('captures the expected business template tags only', () => {
    assert.deepEqual(BUSINESS_TAGS, 'abcdefghijklmnopqrstuvwxyz'.split(''));
});

runTest('builds business_v2 output paths using jpg names', () => {
    const outputPath = getBusinessV2OutputPath('q');
    assert.match(outputPath, /public[\\/]assets[\\/]images[\\/]thumbnails[\\/]business_v2[\\/]q\.jpg$/);
});

runTest('builds template URLs from the dev server', () => {
    assert.equal(
        getBusinessTemplateUrl('m'),
        'http://127.0.0.1:8788/templates/business/m/'
    );
});

runTest('uses the default centered clip when there is no override', () => {
    const plan = resolveCapturePlan('f');

    assert.equal(plan.viewport.width, DEFAULT_CAPTURE_OPTIONS.viewport.width);
    assert.equal(plan.viewport.height, DEFAULT_CAPTURE_OPTIONS.viewport.height);
    assert.deepEqual(plan.clip, {
        x: 270,
        y: 120,
        width: 900,
        height: 1200,
    });
    assert.equal(plan.outputQuality, DEFAULT_CAPTURE_OPTIONS.outputQuality);
});

runTest('applies per-template override values on top of defaults', () => {
    const plan = resolveCapturePlan('w', {
        scrollY: 240,
        clipScale: 0.8,
        focusX: 0.6,
    });

    assert.equal(plan.scrollY, 240);
    assert.deepEqual(plan.clip, {
        x: 432,
        y: 120,
        width: 720,
        height: 960,
    });
});
