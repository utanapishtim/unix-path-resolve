const test = require('brittle')
const resolve = require('./')

test('normalises', function (t) {
  t.is(resolve('/a/b'), '/a/b')
  t.is(resolve('/a/b/..'), '/a')
  t.is(resolve('/a/b/../..'), '/')
  t.is(resolve('/a/b/././////c'), '/a/b/c')
  t.is(resolve('/a/b/.\\.\\//\\/c/..///d'), '/a/b/d')
  t.is(resolve('file:/a/b/../../c'), '/c')
  t.is(resolve('file:///a/b/../../c'), '/c')
  t.is(resolve('file:///a/b/../../c'), '/c')
  t.is(resolve('proto://host/a/b/../../c'), '/c')
  t.is(resolve('c:\\dir\\file'), '/dir/file')
  t.exception(() => resolve('/..'))
})

test('resolve two paths', function (t) {
  t.is(resolve('/a/b', 'c/d'), '/a/b/c/d')
  t.is(resolve('/a/b', '../c/d'), '/a/c/d')
  t.is(resolve('/', '\\c\\d/e'), '/c/d/e')
  t.is(resolve('/a', '/b'), '/b')
  t.exception(() => resolve('a', 'b'))
})
