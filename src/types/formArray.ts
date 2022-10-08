import type { FormControl, FormGroup, FormArray } from "../modules";

export type FormArrayExtends = Array<FormGroup<any> | FormControl<any> | FormArray<any>>
