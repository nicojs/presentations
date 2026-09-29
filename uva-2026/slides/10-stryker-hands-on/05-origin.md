## The story of Stryker

<kc-timeline events='[{"year":2015,"caption":"Internship","description":"Mutation testing for JS"},{"year":2016,"caption":"0.1 Release","description":"First release of a bare-bones mutation testing framework"},{"year":2017,"caption":"Open source policy","description":"Start of Info Support open source community; sponsorship for Stryker."},{"year":2018,"caption":"Scala &amp; C`#","description":"Internships for Scala and C# mutation testing; use of mutant schemata"},{"year":2019,"caption":"StrykerJS 1.0","description":"1.0 Release of StrykerJS"},{"year":"2021","caption":"Stryker.NET 1.0","description":"1.0 Release of Stryker.NET is slated for later this year"},{"year":"2025","caption":"Editor Plugin"},{"year":"2026","caption":"Stryker4S 1.0"}]'>
</kc-timeline>

notes:

- 2015: Internship started for mutation testing for JS, which would result in StrykerJS. The first commit in the StrykerJS repository still contains the code from the internship!
- 2016: The first release of StrykerJS, still very bare-bones. It started out in JS, improved gradually, and later got rewritten in TS after which we never looked back.
- 2017: At Info Support, we wanted to structurally make time to work on open source projects like StrykerJS, which marked the start of the Open Source Community. This great initiative still exists today, and I use it to work on StrykerJS structurally.
- 2018: Internships for Scala & C# mutation testing, and implementing mutant schemata (more about this later)
- 2019: StrykerJS became production ready (1.0 release)!
- 2021: Stryker.NET became production ready (1.0 release)!
- 2025: We released the Mutation Server Protocol and the Editor Plugin for Stryker
- 2026: A new milestone has been reached, as we now have millions of downloads _weekly_, and Stryker4S became production ready!

---

### Some highlights

- StrykerJS:
  - <npm-downloads package="@stryker-mutator/core"></npm-downloads> total downloads
- Stryker.NET:
  - <nuget-downloads package="dotnet-stryker"></nuget-downloads> total downloads
- Stryker4S
  - &gt; 2M downloads
- ~20 internships, 5 hackathons, multiple talks at conferences / podcasts
- Shared projects:
  - `mutation-testing-elements`: HTML report for mutation testing
  - `stryker-dashboard`: Dashboard for mutation testing reports
  - `weapon-regex`: Regex mutations for Scala & JavaScript

notes:

- mutation-testing-elements: any mutation testing tool can use it, provided they use the same report schema!
- stryker-dashboard: all with the same report schema can use it!
- weapon-regex: regex mutator built in Scala, and cross-compiled to JS!
