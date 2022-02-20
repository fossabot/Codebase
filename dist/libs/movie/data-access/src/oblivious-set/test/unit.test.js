"use strict";
var _asyncTestUtil = require("async-test-util");
var assert = require("assert");
var _index = require("../src/index");
describe('unit.test.js', ()=>{
    it('create, add, has, get, clear', ()=>{
        const set = new _index.ObliviousSet(100);
        set.add('foobar');
        const has = set.has('foobar');
        assert.ok(has);
        set.clear();
        const hasAfter = set.has('foobar');
        assert.strictEqual(false, hasAfter);
    });
    it('.removeTooOldValues() should clear the old values when a new one is given', async ()=>{
        const set = new _index.ObliviousSet(100);
        set.add('foobar');
        assert.ok(set.has('foobar'));
        await _asyncTestUtil.default.wait(200);
        set.add('foobar2');
        await _asyncTestUtil.default.wait(100);
        const has = set.has('foobar');
        assert.strictEqual(false, has);
    });
    it('.removeTooOldValues() should NOT clear to young values when a new one is given', async ()=>{
        const set = new _index.ObliviousSet(500);
        set.add('foobar');
        assert.ok(set.has('foobar'));
        await _asyncTestUtil.default.wait(50);
        set.add('foobar2');
        assert.ok(set.has('foobar'));
    });
    it('should clear the value after its ttl', async ()=>{
        const set = new _index.ObliviousSet(100);
        set.add('foobar');
        await _asyncTestUtil.default.wait(200);
        set.add('foobar2');
        await _asyncTestUtil.default.wait(100);
        const has = set.has('foobar');
        assert.strictEqual(false, has);
    });
});

//# sourceMappingURL=unit.test.js.map