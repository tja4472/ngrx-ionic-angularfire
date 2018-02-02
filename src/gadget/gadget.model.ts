//  https://redux.js.org/docs/faq/OrganizingState.html#organizing-state-non-serializable
/*
Can I put functions, promises, or other non-serializable items in my store
state? It is highly recommended that you only put plain serializable objects,
arrays, and primitives into your store. It's technically possible to insert
non-serializable items into the store, but doing so can break the ability to
persist and rehydrate the contents of a store, as well as interfere with
time-travel debugging.

If you are okay with things like persistence and time-travel debugging
potentially not working as intended, then you are totally welcome to put
non-serializable items into your Redux store. Ultimately, it's your application,
and how you implement it is up to you. As with many other things about Redux,
just be sure you understand what tradeoffs are involved.
*/
// https://stackoverflow.com/questions/43181516/getting-model-instance-from-ngrx-store-select/43185931#43185931
/*
But: It is generally not recommended to have Class-Instances in the store, there
are a few rules of thumb:

The store-content should serializable without any major modifications (=> just
use Object and Primitives) ngrx (and rxjs in general) are relying heavily on
functional programming patterns, so mixing it Object Oriented paradigms is not
recommended.
*/
export interface Gadget {
  readonly description: string;
  readonly id: string;
  readonly name: string;
}
