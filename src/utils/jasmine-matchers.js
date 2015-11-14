/* global jasmine */
/* global beforeEach */
function assertHasLengthProperty(name, obj) {
	if (!obj.hasOwnProperty || !obj.hasOwnProperty('length')) {
		throw new Error(name + ' must have length property');
	}
}

let jasmineMatchers = {

	toMatchArray: (util, customEqualityTesters) => {
		return {
			compare: function (actual, expected) {
				assertHasLengthProperty('actual', actual);
				assertHasLengthProperty('expected', expected);

				let pass = true;
				actual.forEach((value, index) => {
					pass = pass && (value === expected[index]);
				});

				return {
					pass: pass,
					message: 'Arrays not matched'
				};
			}
		};
	}
}

beforeEach(() => jasmine.addMatchers(jasmineMatchers));
