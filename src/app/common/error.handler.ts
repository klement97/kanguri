import {AbstractControl, FormGroup} from '@angular/forms';

export class ErrorHandler {

	getError(form: FormGroup, field: string): string {
		/**
		 * This function is used to get form field errors and returns only one of them
		 *
		 * param: form: Form to which to lookup to get formField
		 * param @type: FormGroup
		 * param: field: from field name as string
		 * param @type: string
		 *
		 * return: message: error message if field matches any of the error types below
		 * return @type: string
		 */
		const formField = form.get(field);
		if (formField) {
			let message = '';
			const errors = formField.errors;
			if (this.hasError(formField)) {
				if (errors.maxlength) {
					message = `Gjatësia maksimale e lejuar ${errors.maxlength.actualLength}/${errors.maxlength.requiredLength}`;
				} else if (errors.email) {
					message = 'Email nuk është i saktë';
				} else if (errors.required) {
					message = 'Fushë e detyrueshme';
				} else if (errors.min) {
					message = `Vlera minimale është ${errors.min.min}, ju keni dhënë ${errors.min.actual}`;
				} else if (errors.max) {
					message = `Vlera maksimale është ${errors.max.max}, ju keni dhënë ${errors.max.actual}`;
				} else if (errors.pattern) {
					message = 'Vlera e dhënë nuk është e saktë';
				} else if (errors.serverError) {
					message = errors.serverError
				} else {
					message = '';
				}
			}
			return message;
		} else {
			// Message for developer in case of a wrong input.
			return 'Field \'' + field + '\' can not be found in form. Check your formControlName attributes!';
		}

	}

	setError(error: any, form: FormGroup) {
		/**
		 * Sets error of type 'serverError' to fields of the form given.
		 *
		 * param: error: ErrorData instance
		 * param: form: Form that error will be set to
		 */
		if (error && form && error.length === undefined) {
			Object.keys(error).forEach(field => {
				const isNestedField = error[field].length === undefined;  // field is not an array
				if (isNestedField) {
					this.setErrorsToNestedField(form, error[field], field);
				} else {
					const formControl = form.get(field);
					if (formControl) {
						formControl.setErrors({serverError: error[field][0]});
					}
				}
			});
		}

	}

	setErrorsToNestedField(form: FormGroup, nestedFormErrors, nestedFormName: string) {
		/**
		 * Similar to setErrorToFormFields but deals with nested fields.
		 * If backend sends field in a nested relation, this method goes deeper in the error
		 * response and searches for fields in the given form.
		 *
		 * param: form: FormGroup instance that error will be set
		 * param @type: FormGroup
		 * param: nestedFormErrors: Dictionary that holds keys which may be fields for our form
		 * param @type: Dictionary
		 * param: nestedFormName: param to be used to get nested form out of form
		 * param @type: string
		 */
		Object.keys(nestedFormErrors).forEach(field => {
			const formControl = form.get(field);
			if (formControl) {
				formControl.setErrors({
					serverError: nestedFormErrors[field]
				});
			} else {
				const nestedForm = form.get(nestedFormName);
				const nestedField = nestedForm.get(field);
				if (nestedField) {
					nestedField.setErrors({
						serverError: nestedFormErrors[field]
					});
				}
			}
		});
	}

	hasError(field: AbstractControl): boolean {
		/**
		 * Checks if field is invalid and touched or dirty.
		 * Only field.invalid will throw errors at the opening of a form which is a case
		 * we don't want to happen.
		 *
		 * param: field: an object which holds required information
		 * param @type: AbstractControl of a FormGroup
		 */
		return field.invalid && (field.touched || field.dirty);


	}


}
