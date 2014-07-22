# Var
> [Documentation](../README.md) ▸ [API Reference](API.md) ▸ **Var**

Reactive variables lay at the foundation of the [Dataflow](Dataflow.md) layer.
They can be created and manipulated just like regular `ref` cells.
Unlike `ref` cells, variables can be lifted to the [View](View.md) type to
participate in the dataflow graph.


<a name="Var" href="#Var">#</a> **Var** `type Var<'T>`

A reactive variable.

<a name="Create" href="#Create">#</a> Var.**Create** `'T -> Var<'T>`

Creates a fresh variable with the given initial value.

<a name="Get" href="#Get">#</a> Var.**Get** `Var<'T> -> 'T`

Obtains the current value.  Also available as `var.Value`.

<a name="Set" href="#Set">#</a> Var.**Set** `Var<'T> -> 'T -> unit`

Sets the current value.  Also available as `var.Value <- v`

<a name="SetFinal" href="#SetFinal">#</a> Var.**SetFinal** `Var<'T> -> 'T -> unit`

Sets the final value (after this, Set/Update are invalid).
This is rarely needed, but can help solve memory leaks when
mutliple views are scheduled to wait on a variable that is never
going to change again.

<a name="Update" href="#Update">#</a> Var.**Update** `Var<'T> -> ('T -> 'T) -> unit`

Updates the current value.  This is equivalent to `var.Value <- f var.Value`.

<a name="View" href="#View">#</a> var.**View** `View<'T>`

Lifts the variable to a [View](View.md) so that it can participate in dataflow.
