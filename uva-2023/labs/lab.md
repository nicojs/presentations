# Mutation testing with StrykerJS

– LABORATORY –

---

## Introduction
In this laboratory, you will carry out some practical exercises with a state-of-the-art Model Based
Testing (MBT) tool: the Axini Modeling Suite (AMS). AMS is an industrial-strength MBT tool,
developed by Axini1 during the last decade.
The modeling language used in AMS is the Axini Modeling Language (AML). The semantics of
AML models is defined upon Symbolic Transitions Systems (STS), a data-extension of Labeled
Transition Systems (LTS). For this laboratory we will mostly use the LTS part of AML.
AMS is an integrated development suite for AML models. Models can be edited, visualized,
simulated, and most importantly, tested against a system under test (SUT). All test results are
automatically saved. AMS uses an online testing approach, which means that test cases are gen-
erated on-the-fly while testing the SUT, rather than beforehand.
To become familiar with AMS, you will first do an introductory exercise with a Coffee Machine
model and SUT. This will give you some hands-on experience with modeling and testing. Af-
terwards, you will be ready to do a small project with AMS, where you will model a remote
controlled door (SMARTDOOR) from scratch using a specification document and test various
implementations of that system.