/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter */

export let value = "first value";

setTimeout(() => (value = "second value"), 500);

export default value;
