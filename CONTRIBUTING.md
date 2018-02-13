# Contributing to redux-subspace

The following is a set of guidelines for contributing to redux-subspace, which are hosted in the [IOOF Holdings Limited Organization](https://github.com/ioof-holdings) on GitHub.
These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a [pull request](#pull-requests).

#### Table of Contents

* [What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Intention](#intention)
  * [Terminology](#terminology)
  * [Key Concepts](#key-concepts)

* [How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)

## What should I know before I get started?

### Intention

The intention of redux-subspace is to extend [react-redux Provider](https://github.com/reactjs/react-redux/blob/master/src/components/Provider.js) to support a [micro-frontend](https://www.thoughtworks.com/radar/techniques/micro-frontends) architecture.

### Terminology

* **Micro-Frontend** - A small piece of a UI, generally an encapsulated piece of business functionality, embedded with a larger single page app.
* **Subspace** - The isolated section of the state tree associated with a micro-frontend.
* **Parent** - The root application or component integrating the micro-frontend.
* **Child Component** - An integrated micro-frontend.

### Key Concepts

redux-subspace has some key concepts that drive all decision making and design decisions.  Please keep this in mind when making contributions as any pull request that are perceived to go against them will not be accepted.

#### Decoupling Child Components

The defining feature of redux-subspace is decoupling components from their parents.  Generally speaking, the parent is responsible for integrating and defining the subspace for the child component, but the child component is completely unaware of the parent.  The child components should not require any context of where they exist in DOM, React component hierarchy or Redux state tree.

#### Namespace All Actions

The namespacing feature of redux-subspace should cover all `dispatch` and `getState` calls made within a subspace.  This is particularly important when implementing support for Redux middleware as they often obfuscate calls to the store's `dispatch` function.

Similarly to the above, the parent is responsible for defining the namespace for a child component, which should remain completely unaware of the namespace.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/ioof-holdings/redux-subspace/issues).  Please check to see if your issue has already been raised before submitting your bug report.

When submitting a bug report, please include as much information as possible to help contributors to identify the cause of the problem.  The ideal bug report would include:

* **A clear and descriptive title** for the issue to identify the problem.
* **A description of the exact scenario to reproduce the problem** in as much detail as possible.
* **An explanation of the behaviour you expected to see instead and why.**
* **An example to demonstrate the scenario** such as:
  * Include copy/pastable snippets (using markdown) in your bug report.
  * Links to files in GitHub or other public repository.
  * Submit a pull request with [an example](/examples) highlighting the issue.
* **Environment details** such as:
  * Browser(s) you have seen the problem in.
  * Version of redux-subspace you are using.
  * Which Redux middleware (including version numbers) are being used.
  * What other packages (including version numbers) are being used.

### Suggesting Enhancements

Enhancements are tracked as [GitHub issues](https://github.com/ioof-holdings/redux-subspace/issues).  Please check to see if your suggestion has already been made before submitting your suggestion.

When submitting an enhancement submission, please include as much information as possible to help contributors to understand an implement your idea.  The ideal enhancement suggestion would include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **A description of the specifics of your suggestion** in as much detail as possible.
* **An explanation of the benefits implementing your enhancement would provide**
* **An example to demonstrate the scenario** such as:
  * Include copy/pastable snippets (using markdown) in your enhancement submission.
  * Links to files in GitHub or other public repository.
  * Submit a pull request with [an example](/examples) showing how your enhancement would be used.

### Pull Requests

If you want to get your hands dirty, please take a look at the [open issues](https://github.com/ioof-holdings/redux-subspace/issues?q=is%3Aissue%20is%3Aopen), create a fork to make the required changes and submit a pull request with your proposed solution, [referencing the issue](https://help.github.com/articles/closing-issues-via-commit-messages/) in the commit message.

Please keep our [key concepts](#key-concepts) in mind when implementing your changes.

In order to run locally, start with the following:

```console
npm run bootstrap
```

### Add yourself as a contributor

This project follows the [all contributors](https://github.com/kentcdodds/all-contributors) specification. To add yourself to the table of
contributors on the README.md, please use the automated script as part of your PR:

```console
npm run contributors:add <YOUR_GITHUB_USERNAME>
```

Follow the prompt. If you've already added yourself to the list and are making a new type of contribution, you can run
it again and select the added contribution type.
