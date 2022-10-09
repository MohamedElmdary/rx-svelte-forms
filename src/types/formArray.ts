import type { FormControl, FormGroup, FormArray } from "../modules";

export type FormArrayExtends = Array<FormGroup<any> | FormControl<any> | FormArray<any>>
// export type ExtractValue<T> =
//     // T extends Array<FormGroup<infer Q>> ?
//     // | FormGroup<T[K] extends object ? T[K] : object>
//     // | FormControl<T[K]>
//     // | FormArray<T[K] extends FormArrayExtends ? T[K] : FormArrayExtends>;
// export type ExtractValue<T> =
