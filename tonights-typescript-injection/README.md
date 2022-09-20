# Tonight's TypeScript Injection

TypeScript has excellent features like literal, mapped, conditional, and tuple types. Most of these serve a particular use case or niche. You've probably wondered: "sure, this feature is cool, but when would I ever want to use it?". An answer to that question is Dependency injection.

Dependency injection, or DI for short, is a technique that allows you to maintain functions or classes independent of their dependencies. This technique is beloved in many languages yet a bit underexposed in JavaScript. A DI framework resolves your dependencies at runtime, often while losing type safety. Losing type safety is not a rule; indeed, with the right tool, we don't need to lose it.

Join us on a journey to discover how we can use TypeScript features to create a type-safe dependency injection framework. We'll start simple but will be experts by the end. Excitement guaranteed!
