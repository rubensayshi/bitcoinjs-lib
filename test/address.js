var assert = require('assert')
var networks = require('../src/networks')

var Address = require('../src/address')
var Script = require('../src/script')

var fixtures = require('./fixtures/address.json')

describe('Address', function() {
  describe('fromOutputScript', function() {
    fixtures.valid.forEach(function(f) {
      it('returns ' + f.address + ' for ' + f.script.slice(0, 10) + '... on ' + f.network, function() {
        var script = Script.fromASM(f.script)
        var address = Address.fromOutputScript(script, networks[f.network])

        assert.equal(address, f.address)
      })
    })

    fixtures.invalid.fromOutputScript.forEach(function(f) {
      it('throws when ' + f.description, function() {
        var script = Script.fromASM(f.script)

        assert.throws(function() {
          Address.fromOutputScript(script)
        }, new RegExp(f.description))
      })
    })
  })

  describe('toOutputScript', function() {
    fixtures.valid.forEach(function(f) {
      it('returns ' + f.script.slice(0, 14) + '... for ' + f.address, function() {
        var script = Address.toOutputScript(f.address)

        assert.equal(script.toASM(), f.script)
      })
    })

    fixtures.invalid.toOutputScript.forEach(function(f) {
      it('throws when ' + f.description, function() {
        assert.throws(function() {
          Address.toOutputScript(f.address)
        }, new RegExp(f.description))
      })
    })
  })

  describe('validate', function() {
    fixtures.valid.forEach(function(f) {
      it('doesn\'t throw for ' + f.address, function() {
        assert.doesNotThrow(function() {
          Address.validate(f.address, f.network)
        })
      })
    })

    fixtures.invalid.validate.forEach(function(f) {
      it('throws when ' + f.description, function() {
        assert.throws(function() {
          Address.validate(f.address)
        }, new RegExp(f.address + ' is not a valid ' + f.network + ' address'))
      })
    })
  })
})
