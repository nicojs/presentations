## Related work

---

### Model based testing

> Model-based testing can also be referred to as ¨Monkey testing" to some extend. The basic concept is to put our system under stress by providing it with random inputs. With model-based testing, we compare our system to a highly simplified version of it: the model. -- https://fast-check.dev

> A property is to property-based tests, what an example is to example based tests: it's the core building block of it. Instead of explicitly defining values to test, we will ask the framework to build them for us. Instead of expecting clear values, we will check the shape of the output.

Pros
- test more inputs over time
- test more diverse inputs
- don't need to think about counterexamples

Cons
- models have to be written en maintained

---

### Model based testing, and example

```js []
test('should keep an already sorted array sorted', () => {
  expect(sortNumbersAscending([1, 2, 3])).toEqual([1, 2, 3]);
});
test('should sort a randomly ordered array in ascending order', () => {
  expect(sortNumbersAscending([3, 1, 2])).toEqual([1, 2, 3]);
});
test('should sort a descending ordered array in ascending order', () => {
  expect(sortNumbersAscending([3, 1, 2])).toEqual([1, 2, 3]);
});
```

```js []
test('should sort numeric elements from the smallest to the largest one', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (data) => {
      const sortedData = sortNumbersAscending(data);
      for (let i = 1; i < data.length; ++i) {
        expect(sortedData[i - 1]).toBeLessThanOrEqual(sortedData[i]);
      }
    }),
  );
});
```

---

#### Fuzzing

>  fuzzing or fuzz testing is an automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program. The program is then monitored for exceptions such as crashes, failing built-in code assertions, or potential memory leaks. Typically, fuzzers are used to test programs that take structured inputs. This structure is specified, e.g., in a file format or protocol and distinguishes valid from invalid input. An effective fuzzer generates semi-valid inputs that are "valid enough" in that they are not directly rejected by the parser, but do create unexpected behaviors deeper in the program and are "invalid enough" to expose corner cases that have not been properly dealt with. -- https://wikipedia.com

---

#### Fuzzing, an example

```js []
class ParserTests {
   @Test
   void unitTest() {
      assertEquals("foobar", SomeScheme.decode(SomeScheme.encode("foobar")));
   }

   @FuzzTest
   void fuzzTest(FuzzedDataProvider data) {
      String input = data.consumeRemainingAsString();
      assertEquals(input, SomeScheme.decode(SomeScheme.encode(input)));
   }
}
```

https://github.com/CodeIntelligenceTesting/jazzer
